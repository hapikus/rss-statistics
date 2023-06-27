import React from "react";
import { observer } from "mobx-react-lite";
import { Select, Typography, Switch } from "antd";
import { Mix } from "@ant-design/plots";

import store from "../../../stores/RssStatisticsData";
import styles from "./task-average.module.css";

const { Title } = Typography;

const selectOnChangeTag = (value: string) => {
  store.setTasksAverageSelectedTag(value);
};

const selectOnSearchTag = (value: string) => {
  console.log("selectOnSearchTag:", value);
};

const selectOnChangeStudentGit = (value: string) => {
  store.setTasksAverageSelectedStudentGit(value);
};

const selectOnSearchStudentGit = (value: string) => {
  console.log("selectOnSearchGit:", value);
};

const onChangeSwithWeight = (checked: boolean) => {
  if (checked) {
    store.setTasksAverageSelectedWeight("with Weight");
    return;
  }
  store.setTasksAverageSelectedWeight("without Weight");
};

const AverageAndMaxPlot = () => {
  const data: any[] = [];
  let selectStudent = store.tasksAverageSelectedStudentGit;
  let maxTaskScore = -Infinity;
  let minAverageScore = Infinity;
  const taskScoreMap = new Map();
  const weightOpt = store.tasksAverageSelectedWeight === "without Weight";
  store.taskJson.forEach((task: any) => {
    if (task.tag === store.tasksAverageSelectedTag) {
      let studentScore = 0;
      store.tasksResultsJson[selectStudent].forEach((taskResult: any) => {
        if (task.id === taskResult.courseTaskId) {
          studentScore = taskResult.score;
        }
      });
      let peopleBetterThanStudent = 0;
      let taskScore: any;
      let taskScorePeople: any;
      for ([taskScore, taskScorePeople] of Object.entries(task.scoreObj)) {
        if (+taskScore >= studentScore) {
          peopleBetterThanStudent += taskScorePeople;
        }
      }
      data.push({
        name: task.name,
        averageScore: weightOpt
          ? task.averageScore.toFixed(0)
          : (task.averageScore * task.scoreWeight).toFixed(0),
        studentScore: weightOpt
          ? studentScore
          : studentScore * task.scoreWeight,
        inTheTop: peopleBetterThanStudent
          ? ((peopleBetterThanStudent / task.totalPeople) * 100).toFixed(0)
          : 0,
        maxScore: weightOpt ? task.maxScore : task.maxScore * task.scoreWeight,
      });
      maxTaskScore = Math.max(
        weightOpt ? task.maxScore : task.maxScore * task.scoreWeight,
        maxTaskScore
      );
      minAverageScore = Math.min(
        weightOpt
          ? task.averageScore.toFixed(0)
          : (task.averageScore * task.scoreWeight).toFixed(0),
        minAverageScore
      );
      taskScoreMap.set(
        task.name,
        weightOpt
          ? task.averageScore.toFixed(0)
          : (task.averageScore * task.scoreWeight).toFixed(0)
      );
    }
  });
  const paletteSemanticRed = "#F4664A";
  const brandColor = "#5B8FF9";
  const averageScoreConfig = {
    type: "column",
    options: {
      data,
      xField: "name",
      yField: "averageScore",
      yAxis: {
        type: "linear",
        max: maxTaskScore + maxTaskScore * 0.01,
      },
      color: (data: any) => {
        if (taskScoreMap.get(data.name) <= minAverageScore * 1.05) {
          return paletteSemanticRed;
        }
        return brandColor;
      },
      meta: {
        date: {
          sync: true,
        },
        value: {
          alias: "Average score",
        },
        averageScore: {
          alias: "Average score",
        },
      },
      label: {
        position: "middle",
      },
    },
  };
  const maxScoreConfig = {
    type: "line",
    options: {
      data,
      xField: "name",
      yField: "maxScore",
      xAxis: false,
      yAxis: {
        type: "linear",
        max: maxTaskScore + maxTaskScore * 0.01,
      },
      label: {
        offsetY: -8,
      },
      meta: {
        count: {
          alias: "Max score",
        },
        maxScore: {
          alias: "Max Score",
        },
      },
      color: "#FF6B3B",
    },
  };
  const studentConfig = {
    type: "line",
    options: {
      data,
      xField: "name",
      yField: "studentScore",
      xAxis: false,
      yAxis: {
        type: "linear",
        max: maxTaskScore + maxTaskScore * 0.01,
      },
      meta: {
        count: {
          alias: "Student score",
        },
        studentScore: {
          alias: `${store.tasksAverageSelectedStudentGit} score`,
        },
      },
      color: "#00C1DE",
      lineStyle: {
        lineWidth: 3,
      },
    },
  };
  const plots: any = [averageScoreConfig, studentConfig];
  if (store.tasksAverageSelectedTag !== "test") {
    plots.unshift(maxScoreConfig);
  }
  const config: any = {
    appendPadding: 8,
    syncViewPadding: true,
    plots,
    tooltip: {
      showMarkers: false,
      customContent: (title: string, items: any[]) => {
        const tooltipData = items.find(
          (item) => item.data.name === title
        )?.data;
        return (
          <div>
            <p className={styles.tooltipTitle}>{title}</p>
            {tooltipData && (
              <>
                <p className={styles.tooltipText}>
                  <svg width="10" height="10" style={{ marginRight: 8 }}>
                    <circle cx="5" cy="5" r="4" fill={"#FF6B3B"} />
                  </svg>
                  Max Score: {tooltipData.maxScore}
                </p>
                <p className={styles.tooltipText}>
                  <svg width="10" height="10" style={{ marginRight: 8 }}>
                    <circle cx="5" cy="5" r="4" fill={"#6395fa"} />
                  </svg>
                  Average Score: {tooltipData.averageScore}
                </p>
                <p className={styles.tooltipText}>
                  <svg width="10" height="10" style={{ marginRight: 8 }}>
                    <circle cx="5" cy="5" r="4" fill={"#00C1DE"} />
                  </svg>
                  {store.tasksAverageSelectedStudentGit} Score:{" "}
                  {tooltipData.studentScore}
                </p>
                <p className={styles.tooltipText}>
                  {tooltipData.inTheTop}% of top
                </p>
              </>
            )}
          </div>
        );
      },
    },
  };

  return <Mix {...config} />;
};

