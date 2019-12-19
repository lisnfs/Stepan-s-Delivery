package io.onisich.domain;

import lombok.Data;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "user_role")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private UserRoleType name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "role_users",
            inverseJoinColumns = @JoinColumn(name = "user_id"),
            joinColumns  = @JoinColumn(name = "role_id"))
    private Set<User> users = new HashSet<>();
}
