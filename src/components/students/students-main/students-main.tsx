import React from "react";
import { observer } from "mobx-react-lite";
import { Liquid } from '@ant-design/plots';
import { Typography } from 'antd';

import rssStatisticsData from '../../../stores/RssStatisticsData';
import styles from './students-main.module.css'

const { Title } = Typography;

const ActiveLiquid = () => {
  const config = {
    percent: rssStatisticsData.studentsStatus.isActive / rssStatisticsData.studentsTotal,
    shape: (x: any, y: any, width: any, height: any): any => {
      const path = [];
      const w = Math.min(width, height);

      for (let i = 0; i < 5; i++) {
        path.push([
          i === 0 ? 'M' : 'L',
          (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
          (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
        ]);
        path.push([
          'L',
          (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
          (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
        ]);
      }

      path.push(['Z']);
      return path;
    },
    outline: {
      border: 2,
      distance: 4,
      style: {
        stroke: '#FFC100',
        strokeOpacity: 0.65,
      },
    },
    wave: {
      length: 128,
    },
    theme: {
      styleSheet: {
        brandColor: '#FAAD14',
      },
    },
  };
  return <Liquid {...config} />;
};

const StudentsMain = () => {
  return (
  <>
    <Title level={2}>Active students</Title>
    <div className={styles.liquidPlotContainer}>
      {ActiveLiquid()}
    </div>
  </>
  );
};

export default observer(StudentsMain);