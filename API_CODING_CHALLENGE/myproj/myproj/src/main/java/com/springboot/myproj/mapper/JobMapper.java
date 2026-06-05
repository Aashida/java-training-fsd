package com.springboot.myproj.mapper;

import com.springboot.myproj.dto.JobResponse;
import com.springboot.myproj.model.Job;

public class JobMapper {
    public static JobResponse mapEntityToDto(Job job){
        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getLocation(),
                job.getSalary(),
                job.getEmployer().getCompanyName()
        );
    }
}
