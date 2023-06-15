import "./App.css";

import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";

import StatisticsInfo from "./components/statistics-info/statistics-info";
import Faq from "./components/faq";
import About from "./components/about";

import StudentsMain from "./components/students/students-main/students-main";
import StudentsGeography from "./components/students/students-geography/students-geography";

import TasksMain from "./components/tasks/tasks-main";
import TasksAverage from "./components/tasks/task-average";
import TasksIndividual from "./components/tasks/task-individual";

import MentorsMain from "./components/mentors/mentors-main/mentors-main";
import MentorsStudentsOverview from "./components/mentors/mentors-students-overview/mentors-students-overview";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StatisticsInfo />} />
          <Route path="students-main" element={<StudentsMain />} />
          <Route path="students-geography" element={<StudentsGeography />} />
          <Route path="tasks-main" element={<TasksMain />} />
          <Route path="task-average" element={<TasksAverage />} />
          <Route path="task-individual" element={<TasksIndividual />} />
          <Route path="mentors-main" element={<MentorsMain />} />
          <Route
            path="mentors-overview"
            element={<MentorsStudentsOverview />}
          />
          <Route path="faq" element={<Faq />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
