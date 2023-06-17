import React from "react";
import { observer } from "mobx-react-lite";
import { Radio, Select, Typography } from 'antd';
import { Mix } from '@ant-design/plots';

import store from '../../../stores/RssStatisticsData';
import styles from './task-average.module.css'

import type { RadioChangeEvent } from 'antd';
const { Title } = Typography;
const {tasksArr} = store;

function getSelectionOptions() {
  const options: {value: string, label: string}[] = [];
  const optionSet = new Set();
  tasksArr.forEach((task) => {
    if (!optionSet.has(task.tag) && !task.tag.includes('submit')) {
      options.push({
        value: task.tag,
        label: task.tag,
      })
    }
    optionSet.add(task.tag);    
  })
  return options;
}

const selectOnChange = (value: string) => {
  store.setTasksAverageSelectedTag(value);
};

const selectOnSearch = (value: string) => {
  console.log('selectOnSearch:', value);
};

const handleWeightChange = (e: RadioChangeEvent) => {
  store.setTasksAverageSelectedWeight(e.target.value);
};

const AverageAndMaxPlot = () => {
  const data: any[] = [];
  let maxValue = -Infinity;
  const weightOpt = store.tasksAverageSelectedWeight === 'without Weight';
  tasksArr.forEach((task) => {
    if (task.tag === store.tasksAverageSelectedTag) {
      data.push({
        date: task.name,
        averageScore: weightOpt ? task.averageScore.toFixed(0) : (task.averageScore * task.scoreWeight).toFixed(0),
        maxScore: weightOpt ? task.maxScore : task.maxScore * task.scoreWeight,
      });
      maxValue = Math.max(weightOpt ? task.maxScore : task.maxScore * task.scoreWeight, maxValue) 
    }
  });

  const config: any = {
    appendPadding: 8,
    tooltip: {
      shared: true,
    },
    syncViewPadding: true,
    plots: [
      {
        type: 'column',
        options: {
          data,
          xField: 'date',
          yField: 'averageScore',
          yAxis: {
            type: 'linear',
            max: maxValue + maxValue * 0.01,
          },
          meta: {
            date: {
              sync: true,
            },
            value: {
              alias: 'Average score',
            },
          },
          label: {
            position: 'middle',
          },
        },
      },
      {
        type: 'line',
        options: {
          data,
          xField: 'date',
          yField: 'maxScore',
          xAxis: false,
          yAxis: {
            type: 'linear',
            max: maxValue + maxValue * 0.01,
          },
          label: {
            offsetY: -8,
          },
          meta: {
            count: {
              alias: 'Max score',
            },
          },
          color: '#FF6B3B',
          annotations: data.map((d: any) => {
            return {
              type: 'dataMarker',
              position: { date: d.date, value: d.count },
              point: {
                style: {
                  stroke: '#FF6B3B',
                  lineWidth: 1.5,
                },
              },
            };
          }),
        },
      },
    ],
  };

  return <Mix {...config} />;
};

const TasksAverage = () => {
  const optionsSelect: any = getSelectionOptions();
  return (
    <>
      <Title className={styles.title} level={2}>Average Score</Title>
      <div className={styles.optionContainer}>
        <Select
          className={styles.selectCountry}
          showSearch
          placeholder="Select a type"
          optionFilterProp="children"
          defaultValue={optionsSelect[0].label}
          onChange={selectOnChange}
          onSearch={selectOnSearch}
          filterOption={(input: any, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={optionsSelect}
        />
        <Radio.Group value={store.tasksAverageSelectedWeight} onChange={handleWeightChange}>
          <Radio.Button value="without Weight">without Weight</Radio.Button>
          <Radio.Button value="with Weight">with Weight</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        {AverageAndMaxPlot()}
      </div>
    </>
    );
};

export default observer(TasksAverage);