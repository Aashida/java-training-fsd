package com.config;

import com.model.*;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateConfig {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {

        if(sessionFactory == null) {

            Configuration configuration = new Configuration();

            configuration.setProperty(
                    "hibernate.connection.url",
                    "jdbc:mysql://localhost:3306/quitq?createDatabaseIfNotExist=true"
            );

            configuration.setProperty(
                    "hibernate.connection.username",
                    "root"
            );

            configuration.setProperty(
                    "hibernate.connection.password",
                    "root123"
            );

            configuration.setProperty(
                    "hibernate.connection.driver_class",
                    "com.mysql.cj.jdbc.Driver"
            );

            configuration.setProperty(
                    "hibernate.dialect",
                    "org.hibernate.dialect.MySQLDialect"
            );

            configuration.setProperty(
                    "hibernate.hbm2ddl.auto",
                    "update"
            );

            configuration.setProperty(
                    "hibernate.show_sql",
                    "false"
            );

            configuration.addAnnotatedClass(Product.class);
            configuration.addAnnotatedClass(Customer.class);
            configuration.addAnnotatedClass(Category.class);
            configuration.addAnnotatedClass(User.class);
            configuration.addAnnotatedClass(Seller.class);

            sessionFactory = configuration.buildSessionFactory();
        }

        return sessionFactory;
    }
}