const TasksAverage = () => {
  if (store.isLoad === false) {
    return <div>Loading...</div>;
  }
  const optionsSelectTag: any = store.optionsTaskTag;
  const studentsGithubIDSelect: any = store.optionsStudentsId;
  return (
    <>
      <Title className={styles.title} level={2}>
        The average score achieved by students for each task
      </Title>
      <div className={styles.optionContainer}>
        <div className={styles.selectContainer}>
          <Select
            className={styles.selectTag}
            showSearch
            placeholder="Select a type"
            optionFilterProp="children"
            defaultValue={store.tasksAverageSelectedTag}
            onChange={selectOnChangeTag}
            onSearch={selectOnSearchTag}
            filterOption={(input: any, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={optionsSelectTag}
          />
          <Select
            className={styles.selectStudentGit}
            showSearch
            placeholder="Select a type"
            optionFilterProp="children"
            defaultValue={store.tasksAverageSelectedStudentGit}
            onChange={selectOnChangeStudentGit}
            onSearch={selectOnSearchStudentGit}
            filterOption={(input: any, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={studentsGithubIDSelect}
          />
        </div>
        <div className={styles.switchContainter}>
          <Switch
            className={styles.switchWeight}
            onChange={onChangeSwithWeight}
            defaultChecked={store.tasksAverageSelectedWeight === "with Weight"}
          />
          <p className={styles.switchName}>Weight</p>
        </div>
      </div>
      <div>{AverageAndMaxPlot()}</div>
    </>
  );
};

export default observer(TasksAverage);
