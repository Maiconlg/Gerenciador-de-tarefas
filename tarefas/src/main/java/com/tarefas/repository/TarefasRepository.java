package com.tarefas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tarefas.models.Tarefa;

public interface TarefasRepository extends JpaRepository<Tarefa, Long> {
	

}
