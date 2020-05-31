package com.mightyjava.service.impl;

import com.mightyjava.domain.Patient;
import com.mightyjava.repository.PatientRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mightyjava.service.IService;

@Service
public class PatientServiceImpl implements IService<Patient> {
	
	@Autowired
	private PatientRepository patientRepository;

	@Override
	public Page<Patient> findAll(Pageable pageable, String searchText) {
		return patientRepository.findAllPatients(pageable, searchText);
	}

	@Override
	public Page<Patient> findAll(Pageable pageable) {
		return patientRepository.findAll(pageable);
	}

	@Override
	public Patient findById(Long id) {
		return patientRepository.findById(id).get();
	}

	@Override
	public Patient saveOrUpdate(Patient patient) {
		return patientRepository.save(patient);
	}

	@Override
	public String deleteById(Long id) {
		JSONObject jsonObject = new JSONObject();
		try {
			patientRepository.deleteById(id);
			jsonObject.put("message", "Patient deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}
