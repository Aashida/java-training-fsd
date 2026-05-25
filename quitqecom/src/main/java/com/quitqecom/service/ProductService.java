package com.quitqecom.service;

import com.quitqecom.exceptions.ResourceNotFoundException;
import com.quitqecom.model.Product;
import com.quitqecom.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    public Product getById(int id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid Product Id"
                        )
                );
    }

    public void deleteById(int id) {

        getById(id);

        productRepository.deleteById(id);
    }

    public void update(int id,
                       Product updatedProduct) {

        Product existingProduct =
                getById(id);

        existingProduct.setProductName(
                updatedProduct.getProductName()
        );

        existingProduct.setDescription(
                updatedProduct.getDescription()
        );

        existingProduct.setPrice(
                updatedProduct.getPrice()
        );

        existingProduct.setStock(
                updatedProduct.getStock()
        );

        productRepository.save(existingProduct);
    }
}