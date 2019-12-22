package io.onisich.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table
public class DeliveryPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

}
