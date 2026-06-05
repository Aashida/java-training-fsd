package com.springboot.myproj.repository;

import com.springboot.myproj.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
