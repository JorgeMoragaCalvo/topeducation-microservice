import axios from 'axios';

class TestScoreService {
    getTests(){
        return axios.get("http://localhost:8080/score-report/tests/");
    }

    processExcelFile(){
        return axios.post("http://localhost:8080/score-report/process-excel/");
    }
}

const TestScoreServiceInstance = new TestScoreService();

export default TestScoreServiceInstance;