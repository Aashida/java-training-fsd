package com.app.dao_impl;

import com.app.dao.ProductDao;
import com.app.enums.Role;
import com.app.exceptions.InvalidOwnershipException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Category;
import com.app.model.Product;
import com.app.model.Seller;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Transactional
public class ProductDaoImpl implements ProductDao {

    @PersistenceContext
    private EntityManager entityManager;

    private SellerDaoImpl sellerDao;

    @Autowired
    public void setSellerDao(SellerDaoImpl sellerDao) {
        this.sellerDao = sellerDao;
    }

    @Override
    public List<Product> findAll(String sellerUsername) {

        TypedQuery<Product> query =
                entityManager.createQuery(
                        "select p from Product p where p.seller.user.username=:username",
                        Product.class
                );

        query.setParameter("username", sellerUsername);

        return query.getResultList();
    }

    @Override
    public void save(Product product,
                     String sellerUsername,
                     int categoryId) {

        Seller seller =
                sellerDao.getByUsername(sellerUsername);

        Category category =
                entityManager.find(Category.class, categoryId);

        if(category == null)
            throw new ResourceNotFoundException("Invalid Category Id");

        product.setSeller(seller);
        product.setCategory(category);

        entityManager.persist(product);
    }

    @Override
    public Product getById(int id,
                           String sellerUsername) {

        Product product =
                entityManager.find(Product.class, id);

        if(product == null)
            throw new ResourceNotFoundException("Invalid Product Id");

        if(!(product.getSeller()
                .getUser()
                .getUsername()
                .equals(sellerUsername))) {

            throw new InvalidOwnershipException(
                    "You do not own this product"
            );
        }

        return product;
    }

    @Override
    public void update(Product product) {

        entityManager.merge(product);
    }

    @Override
    public void delete(Product product) {

        entityManager.remove(product);
    }
}