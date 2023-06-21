import React from "react";
import { observer } from "mobx-react-lite";
import { Typography } from "antd";
import { Pie } from '@ant-design/plots';

import store from "../../../stores/RssStatisticsData";
import styles from "./mentors-main.module.css";

const bais = 0.3;
const { Title } = Typography;

const MentorsMainPie = () => {
  const mentorsCount: any = [];
  let mentor: any;
  for ( mentor of Object.values(store.mentorsJson)) {
    mentorsCount[Object.keys(mentor.students).length - 1] =     
      ( mentorsCount[Object.keys(mentor.students).length - 1] || 0) + 1;
    }
  const data: any = [];
  mentorsCount.forEach((item: any, index: number) => {
    data.push({
      name: index+1,
      value: item
    })
  });
  const config: any = {
    appendPadding: 10,
    data,
    angleField: 'name',
    colorField: 'value',
    radius: 1,
    startAngle: Math.PI + bais,
    endAngle: Math.PI * 2 - bais,
    label: {
      type: 'inner',
      offset: '-12%',
      content: '{name}',
      style: {
        fontSize: 18,
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    pieStyle: {
      lineWidth: 0,
    },
    tooltip: {
      formatter: (mentorm: any) => {
        return { name: 'Students', value: `${mentorm.name}` }
          // { name: 'Students', value: `${mentorm.value}` },
      },
    },
  };
  return <Pie {...config} />;
};

const MentorsMain = () => {
  if (store.isLoad === false) {
    return <div>Loading...</div>;
  }
  return (<>      
  <Title className={styles.title} level={2}>
    Mentors overview
  </Title>
  <div>
    {MentorsMainPie()}
  </div>
  </>);
};

export default observer(MentorsMain);