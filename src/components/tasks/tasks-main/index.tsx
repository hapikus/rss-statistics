import React from "react";
import { observer } from "mobx-react-lite";
import { Select, Typography } from "antd";
import { Column } from '@ant-design/plots';

import store from '../../../stores/RssStatisticsData';
import styles from './tasks-main.module.css'

const { Title } = Typography;

const selectOnChange = (value: string) => {
  store.setTasksMainSelectedTag(value);
};

const selectOnSearch = (value: string) => {
  console.log("selectOnSearch:", value);
};

const TasksMainColumn = () => {
  const data: any = [];
  store.taskJson.forEach((task: any) => {
    if (task.tag === store.tasksMainSelectedTag) {
      data.push({
        name: task.name,
        students: task.totalPeople,
      })
    }
  })
  const config: any = {
    data,
    xField: 'name',
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
        alias: 'name',
      },
      sales: {
        alias: 'students',
      },
    },
  };
  return <Column {...config} />;
};

const TasksMain = () => {
  if (store.isLoad === false) {
    return <div>Loading...</div>;
  }
  const optionsSelectTag: any = store.optionsTaskTag;
  return (  
    <>
      <Title className={styles.title} level={2}>
        Total number of students per task 
      </Title>
      <Select
          className={styles.selectTag}
          showSearch
          placeholder="Select a type"
          optionFilterProp="children"
          defaultValue={store.tasksMainSelectedTag}
          onChange={selectOnChange}
          onSearch={selectOnSearch}
          filterOption={(input: any, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={optionsSelectTag}
        />
    <div>
      {TasksMainColumn()}
    </div>
    </>  
  );
};

export default observer(TasksMain);