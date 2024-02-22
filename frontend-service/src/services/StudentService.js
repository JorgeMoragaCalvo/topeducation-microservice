import axios from 'axios';

class StudentService {
    
    getStudents(){
        return axios.get("http://localhost:8080/student/get-students/");
    }

    getStudentByRut(rut){
        return axios.get("http://localhost:8080/student/by-rut/" + rut);
    }

    createStudent(student){
        return axios.post("http://localhost:8080/student/create/", student);
    }
}

const StudentServiceInstance = new StudentService();

export default StudentServiceInstance;