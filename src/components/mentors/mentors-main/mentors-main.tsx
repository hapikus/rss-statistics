import React from "react";
import { observer } from "mobx-react-lite";
import { Typography, Table } from "antd";

import store from "../../../stores/RssStatisticsData";
import styles from "./mentors-main.module.css";

const { Title } = Typography;

const columnsData: any = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
  },
  {
    title: 'Github',
    dataIndex: 'githubId',
    key: 'githubId',
    sorter: (a: any, b: any) => a.githubId.localeCompare(b.githubId),
  },
  {
    title: 'Students',
    dataIndex: 'students',
    key: 'students',
    sorter: (a: any, b: any) => a.students - b.students
  },
];

// function createData() {
//   let tableKkey = 1;
//   const data: any = [];
//   for (let mentor of Object.values(store.mentorsObj)) {
//     if (Object.keys(mentor.students).length > 3) {
//       data.push({
//         key: tableKkey,
//         name: mentor.name,
//         githubId: mentor.githubId,
//         students: Object.keys(mentor.students).length,
//       })
//       tableKkey += 1;
//     }
//   }
//   return data
// }

const MentorsMain = () => {
  return (<>      
  <Title className={styles.title} level={2}>
    Mentors overview
  </Title>
  <div>
    {/* <Table dataSource={createData()} columns={columnsData} /> */}
  </div>
  </>);
};

export default observer(MentorsMain);