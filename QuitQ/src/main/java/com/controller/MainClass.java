package com.controller;

import com.config.HibernateConfig;
import com.exception.InvalidOwnershipException;
import com.exception.ResourceNotFoundException;
import com.model.Product;
import com.model.User;
import com.service.AuthService;
import com.service.ProductService;
import jakarta.persistence.NoResultException;
import org.hibernate.Session;

import java.util.List;
import java.util.Scanner;

public class MainClass {

    public static void main(String[] args) {

        Session session =
                HibernateConfig
                        .getSessionFactory()
                        .openSession();

        Scanner sc = new Scanner(System.in);

        AuthService authService = new AuthService(session);
        ProductService productService = new ProductService(session);

        System.out.println("----------- ECOM LOGIN -----------");

        System.out.println("Enter Username");
        String username = sc.next();

        System.out.println("Enter Password");
        String password = sc.next();

        try {

            User user = authService.login(username, password);

            switch (user.getRole().toString()) {

                case "SELLER":

                    System.out.println("------ SELLER MENU ------");

                    while (true) {

                        System.out.println("1. Add Product");
                        System.out.println("2. Delete Product");
                        System.out.println("3. View My Products");
                        System.out.println("4. Update Product");
                        System.out.println("0. Exit");

                        int op = sc.nextInt();

                        if (op == 0)
                            break;

                        switch (op) {

                            case 1:

                                Product product = new Product();

                                sc.nextLine();

                                System.out.println("Enter Product Name");
                                product.setProductName(sc.nextLine());

                                System.out.println("Enter Description");
                                product.setDescription(sc.nextLine());

                                System.out.println("Enter Price");
                                product.setPrice(sc.nextDouble());

                                System.out.println("Enter Stock");
                                product.setStock(sc.nextInt());

                                System.out.println("Enter Category Id");
                                int categoryId = sc.nextInt();

                                productService.addProduct(product,
                                        username,
                                        categoryId);

                                System.out.println("Product Added");

                                break;

                            case 2:

                                System.out.println("Enter Product Id");
                                int deleteId = sc.nextInt();

                                try {

                                    productService.deleteById(deleteId,
                                            username);

                                    System.out.println("Product Deleted");

                                } catch (ResourceNotFoundException |
                                         InvalidOwnershipException e) {

                                    System.out.println(e.getMessage());
                                }

                                break;

                            case 3:

                                List<Product> list =
                                        productService
                                                .getProductsBySeller(username);

                                for (Product p : list) {
                                    System.out.println(p);
                                }

                                break;

                            case 4:

                                System.out.println("Enter Product Id");
                                int updateId = sc.nextInt();

                                try {

                                    Product existingProduct =
                                            productService.getById(updateId);

                                    sc.nextLine();

                                    System.out.println("Enter New Product Name");
                                    existingProduct.setProductName(sc.nextLine());

                                    System.out.println("Enter New Description");
                                    existingProduct.setDescription(sc.nextLine());

                                    System.out.println("Enter New Price");
                                    existingProduct.setPrice(sc.nextDouble());

                                    System.out.println("Enter New Stock");
                                    existingProduct.setStock(sc.nextInt());

                                    productService.updateProduct(
                                            existingProduct,
                                            username
                                    );

                                    System.out.println("Product Updated");

                                } catch (ResourceNotFoundException |
                                         InvalidOwnershipException e) {

                                    System.out.println(e.getMessage());
                                }

                                break;

                            default:
                                System.out.println("Invalid Option");
                        }
                    }

                    break;

                case "CUSTOMER":

                    System.out.println("Customer Menu");
                    break;

                default:
                    System.out.println("Invalid Role");
            }

        } catch (NoResultException e) {

            System.out.println("Invalid Credentials");
        }

        sc.close();
        session.close();
    }
}