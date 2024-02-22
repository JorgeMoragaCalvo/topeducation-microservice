import axios from "axios";

class TuitionService {
    async getTuition(){
        return axios.get("http://localhost:8080/tuition/get/");
    }

    getTuitionByRut(rut){
        return axios.get("http://localhost:8080/tuition/by-rut/" + rut);
    }

    async createTuition(tuition){
        return axios.post("http://localhost:8080/tuition/create/", tuition);
    }
}

const TuitionServiceInstance = new TuitionService();

export default TuitionServiceInstance;