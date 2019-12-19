package io.onisich.dao;

import io.onisich.domain.User;
import io.onisich.domain.UserRole;
import io.onisich.domain.UserRoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findByName(UserRoleType roleType);

//    List<UserRole> findAllUsersByName(UserRoleType roleType);
}
