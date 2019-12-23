package io.onisich.controller;

import io.onisich.dao.DishInOrderRepository;
import io.onisich.dao.OrderRepository;
import io.onisich.domain.DishInOrder;
import io.onisich.exception.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/dishInOrders")
public class DishInOrdersController {

    private final DishInOrderRepository dishInOrderRepository;
    private final OrderRepository orderRepository;

    public DishInOrdersController(DishInOrderRepository dishInOrderRepository,
                                  OrderRepository orderRepository) {
        this.dishInOrderRepository = dishInOrderRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<DishInOrder>> getAll() {
        return ResponseEntity.ok(dishInOrderRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DishInOrder> getDishInOrder(
            @PathVariable(name = "id") Integer id
    ) {
        Optional<DishInOrder> optional = dishInOrderRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity addDishInOrder(@RequestBody DishInOrder dishInOrder) {
        DishInOrder save = dishInOrderRepository.save(dishInOrder);
        return save == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity updateDishInOrder(@RequestBody DishInOrder order) {
        Optional<DishInOrder> optional = dishInOrderRepository.findById(order.getId());
        if (optional.isPresent()) {
            dishInOrderRepository.save(order);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity deleteOrder(@PathVariable(name = "id") Integer id) {
//        this.dishInOrderRepository.deleteById(id);
//        return ResponseEntity.ok().build();
//    }
}
