package com.app.dao;

import com.app.model.Product;

import java.util.List;

public interface ProductDao {

    void insert(Product product);
    List<Product> getAll();
    Product getById(int id);
    void deleteById(int id);
    void update(Product product);

}
