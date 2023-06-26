import React from "react";
import { observer } from "mobx-react-lite";
import { Select, Typography } from "antd";
import { Line } from '@ant-design/plots';

import store from "../../../stores/RssStatisticsData";
import styles from "./students-place-history.module.css";

const { Title } = Typography;

const selectOnChangeStudentGit = (value: string) => {
  store.setStudentsPlaceHistorySelectedStudentGit(value);
};

const selectOnSearchStudentGit = (value: string) => {
  console.log("selectOnSearchStudentGit", value);
};

const StudentPlaceHistoryLine = () => {
  const data: any = [];
  store.studentsPlaceHistory.forEach((student: any) => {
    if (student.githubId === store.studentsPlaceHistorySelectedStudentGit) {
      student.placeHistory.forEach((place: any, index: number) => {
        data.push({
          task: store.taskList[index]['name'],
          place,
        })
      })
    }
  });
  const config: any = {
    data,
    xField: 'task',
    yField: 'place',
    seriesField: 'place',
    yAxis: {
      label: {
        formatter: (place: any) => `${place}`,
      },
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1700,
      },
    },
  };

  return <Line {...config} />;
};

const StudentPlaceHistory = () => {
  if (store.isLoad === false) {
    return <div>Loading...</div>;
  }
  const studentsGithubIDSelect: any = store.optionsStudentsId;
  return (
    <>
      <Title className={styles.title} level={2}>
        Student Place History: Score Comparison
      </Title>
      <div>
        <Select
          className={styles.selectStudentGit}
          showSearch
          placeholder="Select a type"
          optionFilterProp="children"
          defaultValue={store.studentsPlaceHistorySelectedStudentGit}
          onChange={selectOnChangeStudentGit}
          onSearch={selectOnSearchStudentGit}
          filterOption={(input: any, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={studentsGithubIDSelect}
        />
      </div>
      <div>
        {StudentPlaceHistoryLine()}
      </div>
    </>
  );
};

export default observer(StudentPlaceHistory);
