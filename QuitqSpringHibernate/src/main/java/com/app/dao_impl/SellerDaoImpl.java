package com.app.dao_impl;

import com.app.dao.SellerDao;
import com.app.model.Seller;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Component;

@Component
public class SellerDaoImpl implements SellerDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Seller getByUsername(String sellerUsername) {

        String sql =
                "select s from Seller s where s.user.username=?1";

        TypedQuery<Seller> query =
                entityManager.createQuery(sql, Seller.class);

        query.setParameter(1, sellerUsername);

        return query.getSingleResult();
    }
}