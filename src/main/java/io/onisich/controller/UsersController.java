package io.onisich.controller;

import io.onisich.dao.UserRepository;
import io.onisich.dao.UserRoleRepository;
import io.onisich.domain.Order;
import io.onisich.domain.User;
import io.onisich.domain.UserRole;
import io.onisich.domain.UserRoleType;
import io.onisich.dto.ApiResponse;
import io.onisich.dto.JwtAuthenticationResponse;
import io.onisich.dto.LoginRequest;
import io.onisich.dto.SignUpRequest;
import io.onisich.exception.AppException;
import io.onisich.security.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/couriers")
public class UsersController {

    private final UserRepository userRepository;

    private final UserRoleRepository roleRepository;


    public UsersController(UserRepository userRepository,
                           UserRoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }


    @GetMapping("/")
    public ResponseEntity<UserRole> getCouriers() {
        return ResponseEntity.ok(roleRepository
                .findByName(UserRoleType.ROLE_COURIER)
                .orElseThrow(() -> new AppException("User Role not set.")));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getCourier(
            @PathVariable(name = "id") Integer id
    ) {
        Optional<User> optional = userRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }


}
