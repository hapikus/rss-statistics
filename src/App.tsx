import "./App.css";

import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";

import StatisticsInfo from "./components/statistics-info/statistics-info";
import Faq from "./components/faq";
import About from "./components/about";

import StudentsMain from "./components/students/students-main/students-main";
import StudentsGeography from "./components/students/students-geography/students-geography";
import StudentsPlaceHistory from "./components/students/students-place-history/students-place-history";

import TasksMain from "./components/tasks/tasks-main";
import TasksAverage from "./components/tasks/task-average";
import TasksScore from "./components/tasks/task-score";

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
          <Route path="students-place-history" element={<StudentsPlaceHistory />} />
          <Route path="tasks-main" element={<TasksMain />} />
          <Route path="task-average" element={<TasksAverage />} />
          <Route path="task-score" element={<TasksScore />} />
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
