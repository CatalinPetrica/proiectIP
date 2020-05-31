package com.mightyjava.resource.impl;

import com.mightyjava.domain.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import com.mightyjava.resource.Resource;
import com.mightyjava.service.IService;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins="http://localhost:3000")
public class PatientResourceImpl implements Resource<Patient> {
	
	@Autowired
	private IService<Patient> patientIService;

	@Override
	public ResponseEntity<Page<Patient>> findAll(Pageable pageable, String searchText) {
		return new ResponseEntity<>(patientIService.findAll(pageable, searchText), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Page<Patient>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(patientIService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Patient> findById(Long id) {
		return new ResponseEntity<>(patientIService.findById(id), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Patient> save(Patient patient) {
		return new ResponseEntity<>(patientIService.saveOrUpdate(patient), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Patient> update(Patient patient) {
		return new ResponseEntity<>(patientIService.saveOrUpdate(patient), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(patientIService.deleteById(id), HttpStatus.OK);
	}

	@GetMapping("/countries")
	public  ResponseEntity<Set<String>> findAllCountry() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Frence", "Romania", "UK", "Russia", "India", "Arabia", "Spain", "China")), HttpStatus.OK);
    }

    @GetMapping("/genres")
    public  ResponseEntity<Set<String>> findAllJobs() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("IT", "Doctor", "Fireman", "Policeman", "Scientist", "Professor", "Farmer")), HttpStatus.OK);
    }
}
