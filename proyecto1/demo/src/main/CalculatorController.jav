package com.example.calculator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalculatorController {

    @GetMapping("/api/calculator/calculate")
    public ResponseEntity<String> calculate(@RequestParam String operation) {
        try {
            double result = performOperation(operation);
            return ResponseEntity.ok("Result: " + result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid operation");
        }
    }

    private double performOperation(String operation) {
        // Implement the logic for parsing and evaluating the expression
        // For simplicity, we'll use JavaScript's eval function here
        // In a real-world scenario, you should use a proper expression evaluator
        return new Object() {
            public double eval(String expr) {
                return (double) javax.script.ScriptEngineManager.getDefault().getEngineByName("JavaScript").eval(expr);
            }
        }.eval(operation);
    }
}
