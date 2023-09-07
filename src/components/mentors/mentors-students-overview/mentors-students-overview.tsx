import React from "react";
import { observer } from "mobx-react-lite";
import { Typography, Select, Table } from "antd";

import store from "../../../stores/RssStatisticsData";
import styles from "./mentors-students-overview.module.css";

const { Title } = Typography;

const selectOnChangeTag = (value: string) => {
  store.setMentorStudentsSelectedTag(value);
};

const selectOnSearchTag = (value: string) => {
  console.log("selectOnSearchTag:", value);
};

const selectOnChangeMentor = (mentor: string) => {
  store.setMentorStudentsSelectedMentor(mentor);
};

const selectOnSearchMentor = (value: string) => {
  console.log("selectOnSearchMentor:", value);
};

const inactiveStudents: Set<string> = new Set();

function createColumnsMentorsStudents(): any {
  const columns: any = [
    {
      title: "Task name",
      dataIndex: "taskname",
      key: "taskname",
    },
    {
      title: "Average score",
      dataIndex: "averageScore",
      key: "averageScore",
    },
  ];

  let mentorId: any;
  let mentor: any;
  for ([mentorId, mentor] of Object.entries(store.mentorsJson)) {
    if (mentor.githubId === store.mentorStudentsSelectedMentor) {
      store.setMentorStudentsSelectedMentorId(mentorId);
      let count = 1;
      mentor.students.forEach((studentName: any) => {
        if (!inactiveStudents.has(studentName)) {
          columns.push({
            title: studentName,
            dataIndex: `student.name ${count}`,
            key: `student.name ${count}`,
            render: (value: any, record: any) => (
              <span
                style={{
                  backgroundColor: getBackgroundColor(value, record),
                  padding: "5px",
                }}
              >
                {value}
              </span>
            ),
          });
          count += 1;
        }
      });
    }
  }
  return columns;
}

function createDataMentorsStudents(): any {
  let rowKey = 1;
  const dataSource: any = [];
  store.taskJson.forEach((task: any) => {
    if (task.tag === store.mentorStudentsSelectedTag) {
      const row: any = {};
      row["key"] = rowKey;
      row["taskname"] = task.name;
      row["averageScore"] = task.averageScore.toFixed(2);
      let count = 1;
      const mentor = store.mentorsJson[store.mentorStudentsSelectedMentorId];
      mentor.students.forEach((student: any) => {
        let studentScore: any = 0;
        let taskResult: any;
        if (!store.tasksResultsJson[student]) {
          inactiveStudents.add(student)
        }
        if (store.tasksResultsJson[student]) {
          for (taskResult of store.tasksResultsJson[student]) {
            if (taskResult.courseTaskId === task.id) {
              studentScore = taskResult.score;
              break;
            }
          }
        }
        row[`student.name ${count}`] = studentScore;
        count += 1;
      })
      rowKey += 1; 
      dataSource.push(row);
    }
  });
  return dataSource;
}

function getBackgroundColor(value: any, record: any) {
  let maxInRow = -Infinity;
  let minInRow = Infinity;
  let rowKey: string;
  let rowValue: any;
  for ([rowKey, rowValue] of Object.entries(record)) {
    if (rowKey.includes("student")) {
      maxInRow = Math.max(maxInRow, rowValue);
      minInRow = Math.min(minInRow, rowValue);
    }
  }
  if (value === maxInRow) {
    return "lightgreen";
  }
  if (value === minInRow) {
    return "lightcoral";
  }
  return "#D6D3F0";
}

const MentorsStudentsOverview = () => {
  if (store.isLoad === false) {
    return <div>Loading...</div>;
  }
  const optionsSelectTag: any = store.optionsTaskTag;
  const optioonsSelectMentors: any = store.getSelectionOptionsMentorsName();
  if (store.mentorStudentsSelectedTag === "") {
    store.setMentorStudentsSelectedTag(optionsSelectTag[0].value);
  }
  if (store.mentorStudentsSelectedMentor === "") {
    store.setMentorStudentsSelectedMentor(optioonsSelectMentors[0].value);
  }
  if (store.mentorStudentsSelectedMentorId === "") {
    let mentorId: any;
    let mentor: any;
    for ([mentorId, mentor] of Object.entries(store.mentorsJson)) {
      if (mentor.githubId === store.mentorStudentsSelectedMentor) {
        store.setMentorStudentsSelectedMentorId(mentorId);
      }
    }
  }
  return (
    <>
      <Title className={styles.title} level={2}>
        Students Scores in Mentor Group
      </Title>
      <div className={styles.optionContainer}>
        <Select
          className={styles.selectTag}
          showSearch
          placeholder="Select a type"
          optionFilterProp="children"
          defaultValue={store.mentorStudentsSelectedTag}
          onChange={selectOnChangeTag}
          onSearch={selectOnSearchTag}
          filterOption={(input: any, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={optionsSelectTag}
        />
        <Select
          className={styles.selectName}
          showSearch
          placeholder="Select a type"
          optionFilterProp="children"
          defaultValue={store.mentorStudentsSelectedMentor}
          onChange={selectOnChangeMentor}
          onSearch={selectOnSearchMentor}
          filterOption={(input: any, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={optioonsSelectMentors}
        />
      </div>
      <div>
        {
          <Table
            dataSource={createDataMentorsStudents()}
            columns={createColumnsMentorsStudents()}
          />
        }
      </div>
    </>
  );
};

export default observer(MentorsStudentsOverview);
