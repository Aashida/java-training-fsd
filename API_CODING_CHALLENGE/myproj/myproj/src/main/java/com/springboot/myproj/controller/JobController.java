package com.springboot.myproj.controller;

import com.springboot.myproj.dto.CreateJobRequest;
import com.springboot.myproj.dto.JobResponse;
import com.springboot.myproj.service.JobService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@AllArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping
    public void createJob(
            @Valid @RequestBody CreateJobRequest dto,
            Principal principal){

        String username = principal.getName();

        jobService.createJob(dto, username);
    }

    @GetMapping
    public List<JobResponse> getAllJobs(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "10") int size){

        return jobService.getAllJobs(page,size);
    }
}