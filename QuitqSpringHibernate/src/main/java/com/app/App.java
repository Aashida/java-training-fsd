package com.app;

import com.app.config.AppConfig;
import com.app.dao.AuthDao;
import com.app.dao.ProductDao;
import com.app.dao_impl.AuthDaoImpl;
import com.app.enums.Role;
import com.app.exceptions.InvalidOwnershipException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Product;
import com.app.model.User;
import jakarta.persistence.NoResultException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.Scanner;

public class App {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);
        AuthDao authDao =
                context.getBean(AuthDao.class);

        ProductDao productDao =
                context.getBean(ProductDao.class);

        Scanner sc = new Scanner(System.in);

        System.out.println("----------QuitQ : LOGIN----------");

        System.out.println("Enter Username");
        String username = sc.next();

        System.out.println("Enter Password");
        String password = sc.next();

        try {

            User user = authDao.login(username, password);

            switch (user.getRole().toString()) {

                case "SELLER":

                    System.out.println("Welcome " + username);

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

                                productDao.save(
                                        product,
                                        username,
                                        categoryId
                                );

                                System.out.println("Product Added");

                                break;

                            case 2:

                                System.out.println("Enter Product Id");
                                int deleteId = sc.nextInt();

                                try {

                                    Product productToDelete =
                                            productDao.getById(
                                                    deleteId,
                                                    username
                                            );

                                    productDao.delete(productToDelete);

                                    System.out.println("Product Deleted");

                                }
                                catch (ResourceNotFoundException |
                                       InvalidOwnershipException e) {

                                    System.out.println(e.getMessage());
                                }

                                break;

                            case 3:

                                System.out.println("------ ALL PRODUCTS ------");

                                productDao.findAll(username)
                                        .forEach(System.out::println);

                                break;

                            case 4:

                                System.out.println("Enter Product Id");
                                int updateId = sc.nextInt();

                                try {

                                    Product existingProduct =
                                            productDao.getById(
                                                    updateId,
                                                    username
                                            );

                                    sc.nextLine();

                                    System.out.println("Enter Product Name");
                                    existingProduct.setProductName(
                                            sc.nextLine()
                                    );

                                    System.out.println("Enter Description");
                                    existingProduct.setDescription(
                                            sc.nextLine()
                                    );

                                    System.out.println("Enter Price");
                                    existingProduct.setPrice(
                                            sc.nextDouble()
                                    );

                                    System.out.println("Enter Stock");
                                    existingProduct.setStock(
                                            sc.nextInt()
                                    );

                                    productDao.update(existingProduct);

                                    System.out.println("Product Updated");

                                }
                                catch (ResourceNotFoundException |
                                       InvalidOwnershipException e) {

                                    System.out.println(e.getMessage());
                                }

                                break;

                            default:

                                System.out.println("Invalid Option");
                        }
                    }

                    break;

                default:
                    break;
            }

        }
        catch (NoResultException e) {

            System.out.println("Invalid Credentials");
        }

        context.close();
    }
}