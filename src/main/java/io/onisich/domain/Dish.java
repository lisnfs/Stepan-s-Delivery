package io.onisich.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table
public class Dish {
    @Id
    @Column(name = "dish_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "dish_name")
    private String name;

    @Column(name = "dish_ingredients")
    private String ingredients;

    @Column(name = "dish_cost")
    private Integer cost;

    public Integer getId() {
        return id;
    }
}
