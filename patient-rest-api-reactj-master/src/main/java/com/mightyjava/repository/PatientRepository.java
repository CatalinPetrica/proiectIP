package com.mightyjava.repository;

import com.mightyjava.domain.Patient;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Repository
public interface PatientRepository extends PagingAndSortingRepository<Patient, Long> {

    @Query("From Patient b WHERE b.name=:searchText OR b.surname=:searchText OR b.username=:searchText OR b.cnp=:searchText OR b.country=:searchText OR b.county=:searchText ORDER BY b.age DESC")
    Page<Patient> findAllPatients(Pageable pageable, @Param("searchText") String searchText);
}
