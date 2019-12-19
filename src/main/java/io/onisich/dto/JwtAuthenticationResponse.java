package io.onisich.dto;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private List<GrantedAuthority> list;

    public JwtAuthenticationResponse(String jwt, List<GrantedAuthority> list) {
        this.accessToken = jwt;
        this.list = list;
    }
}
