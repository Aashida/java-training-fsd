package com.app.model;

public class Product {
    private int id;
    private String productname;
    private String description;
    private double price;
    private int stock;

    public Product(String productname, String description, double price, int stock) {
        this.productname = productname;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    public Product(int id, String productname, String description, double price, int stock) {
        this.id = id;
        this.productname = productname;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", productname='" + productname + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", stock=" + stock +
                '}';
    }
}
