package com.springboot.myproj.mapper;

import com.springboot.myproj.dto.BookDto;
import com.springboot.myproj.model.Book;

public class BookMapper {
    public static Book maoDtoToEntity(BookDto dto){
        Book book = new Book();
        book.setTitle(dto.title());
        book.setSummary(dto.Summary());
    return book;
    }
}
