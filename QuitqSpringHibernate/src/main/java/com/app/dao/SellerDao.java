package com.app.dao;

import com.app.model.Seller;

public interface SellerDao {

    Seller getByUsername(String sellerUsername);

}
