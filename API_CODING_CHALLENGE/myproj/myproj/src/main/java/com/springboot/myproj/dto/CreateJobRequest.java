package com.springboot.myproj.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateJobRequest(

        @NotBlank
        String title,

        @NotBlank
        String description,

        String location,

        @NotNull
        Double salary
) {
}