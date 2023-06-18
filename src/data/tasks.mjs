import {saveFile} from './fileOperation.mjs'

function tags(data) {
  const tagsMap = {};
  data.forEach((task) => {
    if (task.tag) {
      if (!tagsMap.hasOwnProperty(task.tag)) {
        tagsMap[task.tag] = 0
      }
      tagsMap[task.tag] += 1;
    }
  });
  saveFile('../../public/data/tasksTag.json', JSON.stringify(tagsMap, null, 2));
}

function peopleInTask(schedule, students) {
  const tasksList = []
  schedule.forEach((task) => {
    if (task.status === 'done' && task.maxScore) {
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
    student.taskResults.forEach((result) => {
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

export function tasksConst(schedule, students) {
  tags(schedule);
  peopleInTask(schedule, students);
}