package io.onisich.controller;

import io.onisich.dao.OrderRepository;
import io.onisich.domain.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

//    @PostMapping
//    public ResponseEntity addDoctor(@RequestBody Doctor doctor) {
//        Doctor save = orderRepository.save(doctor);
//        return save == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok().build();
//    }

//    @PostMapping("/update")
//    public ResponseEntity updateDoctor(@RequestBody Doctor doctor) {
//        Optional<Doctor> optional = orderRepository.findById(doctor.getId());
//        if (optional.isPresent()) {
//            orderRepository.save(doctor);
//            return ResponseEntity.ok().build();
//        } else {
//            return ResponseEntity.badRequest().build();
//        }
//    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity deleteDoctor(@PathVariable(name = "id") Integer id) {
//        this.orderRepository.deleteById(id);
//        return ResponseEntity.ok().build();
//    }
}
