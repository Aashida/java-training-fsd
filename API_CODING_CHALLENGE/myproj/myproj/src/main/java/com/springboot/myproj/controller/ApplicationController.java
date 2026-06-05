package com.springboot.myproj.controller;

import com.springboot.myproj.dto.ApplicationResponse;
import com.springboot.myproj.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/api/applications")
    public void applyForJob(@RequestParam int jobId, Principal principal){

        String username = principal.getName();

        applicationService.apply(jobId, username);
    }

    @GetMapping("api/myapplications")
    public List<ApplicationResponse> getMyApplications(Principal principal,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "10") int size){

        return applicationService.getMyApplications(principal.getName(), page, size);
    }
}
