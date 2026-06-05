package com.springboot.myproj.dto;

public record JobResponse(

        Integer id,
        String title,
        String location,
        Double salary,
        String companyName
) {
}