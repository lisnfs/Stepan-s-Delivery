package io.onisich.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
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

    @Column(name = "status")
    private int status;

    @Column(name = "payment")
    private double payment;

    @Column(name = "discount")
    private double discount;

    @JoinColumn(name = "address_id")
    private int address_id;


    @OneToMany(fetch = FetchType.LAZY,
            mappedBy = "order_id",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<DishInOrder> dishInOrders;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private User client;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courier_id")
    private User courier;

    @JsonIgnore
    @OneToOne(fetch = FetchType.EAGER)
    private DeliveryPoint deliveryPoint;

    public Integer getId() {
        return id;
    }
}
