package com.app.dao_impl;

import com.app.dao.AuthDao;
import com.app.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Component;

@Component
public class AuthDaoImpl implements AuthDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User login(String username, String password) {

        Query query =
                entityManager.createQuery(
                        "select u from User u where u.username=:username and u.password=:password"
                );

        query.setParameter("username", username);
        query.setParameter("password", password);

        return (User) query.getSingleResult();
    }
}