import axios from "axios";

class ReportService {
    getReport(rut){
        return axios.get("http://localhost:8080/score-report/" + rut);
    }

    getAllReport(){
        return axios.get("http://localhost:8080/score-report/all-report/");
    }
}

const ReportServiceInstance = new ReportService();

export default ReportServiceInstance;