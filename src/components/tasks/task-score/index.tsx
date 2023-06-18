import React from "react";
import { observer } from "mobx-react-lite";
import { Radio, Select, Typography } from "antd";
import { Column } from '@ant-design/plots';

import store from "../../../stores/RssStatisticsData";
import styles from "./task-score.module.css";

import type { RadioChangeEvent } from "antd";
const { Title } = Typography;

const selectOnChangeTag = (value: string) => {
  store.setTasksScoreSelectedTag(value);
  store.setTasksScoreSelectedTask(
    store.optionsTaskList[store.tasksScoreSelectedTag][0]
  );
};

const selectOnSearchTag = (value: string) => {
  console.log("selectOnSearch:", value);
};

const handlTaskChange = (e: RadioChangeEvent) => {
  store.setTasksScoreSelectedTask(e.target.value);
};

const DistributionColumn = () => {
  const data: any = [];
  store.taskJson.forEach((task: any) => {
    if (task.name === store.tasksScoreSelectedTask) {
      for (let [key, value] of Object.entries(task.scoreObj)) {
        data.push({
          score: key,
          students: value,
        })
      }
    }
  }); 
  const config: any = {
    data,
    xField: 'score',
    yField: 'students',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Score',
      },
      sales: {
        alias: 'Students',
      },
    },
  };
  return <Column {...config} />;
};

const TasksScore = () => {
  if (
    store.taskJson === undefined ||
    store.optionsTaskTag === undefined ||
    store.optionsTaskList === undefined
  ) {
    return <div>Loading...</div>; // Render a loading state if taskJson is null
  }
  const optionsSelectTag: any = store.optionsTaskTag;
  const optionsSelectTask: any = store.optionsTaskList;
  const radioArr: any = [];
  optionsSelectTask[store.tasksScoreSelectedTag].forEach((task: any, index: number) => {
    radioArr.push(<Radio.Button key={index+1} value={task}>{task}</Radio.Button>);
  });
  return (
    <>
      <Title className={styles.title} level={2}>
        Distribution of scores
      </Title>
      <div className={styles.optionContainer}>
        <Select
          className={styles.selectTag}
          showSearch
          placeholder="Select a type"
          optionFilterProp="children"
          defaultValue={optionsSelectTag[0].label}
          onChange={selectOnChangeTag}
          onSearch={selectOnSearchTag}
          filterOption={(input: any, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={optionsSelectTag}
        />
      </div>
      <div className={styles.tasksContainter}>
        <Radio.Group
          value={store.tasksScoreSelectedTask}
          onChange={handlTaskChange}
        >
          {radioArr}
        </Radio.Group>
      </div>
      <div>
          {DistributionColumn()}
      </div>
    </>
  );
};

export default observer(TasksScore);
