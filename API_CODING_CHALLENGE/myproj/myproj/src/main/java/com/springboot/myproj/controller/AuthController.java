package com.springboot.myproj.controller;

import com.springboot.myproj.dto.RegisterDto;
import com.springboot.myproj.dto.TokenDto;
import com.springboot.myproj.service.AuthService;
import com.springboot.myproj.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtility jwtUtility;

    @PostMapping("/register")
    public void register(@RequestBody RegisterDto dto){
        authService.register(dto);
    }

    @PostMapping("/login")
    public TokenDto login(Principal principal){

        String username = principal.getName();

        String token = jwtUtility.generateToken(username);

        return new TokenDto(username, token);
    }
}