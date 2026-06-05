package com.springboot.myproj.dto;

import com.springboot.myproj.enums.Role;

public record RegisterDto(

        String username,
        String password,

        Role role,

        String companyName,

        String name,
        String resumeSummary

) {
}