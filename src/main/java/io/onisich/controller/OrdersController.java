package io.onisich.controller;

import io.onisich.dao.OrderRepository;
import io.onisich.domain.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/orders")
public class OrdersController {

    private final OrderRepository orderRepository;

    public OrdersController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Order>> getAll() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(
            @PathVariable(name = "id") Integer id
    ) {
        Optional<Order> optional = orderRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity addOrder(@RequestBody Order order) {

        order.setTimeOrder(new Date());
        Order save = orderRepository.save(order);
        return save == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity updateOrder(@RequestBody Order order) {
        Optional<Order> optional = orderRepository.findById(order.getId());
        if (optional.isPresent()) {
            orderRepository.save(order);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity deleteOrder(@PathVariable(name = "id") Integer id) {
//        this.orderRepository.deleteById(id);
//        return ResponseEntity.ok().build();
//    }
}
