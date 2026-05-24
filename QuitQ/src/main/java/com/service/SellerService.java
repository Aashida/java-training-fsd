package com.service;

import com.model.Seller;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class SellerService {

    private final Session session;

    public SellerService(Session session) {
        this.session = session;
    }

    public Seller getByUsername(String username) {

        Transaction tx = session.beginTransaction();

        Seller seller = session
                .createQuery(
                        "select s from Seller s where s.user.username=:username",
                        Seller.class
                )
                .setParameter("username", username)
                .getSingleResult();

        tx.commit();

        return seller;
    }
}