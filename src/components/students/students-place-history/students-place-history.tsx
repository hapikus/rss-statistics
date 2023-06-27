import React from "react";
import { observer } from "mobx-react-lite";
import { Select, Typography, Switch } from "antd";
import { Line } from '@ant-design/plots';

import PopoverButton from '../../global/PopoverButton';
import { PopoverContentStudentsPlaceHistory } from '../../global/PopoverBlocks';

import store from "../../../stores/RssStatisticsData";
import styles from "./students-place-history.module.css";

const { Title } = Typography;

const selectOnChangeStudentGit = (value: string) => {
  store.setStudentsPlaceHistorySelectedStudentGitBack(value);
};

const selectOnSearchStudentGit = (value: string) => {
  console.log("selectOnSearchStudentGit", value);
};

const selectOnChangeMentor = (mentor: string) => {
  store.setStudentsPlaceHistorMentorSelected(mentor);
};

const selectOnSearchMentor = (value: string) => {
  console.log("selectOnSearchMentor:", value);
};

const onChangeSwithSelectors = (checked: boolean) => {
  if (checked) {
    store.setStudentsPlaceHistorySwitcher('mentorSelector');
    return
  }
  store.setStudentsPlaceHistorySwitcher('studentSeletor');
};

const StudentPlaceHistoryLine = () => {
  const data: any = [];
  if (store.studentsPlaceHistorySwitcher === 'mentorSelector') {
    let mentorId: any;
    let mentor: any;
    for ([mentorId, mentor] of Object.entries(store.mentorsJson)) {
      if (mentor.githubId === store.studentsPlaceHistorMentorSelected) {
        store.setStudentsPlaceHistorMentorIdSelected(mentorId);
        store.setStudentsPlaceHistorySelectedStudentGit(mentor.students);
      }
    }
  }
  if (store.studentsPlaceHistorySwitcher === 'studentSeletor') {
    store.setStudentsPlaceHistorySelectedStudentGit(
      store.studentsPlaceHistorySelectedStudentGitBack
    );
  }
  let maxPlace = -Infinity;
  store.studentsPlaceHistory.forEach((student: any) => {
    if (store.studentsPlaceHistorySelectedStudentGit.includes(student.githubId)) {
      student.placeHistory.forEach((place: any, index: number) => {
        data.push({
          name: student.githubId,
          task: store.taskList[index]['name'],
          place,
        })
        maxPlace = Math.max(maxPlace, place)
      })
    }
  });
  const config: any = {
    data,
    xField: 'task',
    yField: 'place',
    seriesField: 'name',
    yAxis: {
      type: "linear",
      max: maxPlace + maxPlace * 0.05,
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 2000,
      },
    },
    lineStyle: {
      lineWidth: 3,
    },
  };

  return <Line {...config} />;
};

const StudentPlaceHistory = () => {
  if (store.isLoad === false) {
    return <div>Loading...</div>;
  }
  const studentsGithubIDSelect: any = store.optionsStudentsId;
  const studentsMentorsIdSelect: any = store.getSelectionOptionsMentorsName();
  if (store.studentsPlaceHistorMentorSelected === "") {
    store.setStudentsPlaceHistorMentorSelected(studentsMentorsIdSelect[0].value);
  }
  if (store.studentsPlaceHistorMentorIdSelected === "") {
    let mentorId: any;
    let mentor: any;
    for ([mentorId, mentor] of Object.entries(store.mentorsJson)) {
      if (mentor.githubId === store.studentsPlaceHistorMentorIdSelected) {
        store.setStudentsPlaceHistorMentorIdSelected(mentorId);
      }
    }
  }
  if (store.studentsPlaceHistorySelectedStudentGitBack === "") {
    store.setStudentsPlaceHistorySelectedStudentGitBack(studentsGithubIDSelect[0].value)
  }
  return (
    <>
      <div className={styles.titleContainter}>
        <Title className={styles.title} level={2}>
          Student Place History: Score Comparison
        </Title>
        <PopoverButton content={<PopoverContentStudentsPlaceHistory />} />
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.selectContainer}>
            <Select
              className={styles.selectStudentGit}
              showSearch
              placeholder="Select a type"
              optionFilterProp="children"
              disabled={store.studentsPlaceHistorySwitcher === 'mentorSelector'}
              defaultValue={store.studentsPlaceHistorySelectedStudentGitBack}
              onChange={selectOnChangeStudentGit}
              onSearch={selectOnSearchStudentGit}
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={studentsGithubIDSelect}
            />
  
            <Select
              className={styles.selectMentorsName}
              showSearch
              placeholder="Select a type"
              optionFilterProp="children"
              disabled={store.studentsPlaceHistorySwitcher === 'studentSeletor'}
              defaultValue={store.studentsPlaceHistorMentorSelected}
              onChange={selectOnChangeMentor}
              onSearch={selectOnSearchMentor}
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={studentsMentorsIdSelect}
            />
          
        </div>
        <div className={styles.switchContainter}>
          <p className={styles.switchName}>Student</p>
          <Switch
            className={styles.switchSelectors}
            onChange={onChangeSwithSelectors}
            defaultChecked={store.studentsPlaceHistorySwitcher === 'mentorSelector'}
          />
          <p className={styles.switchName}>Mentor Group</p>
        </div>
      </div>
      <div>{StudentPlaceHistoryLine()}</div>
    </>
  );
};

export default observer(StudentPlaceHistory);
