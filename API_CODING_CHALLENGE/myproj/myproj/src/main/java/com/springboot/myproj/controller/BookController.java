package com.springboot.myproj.controller;


import com.springboot.myproj.dto.BookDto;
import com.springboot.myproj.service.BookService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/book")
public class BookController {

    private final BookService bookService;

    @PostMapping("/add")
    public void add(@Valid @RequestBody BookDto dto, @PathVariable int authorId){

        bookService.add(dto, authorId);
    }
}
