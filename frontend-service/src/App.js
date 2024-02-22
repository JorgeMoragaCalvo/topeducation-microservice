import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddStudentComponent from './components/AddStudentComponent';
import StudentListComponent from './components/StudentListComponent';
import CreateTuitionComponent from './components/CreateTuitionComponent';
import TuitionListComponent from './components/TuitionListComponent';
import MainComponent from './components/MainComponent';
import CreateTestScoreComponent from './components/CreateTestScoreComponent';
import TestsListComponent from './components/TestsListComponent';
import ReportListComponent from './components/ReportListComponent';
import CreateReportComponent from './components/CreateReportComponent';
import RutCapture from './components/CreateReportComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/add-student' element={<AddStudentComponent />} />
          <Route path='/student-list' element={< StudentListComponent/>} />
          <Route path='/add-tuition' element={<CreateTuitionComponent />} />
          <Route path='/tuition-list' element={<TuitionListComponent />} />
          <Route path='/process-file' element={<CreateTestScoreComponent />} />
          <Route path='/tests' element={<TestsListComponent />} />
          <Route path='/create-report' element={<CreateReportComponent />} />
          <Route path='/reports' element={<ReportListComponent />} />
          <Route path='/capture' element={<RutCapture />} />
          <Route path='/' element={<MainComponent />} />
          {/*<Route exact path='/' element={<StudentListComponent/>} /> */ }
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
