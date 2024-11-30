package com.petito.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import jakarta.servlet.http.HttpServletRequest;

@Order(Ordered.LOWEST_PRECEDENCE)
@ControllerAdvice
public class ControllerHandler {
	
	@ExceptionHandler(Exception.class)
    public ResponseEntity<?> genericException(Exception e, HttpServletRequest request) { 
        return ResponseEntity.ok(ApiResponse.error(ApiResponse.getErrorCodeByMethod(request.getMethod()),"ERRORE GLOBALE: "+e.getClass().getName()));
    }

}
