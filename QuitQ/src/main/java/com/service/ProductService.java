package com.service;

import com.exception.InvalidOwnershipException;
import com.exception.ResourceNotFoundException;
import com.model.Category;
import com.model.Product;
import com.model.Seller;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class ProductService {

    private final Session session;

    private SellerService sellerService;

    public ProductService(Session session) {
        this.session = session;
        sellerService = new SellerService(session);
    }

    public void addProduct(Product product,
                           String username,
                           int categoryId) {

        Seller seller =
                sellerService.getByUsername(username);

        Category category =
                session.find(Category.class, categoryId);

        if(category == null)
            throw new ResourceNotFoundException("Category Id Invalid");

        product.setSeller(seller);
        product.setCategory(category);

        Transaction tx = session.beginTransaction();

        session.persist(product);

        tx.commit();
    }

    public List<Product> getProductsBySeller(String username) {

        Transaction tx = session.beginTransaction();

        List<Product> list = session
                .createQuery(
                        "from Product where seller.user.username=:username",
                        Product.class
                )
                .setParameter("username", username)
                .list();

        tx.commit();

        return list;
    }

    public Product getById(int id) {

        Transaction tx = session.beginTransaction();

        Product product =
                session.find(Product.class, id);

        tx.commit();

        if(product == null)
            throw new ResourceNotFoundException("Invalid Product Id");

        return product;
    }

    public void deleteById(int productId,
                           String username) {

        Transaction tx = session.beginTransaction();

        Product product =
                session.find(Product.class, productId);

        tx.commit();

        if(product == null)
            throw new ResourceNotFoundException("Invalid Product Id");

        Seller seller =
                sellerService.getByUsername(username);

        if(product.getSeller().getId() != seller.getId())
            throw new InvalidOwnershipException(
                    "Seller does not own this product"
            );

        tx = session.beginTransaction();

        session.remove(product);

        tx.commit();
    }

    public void updateProduct(Product product,
                              String username) {

        Seller seller =
                sellerService.getByUsername(username);

        if(product.getSeller().getId() != seller.getId())
            throw new InvalidOwnershipException(
                    "Seller does not own this product"
            );

        Transaction tx = session.beginTransaction();

        session.merge(product);

        tx.commit();
    }
}