import React from "react";
import { observer } from "mobx-react-lite";
import { Typography,  Select } from "antd";

import store from "../../../stores/RssStatisticsData";
import styles from "./mentors-students-overview.module.css";

const { Title } = Typography;

const selectOnChangeTag = (value: string) => {
  store.setMentorStudentsSelectedTag(value);
};

const selectOnSearchTag = (value: string) => {
  console.log('selectOnSearch:', value);
};

const MentorsStudentsOverview = () => {
  const optionsSelectTag: any = store.optionsTaskTag;
  return (
    <>
      <Title className={styles.title} level={2}>Average Score</Title>
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
      <div>
        table here
      </div>
    </>
    );
};

export default observer(MentorsStudentsOverview);