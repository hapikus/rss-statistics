import React from "react";
import { observer } from "mobx-react-lite";
import { Typography, Collapse } from "antd";

import styles from "./faq.module.css";

import type { CollapseProps } from "antd";

const { Title } = Typography;

const studentsItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "Overview",
    children: (
      <>
        <p className={styles.childrenTitle}>% of Active students</p>
        <p className={styles.childrenText}>
          Percentage of students with an "Active" status.
        </p>
        <p className={styles.childrenTitle}>ChatGPT's gender prediction</p>
        <p className={styles.childrenText}>
          ChatGPT's gender prediction based on students' names
        </p>
        <p className={styles.childrenTitle}>
          Distribution of students by countries
        </p>
        <p className={styles.childrenText}>
          Pie chart showcasing the distribution of students by countries.
        </p>
      </>
    ),
  },
  {
    key: "2",
    label: "Geography",
    children: (
      <>
        <p className={styles.childrenTitle}>
          Distribution of students across cities
        </p>
        <p className={styles.childrenText}>
          The chart represents the distribution of students by cities within the
          selected country. It visually showcases the cities from which the
          students originate, providing insights into their geographical
          distribution.
        </p>
        <p className={styles.childrenText}>
          By examining the chart, you can gain an understanding of the cities
          where the students are located within the selected country. It allows
          you to observe the concentration of students in specific cities and
          identify any notable patterns or trends.{" "}
        </p>
      </>
    ),
  },
  {
    key: "3",
    label: "Place History",
    children: (
      <>
        <p className={styles.childrenTitle}>
          Student Place History: Score Comparison
        </p>
        <p className={styles.childrenText}>
          The student rankings are updated considering completed tasks that have
          exceeded their deadlines. However, tasks that are still open for
          submission do not influence the calculation of rankings. For instance,
          if there is a test that can be taken until the following Tuesday, it
          will not impact your current placement in the rankings.
        </p>
        <p className={styles.childrenText}>
          The purpose of this chart is to provide an overview of the current
          rankings and indicate the position each student holds if the course
          were to end today. By referring to this chart, you can see where you
          stand relative to other students in terms of your performance and
          achievements throughout the course.
        </p>
      </>
    ),
  },
];

const tasksItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "Overview",
    children: (
      <>
        <p className={styles.childrenTitle}>
          Total number of students per task
        </p>
        <p className={styles.childrenText}>
          The chart provides an overview of the number of students who have
          completed tasks in the selected category. It shows how many students
          have successfully passed each task, giving you insights into the
          distribution of task completions among the student population.
        </p>
        <p className={styles.childrenText}>
          By selecting a specific category, you can focus on a particular set of
          tasks and see how many students have successfully completed each task
          within that category.
        </p>
      </>
    ),
  },
  {
    key: "2",
    label: "Average",
    children: (
      <>
        <p className={styles.childrenTitle}>
          The average score achieved by students for each task.
        </p>
        <p className={styles.childrenText}>
          The chart displays the average score achieved by students for each
          task. You can filter the data based on the task tag and students'
          GitHub accounts. Additionally, there is a weight switcher that allows
          you to adjust the calculation of the average score based on the weight
          assigned to each task in the schedule table.
        </p>
        <p className={styles.childrenText}>
          By using the filters and weight switcher, you can explore how the
          average scores vary across different tasks and students.
        </p>
      </>
    ),
  },
  {
    key: "3",
    label: "Score",
    children: (
      <>
        <p className={styles.childrenTitle}>Distribution of points</p>
        <p className={styles.childrenText}>
          The chart illustrates the distribution of scores within the selected
          task. It provides a visual representation of how points are
          distributed among students for that particular task.
        </p>
        <p className={styles.childrenText}>
          By examining the chart, you can gain insights into the range and
          spread of scores achieved by students in the selected task. It allows
          you to observe the distribution pattern, such as whether the scores
          are concentrated in a specific range or if there are variations and
          outliers.
        </p>
        <p className={styles.childrenText}>
          This information can help you assess the performance and understanding
          of students in the task. It enables you to identify any trends or
          patterns in the scores, identify high-performing or low-performing
          students, and make informed decisions regarding the effectiveness of
          the task and potential areas for improvement.{" "}
        </p>
      </>
    ),
  },
];

const mentorsItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "Overview",
    children: (
      <>
        <p className={styles.childrenTitle}>Student-to-Mentor Ratio</p>
        <p className={styles.childrenText}>
          Count of Mentors with Equal Student Count: This metric represents the
          number of mentors who have the same number of students assigned to
          them. It provides insights into the distribution of students among
          mentors and indicates how many students are assigned to each mentor.
        </p>
        <p className={styles.childrenText}>
          By examining this count, you can observe the balance or variation in
          the mentor-student allocation. It helps highlight mentors who have an
          equal share of students, indicating a more even distribution of
          workload among mentors. On the other hand, mentors with significantly
          higher or lower student counts can be identified as well.
        </p>
        <p className={styles.childrenText}>
          It allows for better management of mentor-student ratios and helps
          identify any potential issues or imbalances that may need attention.{" "}
        </p>
      </>
    ),
  },
  {
    key: "2",
    label: "Mentor Group",
    children: (
      <>
        <p className={styles.childrenTitle}>Students Scores in Mentor Group</p>
        <p className={styles.childrenText}>
          Distribution of Student Scores within Selected Task Category under a
          Specific Mentor: This feature allows you to view the distribution of
          scores among students who are assigned to a particular mentor within a
          chosen task category. It provides insights into how the points are
          distributed within the mentor's group of students for that specific
          task category.
        </p>
        <p className={styles.childrenText}>
          By utilizing this functionality, you can analyze how students' scores
          vary within the mentor's group, identifying patterns and trends in the
          distribution of points. It enables you to assess the performance and
          progress of individual students within the context of their mentor's
          group.
        </p>
        <p className={styles.childrenText}>
          This information can be valuable for mentor evaluation and monitoring
          the effectiveness of mentorship in driving student success. It allows
          mentors to identify students who may need additional support or
          recognition for their achievements. Additionally, it provides students
          with a perspective on their performance relative to their peers within
          the same task category and mentor's group.
        </p>
      </>
    ),
  },
];

const rootItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "Students",
    children: <Collapse defaultActiveKey="1" items={studentsItems} />,
  },
  {
    key: "2",
    label: "Tasks",
    children: <Collapse defaultActiveKey="1" items={tasksItems} />,
  },
  {
    key: "3",
    label: "Mentors",
    children: <Collapse defaultActiveKey="1" items={mentorsItems} />,
  },
];

const Faq = () => {
  return (
    <>
      <div>
        <Title className={styles.title} level={2}>
          Report Description
        </Title>
      </div>
      <div>
        <Collapse items={rootItems} />
      </div>
    </>
  );
};

export default observer(Faq);
