package com.petito.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.petito.model.Utente;

public interface UtenteRepository extends JpaRepository<Utente, Integer>{

}
