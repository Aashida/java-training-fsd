package com.springboot.myproj.service;

import com.springboot.myproj.dto.BookDto;
import com.springboot.myproj.exceptions.ResourceNotFoundException;
import com.springboot.myproj.mapper.BookMapper;
import com.springboot.myproj.model.Author;
import com.springboot.myproj.model.Book;
import com.springboot.myproj.repository.AuthorRepository;
import com.springboot.myproj.repository.BookRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
public class BookService {

    public static AuthorRepository authorRepository;
    public BookRepository bookRepository;
    public void add(@Valid BookDto dto, int authorId) {
        Book book = BookMapper.maoDtoToEntity(dto);

        Author author = authorRepository.findById(authorId).orElseThrow(()->
                new ResourceNotFoundException("Invalid id"));

        book.setAuthor(author);

        bookRepository.save(book);

    }
}
