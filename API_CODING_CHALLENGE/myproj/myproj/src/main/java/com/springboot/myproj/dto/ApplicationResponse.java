package com.springboot.myproj.dto;

import java.time.Instant;

public record ApplicationResponse(

        Integer id,
        Instant appliedAt,
        String jobTitle,
        String companyName
) {
}