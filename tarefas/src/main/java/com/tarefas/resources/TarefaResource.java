package com.tarefas.resources;




import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tarefas.models.Tarefa;
import com.tarefas.repository.TarefasRepository;




@RestController
@CrossOrigin("${origem-permitida}")
@RequestMapping("/tarefas")
public class TarefaResource {
	@Autowired
	private TarefasRepository er;

	@GetMapping(produces="application/json")
	public @ResponseBody Iterable<Tarefa> listaTarefas(){
		Iterable<Tarefa> listaTarefas = er.findAll();
		return listaTarefas;
	}
	
	@GetMapping("/baixa")
	public ArrayList<Tarefa> listaTarefasBaixa(){
		Iterable<Tarefa> listaTarefas = er.findAll();
		ArrayList<Tarefa> listaTarefasBaixa = new ArrayList<>();
		for(Tarefa t : listaTarefas) {
			if(t.getSeveridade().equals("Baixa")&&t.getRealizada()==false&&t.getDeadline().after(new Date())) {
				listaTarefasBaixa.add(t);
			}
		}
		return listaTarefasBaixa;
	}
	
	@GetMapping("/media")
	public ArrayList<Tarefa> listaTarefasMedia(){
		Iterable<Tarefa> listaTarefas = er.findAll();
		ArrayList<Tarefa> listaTarefasMedia = new ArrayList<>();
		for(Tarefa t : listaTarefas) {
			if(t.getSeveridade().equals("Média")&&t.getRealizada()==false&&t.getDeadline().after(new Date())) {
				listaTarefasMedia.add(t);
			}
		}
		return listaTarefasMedia;
	}
	
	@GetMapping("/alta")
	public ArrayList<Tarefa> listaTarefasAlta(){
		Iterable<Tarefa> listaTarefas = er.findAll();
		ArrayList<Tarefa> listaTarefasAlta = new ArrayList<>();
		for(Tarefa t : listaTarefas) {
			if(t.getSeveridade().equals("Alta")&&t.getRealizada()==false&&t.getDeadline().after(new Date())) {
				listaTarefasAlta.add(t);
			}
		}
		return listaTarefasAlta;
	}
	
	@GetMapping("/urgente")
	public ArrayList<Tarefa> listaTarefasUrgente(){
		Iterable<Tarefa> listaTarefas = er.findAll();		
		ArrayList<Tarefa> listaTarefasUrgente = new ArrayList<>();
		for(Tarefa t : listaTarefas) {
			if(t.getSeveridade().equals("Urgente")&&t.getRealizada()==false&&t.getDeadline().after(new Date())) {
				listaTarefasUrgente.add(t);
			}
		}
		
		return listaTarefasUrgente;
	}
	
	@GetMapping("/atrasadas")
	public ArrayList<Tarefa> listaTarefasAtrasadas(){
		Iterable<Tarefa> listaTarefas = er.findAll();
		ArrayList<Tarefa> listaTarefasAtrasadas = new ArrayList<>();
		for(Tarefa t : listaTarefas) {
			if(t.getRealizada()==false&&t.getDeadline().before(new Date())) {
				listaTarefasAtrasadas.add(t);
			}
		}
		return listaTarefasAtrasadas;
	}
	
	@GetMapping("/{id}")
	public Tarefa buscaTarefa(@PathVariable Long id){
		Tarefa tarefa = er.findOne(id);
		return tarefa;	
	}
	

	@PostMapping()
	public Tarefa salvarTarefa(@RequestBody Tarefa tarefa){
		return er.save(tarefa);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@DeleteMapping("/{id}")
	public ResponseEntity deletarTarefa(@PathVariable Long id){
		Tarefa tarefa = er.findOne(id);
		if(tarefa==null) {
			return new ResponseEntity("Não encotrada a tarefa", HttpStatus.NOT_FOUND);
		}		
		er.delete(tarefa);
		return new ResponseEntity(id,HttpStatus.OK);

	}

	@PutMapping()
	public Tarefa atualizarTarefa(@RequestBody Tarefa tarefa) {
		return er.save(tarefa);		
	}
	
	
	



}
