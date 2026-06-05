package com.springboot.myproj.mapper;

import com.springboot.myproj.dto.ApplicationResponse;
import com.springboot.myproj.model.Application;

public class ApplicationMapper {

    public static ApplicationResponse mapEntityToDto(
            Application application){

        return new ApplicationResponse(
                application.getId(),
                application.getAppliedAt(),
                application.getJob().getTitle(),
                application.getJob()
                        .getEmployer()
                        .getCompanyName()
        );
    }
}