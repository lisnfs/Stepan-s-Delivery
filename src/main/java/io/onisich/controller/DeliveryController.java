package io.onisich.controller;

import io.onisich.dao.DeliveryRepository;
import io.onisich.domain.DeliveryPoint;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/deliveryPoints")
public class DeliveryController {

    private final DeliveryRepository deliveryRepository;

    public DeliveryController(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<DeliveryPoint>> getAll() {
        return ResponseEntity.ok(deliveryRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryPoint> getDeliveryPoint(
            @PathVariable(name = "id") Integer id
    ) {
        Optional<DeliveryPoint> optional = deliveryRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity addDeliveryPoint(@RequestBody DeliveryPoint dish) {
        DeliveryPoint save = deliveryRepository.save(dish);
        return save == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity updateDeliveryPoint(@RequestBody DeliveryPoint dish) {
        Optional<DeliveryPoint> optional = deliveryRepository.findById(dish.getId());
        if (optional.isPresent()) {
            deliveryRepository.save(dish);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteDeliveryPoint(@PathVariable(name = "id") Integer id) {
        this.deliveryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
