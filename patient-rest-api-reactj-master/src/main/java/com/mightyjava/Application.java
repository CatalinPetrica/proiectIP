package com.mightyjava;

import com.mightyjava.domain.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mightyjava.service.IService;

@SpringBootApplication
public class Application implements CommandLineRunner {
	
	@Autowired
	private IService<Patient> service;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		for(int i=1; i<=1000; i++) {
			Patient patient = new Patient();
			patient.setName("Spring "+i);
			patient.setSurname("Johy "+i);
			patient.setUsername("Madalina1 "+i);
			patient.setPatientPhotoURL("https://images-na.ssl-images-amazon.com/images/I/417zLTa1uqL._SX397_BO1,204,203,200_.jpg");
			patient.setCnp("1617293989L");
			patient.setAge(22+ i);
			patient.setCountry("Romania");
			patient.setCounty("Timis");
			patient.setCity("Timisoara");
			patient.setAdress("undeva");
			patient.setPhone("0725984957");
			patient.setEmail("mady_jon@upt.ro");
			patient.setJob("IT");
			service.saveOrUpdate(patient);
		}
	}

}
