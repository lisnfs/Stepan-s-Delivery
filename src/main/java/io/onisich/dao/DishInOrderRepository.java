package io.onisich.dao;

import io.onisich.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DishInOrderRepository extends JpaRepository<Order, Integer> {

}
