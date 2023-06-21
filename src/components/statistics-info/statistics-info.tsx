import React from "react";
import { observer } from "mobx-react-lite";
import { WordCloud } from '@ant-design/plots';
import { Typography } from "antd";

import store from "../../stores/RssStatisticsData";
import styles from "./statistics-info.module.css";

const { Title } = Typography;

const StatisticMainCloud = () => {
  const data: any = [];
  let mentor: any;
  for ( mentor of Object.values(store.mentorsJson)) {
    data.push({
      "value": Object.keys(mentor.students).length,
      "name": mentor.githubId
    })
  }
  const config: any = {
    data,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [16, 36],
    },
  };

  return <WordCloud {...config} />;
};

const StatisticsInfo = () => {
  if (store.isLoad === false) {
    return <div>Loading...</div>;
  }
  return <>
  <Title className={styles.title} level={2}>
    Website with statistics on the JS FE 2023 Q1 course
  </Title>
  <div>
    {StatisticMainCloud()}
  </div>  
  </>;
};

export default observer(StatisticsInfo);