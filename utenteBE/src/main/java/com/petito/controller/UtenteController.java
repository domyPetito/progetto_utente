package com.petito.controller;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.petito.exception.ApiResponse;
import com.petito.model.Utente;
import com.petito.service.UtenteService;

@RequestMapping("/utente")
@RestController
public class UtenteController {

	private final UtenteService utenteService;
	
	UtenteController(UtenteService utenteService) {
		this.utenteService = utenteService;
	}
	
	@ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> dataIntegrityHandler(DataIntegrityViolationException e, WebRequest request) {
    	return ResponseEntity.ok(ApiResponse.error(ApiResponse.ERROR_EXISTING_EMAIL, e.getMessage()));
    }
	
	@GetMapping
	public ApiResponse<List<Utente>> listaUtenti() {
		return ApiResponse.success(ApiResponse.SUCCESS_GET, utenteService.listaUtenti());
	}
	
	@PostMapping
	public ApiResponse<Utente> salvaUtente(@RequestBody Utente utente) {
		return ApiResponse.success(ApiResponse.SUCCESS_POST, utenteService.salvaUtente(utente));
	}
	
	@PutMapping("/{id}")
	public ApiResponse<Utente> modificaUtente(@PathVariable Integer id, @RequestBody Utente utente) {
		return ApiResponse.success(ApiResponse.SUCCESS_PUT, utenteService.modificaUtente(id, utente));
	}
	
	@DeleteMapping("/{id}")
	public ApiResponse<Utente> eliminaUtente(@PathVariable Integer id) {
		return ApiResponse.success(ApiResponse.SUCCESS_DELETE, utenteService.eliminaUtente(id));
	}
	
	
}
