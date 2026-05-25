package com.app.dao_impl;

import com.app.dao.ProductDao;
import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Product;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import javax.xml.transform.Result;
import java.sql.ResultSet;
import java.util.List;

@Component
public class ProductDaoImpl implements ProductDao {
    private final JdbcTemplate jdbcTemplate;

    public ProductDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Product> mapper(){
        return(ResultSet rs, int num)->{
            return new Product(
                    rs.getInt("id"),
                    rs.getString("productname"),
                    rs.getString("description"),
                    rs.getDouble("price"),
                    rs.getInt("stock")
            );
        };
    }


    @Override
    public void insert(Product product) {
             String sql = "insert into product(productname, description, price, stock)" +
                     "values(?,?,?,?)";
        jdbcTemplate.update(sql,
                product.getProductname(),
                product.getDescription(),
                product.getPrice(),
                product.getStock());

        System.out.println("Product Added..");
    }

    @Override
    public List<Product> getAll() {
        String sql = "select * from product";

        return jdbcTemplate.query(sql,mapper());
    }

    @Override
    public Product getById(int id) {
        String sql = "select * from product where id = ?";

        return jdbcTemplate.queryForObject(sql,mapper(), id);
    }

    @Override
    public void deleteById(int id) {
        String sql ="delete from product where id =? ";
        int numRow = jdbcTemplate.update(sql, id);
        if(numRow == 0)
            throw new ResourceNotFoundException("Invalid id");

        System.out.println("incident deleted");
    }

    @Override
    public void update(Product product) {
        String sql= "update product SET stock =? where id = ?";
        jdbcTemplate.update(sql,product.getStock() , product.getId());
        System.out.println("Record updated ");
    }
}
