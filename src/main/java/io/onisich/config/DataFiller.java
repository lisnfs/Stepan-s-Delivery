package io.onisich.config;

import io.onisich.dao.*;
import io.onisich.domain.*;
import io.onisich.exception.AppException;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class DataFiller implements ApplicationRunner {


    private final UserRoleRepository userRoleRepository;

    private final UserRepository userRepository;

    public DataFiller(
            UserRoleRepository userRoleRepository,
            UserRepository userRepository
    ) {
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void run(ApplicationArguments args) {
//        Random random = new Random();
//
//        List<Doctor> doctors = IntStream.range(0, 50)
//                .mapToObj(element -> {
//                    Doctor doctor = new Doctor();
//                    doctor.setFullName("Doctor #" + element);
//                    doctor.setCareer("postgresCareer #" + element);
//                    doctor.setExperience(random.nextInt(80));
//                    doctor.setWorkingNumber("random-number" + random.nextInt(80));
//                    doctor.setCellPhone(88005553535L);
//                    return doctor;
//                })
//                .collect(Collectors.toList());
//
//        doctorRepository.saveAll(doctors);
//
//        List<Person> people = IntStream.range(0, 50)
//                .mapToObj(element -> {
//                    Person person = new Person();
//                    person.setBirthDate("22.09.1996");
//                    person.setCellPhone(88005553536L);
//                    person.setFullName("Person #" + element);
//                    person.setHealthInsuranceNumber("" + random.nextInt(Integer.MAX_VALUE));
//                    person.setPassportSeries(random.nextLong() * 3616L);
//                    person.setPassportNumber(random.nextLong() * 999999L);
//                    return person;
//                })
//                .collect(Collectors.toList());
//
//        personRepository.saveAll(people);
//
//        List<Medicine> medicineList = IntStream.range(0, 50)
//                .mapToObj(element -> {
//                    Medicine medicine = new Medicine();
//                    medicine.setContr("Contr # " + element);
//                    medicine.setName("Medicine name #" + element);
//                    medicine.setRate("Rate #" + element);
//                    return medicine;
//                })
//                .collect(Collectors.toList());
//
//        medicineRepository.saveAll(medicineList);
//
//        List<Patient> patients = IntStream.range(0, 50)
//                .mapToObj(element -> {
//                    Patient patient = new Patient();
//                    patient.setHealthState("Almost dead");
//                    patient.setHospitalizationDate("31.12.1990");
//                    patient.setPerson(people.get(element));
//                    patient.setIllness("SLE");
//                    return patient;
//                })
//                .collect(Collectors.toList());
//        patientRepository.saveAll(patients);
//
//        List<Prescription> prescriptions = IntStream.range(0, 50)
//                .mapToObj(element -> {
//                    Prescription prescription = new Prescription();
//                    prescription.setDescription("Description #" + element);
//                    prescription.setMedicine(medicineList.get(element));
//                    prescription.setPatient(patients.get(element));
//                    prescription.setVolume(random.nextInt(500));
//                    return prescription;
//                })
//                .collect(Collectors.toList());
//
//        prescriptionRepository.saveAll(prescriptions);
//
//        UserRole adminRole = new UserRole();
//        adminRole.setName(UserRoleType.ROLE_ADMIN);
//        userRoleRepository.save(adminRole);
//
//        UserRole clientRole = new UserRole();
//        clientRole.setName(UserRoleType.ROLE_CLIENT);
//        userRoleRepository.save(clientRole);
//
//        UserRole courierRole = new UserRole();
//        courierRole.setName(UserRoleType.ROLE_COURIER);
//        userRoleRepository.save(courierRole);
//
//        Set<UserRole> userRoles = new HashSet<>();
//        userRoles.add(adminRole);
//
//        User admin = new User();
//        admin.setUsername("admin");
//        // hashed pass 123123
//        admin.setPassword("$2a$10$qistJBEGilidVNFwUFumZuA8R4JZJ15e2kehLqq9D8uHhkrZMOo1a");
//        admin.setName("admin admin");
//        admin.setEmail("admin@gmail.com");
//        admin.setRoles(userRoles);
//        userRepository.save(admin);
//
//        Set<UserRole> clientRoles = new HashSet<>();
//        userRoles.add(clientRole);

//        UserRole clientRole = userRoleRepository.findByName(UserRoleType.ROLE_CLIENT)
//                .orElseThrow(() -> new AppException("User Role not set."));
//        Set<UserRole> clientRoles = new HashSet<>();
//        clientRoles.add(clientRole);
////
//        User client = new User();
//        client.setUsername("client");
//        // hashed pass 123123
//        client.setPassword("$2a$10$qistJBEGilidVNFwUFumZuA8R4JZJ15e2kehLqq9D8uHhkrZMOo1a");
//        client.setName("client client");
//        client.setEmail("client@gmail.com");
//        client.setRoles(clientRoles);
//        userRepository.save(client);
//
//
//        UserRole courierRole = userRoleRepository.findByName(UserRoleType.ROLE_COURIER)
//                .orElseThrow(() -> new AppException("User Role not set."));
//        Set<UserRole> courierRoles = new HashSet<>();
//        courierRoles.add(courierRole);
//
//        User courier = new User();
//        courier.setUsername("courier");
//        // hashed pass 123123
//        courier.setPassword("$2a$10$qistJBEGilidVNFwUFumZuA8R4JZJ15e2kehLqq9D8uHhkrZMOo1a");
//        courier.setName("courier courier");
//        courier.setEmail("courier@gmail.com");
//        courier.setRoles(courierRoles);
//        userRepository.save(courier);
    }
}
