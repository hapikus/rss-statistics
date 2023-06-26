import {saveFile} from './fileOperation.mjs'

function tagSort(a, b) {
  return b[1] - a[1];
}

function getTasksTag(data) {
  const tagsMap = {};
  data.forEach((task) => {
    if (task.tag) {
      if (!tagsMap.hasOwnProperty(task.tag)) {
        tagsMap[task.tag] = 0
      }
      tagsMap[task.tag] += 1;
    }
  });
  const sortable = [];
  for (let tag in tagsMap) {
    sortable.push([tag, tagsMap[tag]]);
  }
  sortable.sort(tagSort);
  saveFile('../../public/data/tasksTag.json', JSON.stringify(sortable, null, 2));
}

function getTasksJson(students, schedule) {
  const tasksList = []
  const currentTime = Date.now();
  schedule.forEach((task) => {
    const endDate = new Date(task.endDate).getTime();
    if (endDate <= currentTime && task.maxScore && !task.tag.includes("submit")) {
      tasksList.push({
        id: task.id,
        name: task.name,
        tag: task.tag,
        scoreWeight: task.scoreWeight,
        maxScore: task.maxScore,
        endDate: task.endDate,
      })
    }
  })

  const taskScore = {};
  students.forEach((student) => {
    student['taskResults'].forEach((result) => {
      const {courseTaskId, score} = result;
      if (!taskScore.hasOwnProperty(courseTaskId)) {
        taskScore[courseTaskId] = {};
      }
      if (!taskScore[courseTaskId].hasOwnProperty(score)) {
        taskScore[courseTaskId][score] = 0;
      }
      taskScore[courseTaskId][score] = taskScore[courseTaskId][score] + 1
    })
  })

  tasksList.forEach((task) => {
    task.scoreObj = taskScore[task.id]
    let totalPeople = 0;
    let totalScore = 0;
    for (let [key, value] of Object.entries(task.scoreObj)) {
      if (key) {
        totalPeople += value;
        totalScore += key * value
      }
    }
    task.totalPeople = totalPeople;
    task.averageScore = totalScore / totalPeople;
  })
  saveFile('../../public/data/tasks.json', JSON.stringify(tasksList, null, 2));
}

function getTasksResults(students, schedule) {
  let tasksResults = {};
  students.forEach((student) => {
    if (student.isActive) {
      tasksResults[student.githubId] = student['taskResults'];
    }
  })
  saveFile('../../public/data/tasksResults.json', JSON.stringify(tasksResults, null));
}

export function tasksInfo(students, schedule) {
  getTasksTag(schedule);
  getTasksJson(students, schedule);
  getTasksResults(students, schedule);
}