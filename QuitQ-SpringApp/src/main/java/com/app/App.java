package com.app;

import com.app.config.AppConfig;
import com.app.dao.ProductDao;
import com.app.dao_impl.ProductDaoImpl;
import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Product;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.dao.EmptyResultDataAccessException;

import javax.sql.DataSource;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        Scanner sc = new Scanner(System.in);

        ProductDao productDao = context.getBean(ProductDaoImpl.class);
        while(true){
            System.out.println("1. Add Product");
            System.out.println("2. Delete Product by Id");
            System.out.println("3. Update Product Stock");
            System.out.println("4. All Products ");
            System.out.println("5. Get Product by id");
            System.out.println("0. Exit");
            int op = sc.nextInt();
            if(op == 0)
                break;
            switch (op){
                case 1:
                    productDao.insert(new Product("Laptop", "Gaming laptop", 75000, 10));
                    break;

                case 2:
                    System.out.println("Enter Id to delete incident");
                    int id = sc.nextInt();
                    try {
                        productDao.deleteById(id);
                    }
                    catch(ResourceNotFoundException e){
                        System.out.println(e.getMessage());
                    }
                    break;

                case 3:
                    System.out.println("Enter product id to update stock");
                    try{
                        Product product = productDao.getById(sc.nextInt());
                        System.out.println("Existing product details");
                        System.out.println(product);
                        System.out.println("Enter stock count to edit");
                        sc.nextLine();
                        int stock = sc.nextInt();
                        product.setStock(stock);
                        productDao.update(product);
                        System.out.println("Updated");
                    }catch(EmptyResultDataAccessException e){
                        System.out.println("invalid id");
                    }
                    break;

                case 4:
                    productDao.getAll().forEach(System.out::println);
                    break;

                case 5:
                    System.out.println("Enter id to fetch Product:");
                    id = sc.nextInt();
                    try{
                        Product product = productDao.getById(id);
                        System.out.println(product);
                    }
                    catch(EmptyResultDataAccessException e){
                        System.out.println("Invalid id");
                }
                    break;
            }
        }

        context.close();
    }
}
