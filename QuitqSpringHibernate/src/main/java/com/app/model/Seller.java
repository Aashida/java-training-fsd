package com.app.model;

import jakarta.persistence.*;

@Entity
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String sellername;

    private String email;
    private String phone;


    @OneToOne
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSellername() {
        return sellername;
    }

    public void setSellername(String sellername) {
        this.sellername = sellername;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Seller() {

    }

    public Seller(int id, String sellername, String email, String phone, User user) {
        this.id = id;
        this.sellername = sellername;
        this.email = email;
        this.phone = phone;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Seller{" +
                "id=" + id +
                ", sellername='" + sellername + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
