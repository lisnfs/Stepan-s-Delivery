package io.onisich.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "timeorder")
    @Temporal(TemporalType.TIMESTAMP)
    private Date timeOrder;

    @Column(name = "timedelivery")
    @Temporal(TemporalType.TIMESTAMP)
    private Date timeDelivery;

    @Column(name = "address")
    private String address;

    @Column(name = "payment")
    private double payment;

    @Column(name = "discount")
    private double discount;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Integer getId() {
        return id;
    }
}
