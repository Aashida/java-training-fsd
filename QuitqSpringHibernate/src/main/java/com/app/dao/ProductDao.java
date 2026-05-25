package com.app.dao;

import com.app.model.Product;

import java.util.List;

public interface ProductDao {

    List<Product> findAll(String sellerUsername);

    void save(Product product,
              String sellerUsername,
              int categoryId);

    Product getById(int id,
                    String sellerUsername);

    void update(Product product);

    void delete(Product product);

}
