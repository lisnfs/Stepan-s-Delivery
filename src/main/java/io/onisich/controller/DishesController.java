package io.onisich.controller;

import io.onisich.dao.DishRepository;
import io.onisich.dao.OrderRepository;
import io.onisich.domain.Dish;
import io.onisich.domain.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/dishes")
public class DishesController {

    private final DishRepository dishRepository;

    public DishesController(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Dish>> getAll() {
        return ResponseEntity.ok(dishRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dish> getDish(
            @PathVariable(name = "id") Integer id
    ) {
        Optional<Dish> optional = dishRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity addDish(@RequestBody Dish dish) {
        Dish save = dishRepository.save(dish);
        return save == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity updateDish(@RequestBody Dish dish) {
        Optional<Dish> optional = dishRepository.findById(dish.getId());
        if (optional.isPresent()) {
            dishRepository.save(dish);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteDish(@PathVariable(name = "id") Integer id) {
        this.dishRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
