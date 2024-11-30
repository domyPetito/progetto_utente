package com.petito.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.petito.controller.UtenteController;
import jakarta.servlet.http.HttpServletRequest;


@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice(assignableTypes = UtenteController.class)
public class UtenteControllerHandler {
	
	@ExceptionHandler(Exception.class)
    public ResponseEntity<?> genericException(Exception e, HttpServletRequest request) { 
        return ResponseEntity.ok(ApiResponse.error(ApiResponse.getErrorCodeByMethod(request.getMethod()),"ERRORE UTENTE: "+e.getClass().getName()));
    }
 

}
