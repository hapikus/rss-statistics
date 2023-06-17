import {saveFile} from './fileOperation.mjs'

// {
//   "id": 2382,
//   "name": "RSS Test",
//   "startDate": "2023-03-05T00:00:00.000Z",
//   "endDate": "2023-03-27T23:59:00.000Z",
//   "maxScore": 100,
//   "scoreWeight": 0.1,
//   "organizer": { "id": 606, "name": "Irina Inina", "githubId": "irinainina" },
//   "status": "done",
//   "score": 100,
//   "tag": "test",
//   "descriptionUrl": "https://github.com/rolling-scopes-school/tasks/tree/master/stage0/modules/rs-school-intro",
//   "type": "courseTask"
// },

function tags(data) {
  const tagsMap = new Map();
  data.forEach((task) => {
    if (task.tag) {
      tagsMap.set(task.tag, (tagsMap.get(task.tag) || 0) + 1);
    }
  });
  console.log(Array.from(tagsMap));
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
  saveFile('tasks/tasks.json', JSON.stringify(tasksList, null, 2));
}

export function tasksConst(schedule, students) {
  // tags(schedule);
  peopleInTask(schedule, students);
}