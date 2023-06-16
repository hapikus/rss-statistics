import React from "react";
import { observer } from "mobx-react-lite";
import { Liquid, Bar, Pie } from '@ant-design/plots';
import { Typography } from 'antd';

import rssStatisticsData from '../../../stores/RssStatisticsData';
import styles from './students-main.module.css'

const { Title } = Typography;

// percent: rssStatisticsData.studentsStatus.isActive / rssStatisticsData.studentsTotal,
const ActiveLiquid = () => {
  const config = {
    percent: rssStatisticsData.studentsStatus.isActive / rssStatisticsData.studentsTotal,
    shape: 'rect',
    outline: {
      border: 2,
      distance: 4,
    },
    wave: {
      length: 128,
    },
  };
  return <Liquid {...config} />;
};

const GenderBar = (): any => {
  const { studentsGender } = rssStatisticsData;
  const data: {name: string, value: number}[] = [];
  for (let key of Object.keys(studentsGender)) {
    if (studentsGender.hasOwnProperty(key)) {
      data.push({
        name: key,
        value: studentsGender[key],
      })
    }
  }
  const config: any = {
    data,
    xField: 'value',
    yField: 'name',
    seriesField: 'name',
    legend: {
      position: 'top-left',
    },
  };
  return <Bar {...config} />;
};

const CountryPie = (): any => {
  const { studentsCountry } = rssStatisticsData;
  const data: any = [];
  studentsCountry.forEach((country) => {
    data.push({
      countryName: country[0],
      value: country[1],
    })
  })
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'countryName',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 24,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

const StudentsMain = () => {
  return (
  <>
    <Title className={styles.title} level={2}>Students</Title>
    <div className={styles.mainPlotContainer}>
      <div className={styles.liquidPlotContainer}>
      <Title className={styles.title} level={4}>Active students</Title>
        {ActiveLiquid()}
      </div>
      <div className={styles.barPlotContainer}>
      <Title className={styles.title} level={4}>Gender guess</Title>
        {GenderBar()}
      </div>
      <div className={styles.countryContainer}>
      <Title className={styles.title} level={4}>Country</Title>
        {CountryPie()}
      </div>
    </div>
  </>
  );
};

export default observer(StudentsMain);