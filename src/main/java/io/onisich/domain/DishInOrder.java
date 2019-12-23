package io.onisich.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "dishes_in_order")
public class DishInOrder {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "order_id", nullable = false)
    private Integer order_id;

    @Column(name = "dish_id", nullable = false)
    private Integer dish_id;

    @Column(name = "count")
    private Integer count;

    @JsonIgnore
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dish")
    private Dish dish;

/*    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE,
                    CascadeType.PERSIST})
    @JoinColumn(name = "order_id")
    private Order order;*/


    public Integer getId() {
        return id;
    }

}
