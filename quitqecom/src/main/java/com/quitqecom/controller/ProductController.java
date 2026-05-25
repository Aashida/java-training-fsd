package com.quitqecom.controller;

import com.quitqecom.exceptions.ResourceNotFoundException;
import com.quitqecom.model.Product;
import com.quitqecom.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/api/product/all")
    public List<Product> getAll() {

        return productService.getAll();
    }

    @PostMapping("/api/product/add")
    public void addProduct(@RequestBody Product product) {

        productService.addProduct(product);
    }

    @GetMapping("/api/product/get-one/{id}")
    public ResponseEntity<Object> getById(
            @PathVariable int id
    ) {

        try {

            Product product =
                    productService.getById(id);

            return ResponseEntity
                    .ok(product);

        }
        catch (ResourceNotFoundException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/api/product/delete/{id}")
    public ResponseEntity<Object> deleteById(
            @PathVariable int id
    ) {

        try {

            productService.deleteById(id);

            return ResponseEntity
                    .ok()
                    .build();

        }
        catch (ResourceNotFoundException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PutMapping("/api/product/update/{id}")
    public ResponseEntity<Object> update(
            @PathVariable int id,
            @RequestBody Product updatedProduct
    ) {

        try {

            productService.update(id,
                    updatedProduct);

            return ResponseEntity
                    .ok()
                    .build();

        }
        catch (ResourceNotFoundException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}