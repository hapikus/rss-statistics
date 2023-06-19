import React from "react";
import { observer } from "mobx-react-lite";
import { Typography, Collapse } from "antd";

import styles from './faq.module.css';

import type { CollapseProps } from 'antd';

const { Title } = Typography;

const studentsItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Students overview',
    children: <p>The total number of students, percentage of active students at the moment, gender distribution estimation, and distribution by countries.</p>,
  },
  {
    key: '2',
    label: 'Students geography',
    children: <p>Distribution of students by cities in the selected country.</p>,
  },
];

const tasksItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Tasks overview',
    children: <p>The number of students who have completed tasks in the selected category.</p>,
  },
  {
    key: '2',
    label: 'Tasks average',
    children: <p>The average and maximum scores for tasks in the selected category.</p>,
  },
  {
    key: '3',
    label: 'Tasks score',
    children: <p>The distribution of scores within the selected task.</p>,
  },
];

const mentorsItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Mentors overview',
    children: <p>The number of mentors who have taken a certain number of students.</p>,
  },
  {
    key: '2',
    label: 'Mentors group overview',
    children: <p>The ability to view students' scores under a selected mentor within a chosen task category.</p>,
  },
];

const rootItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Students',
    children: <Collapse defaultActiveKey="1" items={studentsItems} />,
  },
  {
    key: '2',
    label: 'Tasks',
    children: <Collapse defaultActiveKey="1" items={tasksItems} />,
  },
  {
    key: '3',
    label: 'Mentors',
    children: <Collapse defaultActiveKey="1" items={mentorsItems} />,
  },
];

const Faq = () => {
  return (<>
  <div>
  <Title className={styles.title} level={2}>
    Report Description
  </Title>
  </div>
  <div>
    <Collapse items={rootItems} />
  </div>
  </>);
};

export default observer(Faq);