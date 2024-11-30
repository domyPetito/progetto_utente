package com.petito.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petito.model.Utente;
import com.petito.repository.UtenteRepository;

@Service
public class UtenteService {
	
	private final UtenteRepository utenteRepository;
	
	UtenteService(UtenteRepository utenteRepository) {
		this.utenteRepository = utenteRepository;
	}
	
	public List<Utente> listaUtenti() {
		return utenteRepository.findAll();
	}
	
	public Utente salvaUtente(Utente utente) {
		return utenteRepository.save(utente);
	}
	
	public Utente modificaUtente(Integer id, Utente utente) {
		utente.setId(id);
		salvaUtente(utente);
		return utente;
	}
	
	public Utente eliminaUtente(Integer id) {
		Utente utente = utenteRepository.findById(id).get();
		utenteRepository.deleteById(id);
		return utente;
	}
	
}
