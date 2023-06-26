import React from "react";
import { observer } from "mobx-react-lite";
import { Liquid, Bar, Pie } from '@ant-design/plots';
import { Typography } from 'antd';

import PopoverButton from '../../global/PopoverButton';
import { PopoverContentStudentsMain } from '../../global/PopoverBlocks'

import store from '../../../stores/RssStatisticsData';
import styles from './students-main.module.css'

const { Title } = Typography;

const ActiveLiquid = () => {
  let percent = 100;
  if (store.studentsTotal !== undefined) {
    percent = store.studentsStatus.isActive / store.studentsTotal;
  }
  const config = {
    percent,
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
  const { studentsGender } = store;
  const data: {name: string, value: number}[] = [];
  for (let key of Object.keys(studentsGender)) {
    if (studentsGender.hasOwnProperty(key)) {
      data.push({
        name: key,
        value: studentsGender[key],
      })
    }
  }
  data.sort((a, b) => b.value - a.value);
  const config: any = {
    data,
    xField: 'value',
    yField: 'name',
    seriesField: 'name',
    legend: false,
  };
  return <Bar {...config} />;
};

const CountryPie = (): any => {
  const { studentsCountry, studentsTotal } = store;
  const data: any = [];
  let totalInCountrys = 0;
  studentsCountry.forEach((country: any) => {
    totalInCountrys += Number(country[1]);
    data.push({
      countryName: country[0],
      value: country[1],
    })
  })
  if (studentsTotal !== undefined) {
    data.push({
      countryName: 'Other',
      value: studentsTotal - totalInCountrys,
    })
  }
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
  if (store.isLoad === false) {
    return <div>Loading...</div>;
  }
  return (
  <>
    <div className={styles.titleContainter}>
      <Title className={styles.titleMain} level={2}>Students</Title>
      <PopoverButton content={<PopoverContentStudentsMain />} />
    </div>
    <div className={styles.mainPlotContainer}>
      <div className={styles.liquidPlotContainer}>
      <Title className={styles.titleSecond} level={4}>% of Active students</Title>
        {ActiveLiquid()}
      </div>
      <div className={styles.barPlotContainer}>
      <Title className={styles.titleSecond} level={4}>ChatGPT's gender prediction</Title>
        {GenderBar()}
      </div>
      <div className={styles.countryContainer}>
      <Title className={styles.titleSecond} level={4}>Distribution of students by countries</Title>
        {CountryPie()}
      </div>
    </div>
  </>
  );
};

export default observer(StudentsMain);