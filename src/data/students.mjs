import {readFile, saveFile} from "./fileOperation.mjs";

function countrySort(a, b) {
  return b[1] - a[1];
}

function getStudentConst(studentData, NumberOfTheTopCountry = 7, minimumPeopleFromCity = 7) {
  const studentsConstJson = {}
  const isActiveObj = checkActive(studentData);
  const genderObj = checkGender(studentData);
  const studentsCountryObj = countryCount(studentData, NumberOfTheTopCountry);
  const studentsCityObj = cityCounter(studentData, studentsCountryObj, minimumPeopleFromCity)

  studentsConstJson['studentsTotal'] = studentData.length || 0;
  studentsConstJson['studentsStatus'] = isActiveObj;
  studentsConstJson['studentsGender'] = genderObj;
  studentsConstJson['studentsCountry'] = studentsCountryObj;
  studentsConstJson['studentsCity'] = studentsCityObj;

  saveFile('../../public/data/studentConst.json', JSON.stringify(studentsConstJson, null, 2));
}

// students/student-name.csv
function createStudentsNameList(content) {
  const studentsName = new Set();
  content.forEach((student) => {
    studentsName.add(student.name.split(' ')[0]);
  });
  saveFile('students/student-name.csv', Array.from(studentsName).join('\n'));
}

// studentsStatus
function checkActive(studentData) {
  const active = {
    "isActive": 0,
    "notActive": 0
  }
  studentData.forEach((student) => {
    student.isActive ? active.isActive += 1 : active.notActive += 1
  })
  return active;
}

// studentsGender
function checkGender(studentData) {
  const genderGuess = readFile('students/gender-guess.json')
  const genderObj = {}
  studentData.forEach((student) => {
    const studentName = student.name.split(' ')[0];
    const genderPredict = genderGuess[studentName] || 'Unknown';
    genderObj[genderPredict] = (genderObj[genderPredict] || 0) + 1;
  })
  return genderObj
}

// studentsCountry
function countryCount(content, NumberOfTheTopCountry) {
  const countryCounter = {};
  content.forEach((student) => {
    const countryName = student['countryName'];
    countryCounter[countryName] = (countryCounter[countryName] || 0) + 1
  })
  const sortable = [];
  for (let country in countryCounter) {
    sortable.push([country, countryCounter[country]]);
  }
  sortable.sort(countrySort);
  return sortable.slice(0, NumberOfTheTopCountry)
}

function cityFilter(countryObj, minStudentsFromCity) {
  const newCountryObj = {};
  for (let country of Object.keys(countryObj)) {
    const temp = {};
    for (let city of Object.keys(countryObj[country])) {
      if (+countryObj[country][city] >= minStudentsFromCity) {
        temp[city] = countryObj[country][city];
      }
    }
    newCountryObj[country] = temp;
  }
  return newCountryObj
}

function cityCounter(content, countrylist, minStudentsFromCity) {
  const countryObj = {};
  const countryFilter = countrylist.map((country) => {
    return country[0]
  })
  countryFilter.forEach((country) => {
    countryObj[country] = {};
  })
  content.forEach((student) => {
    const studentCountry = student['countryName'];
    const studentCity = student['cityName'];
    if (studentCountry && studentCity && countryFilter.includes((studentCountry))) {
      const currentNumber = countryObj[studentCountry][studentCity];
      countryObj[studentCountry][studentCity] = (currentNumber || 0) + 1;
    }
  })
  return cityFilter(countryObj, minStudentsFromCity)
}

function getTaskList(scheduleData) {
  const taskList = []
  const currentTime = Date.now();
  scheduleData.forEach((task) => {
    const taskEndDate = new Date(task.endDate).getTime();
    if (taskEndDate <= currentTime && task.maxScore && !task.tag.includes("submit")) {
      taskList.push({
        'id': task.id,
        'scoreWeight': task.scoreWeight,
        'name': task.name,
        'endDate': taskEndDate
      })
    }
  })
  taskList.sort((a, b) => {
    const dateA = new Date(a['endDate']);
    const dateB = new Date(b['endDate']);
    return dateA - dateB;
  });
  return taskList;
}

function addStudentsScoreAfterEachTask(studentData, taskList) {
  studentData.forEach((student) => {
      const studentsScoreAfterEachTask = [];
      const studentsResults = student['taskResults'];
      let studentScore = 0;
      taskList.forEach((task) => {
        for (let result of studentsResults) {
          if (result['courseTaskId'] === task.id) {
            studentScore += +result['score'] * +task['scoreWeight']
            break
          }
        }
        studentsScoreAfterEachTask.push(studentScore)
      })
      student['scoreAfterEachTask'] = studentsScoreAfterEachTask;
  })
}

function getAllScoreForEachTask(studentData, taskList) {
  const allScoreForEachTask = []
  taskList.forEach((task, index) => {
    allScoreForEachTask.push({
      'name': task.name,
      'score': [],
    });
  });
  studentData.forEach((student) => {
    student['scoreAfterEachTask'].forEach((score, index) => {
      allScoreForEachTask[index]['score'].push(score);
    })
  })
  allScoreForEachTask.forEach((item) => {
    item.score.sort((a, b) => b - a);
  });
  return allScoreForEachTask;
}

function getStudentsPlaceHistory(studentData, allScoreForEachTask) {
  const studentsPlaceHistoryJson = [];
  studentData.forEach((student) => {
    if (student.isActive) {
      const studentsPlace = [];
      student['scoreAfterEachTask'].forEach((score, index) => {
        const allScoreForTask = allScoreForEachTask[index]['score'];
        studentsPlace.push(allScoreForTask.indexOf(score) + 1);
      })
      studentsPlaceHistoryJson.push({
        'githubId': student.githubId,
        'placeHistory': studentsPlace,
      })
    }
  })
  return studentsPlaceHistoryJson;
}

function studentsScoreChangingJson(studentData, scheduleData) {
  const taskList = getTaskList(scheduleData);
  addStudentsScoreAfterEachTask(studentData, taskList);
  const allScoreForEachTask = getAllScoreForEachTask(studentData, taskList);
  const studentsPlaceHistory = getStudentsPlaceHistory(studentData, allScoreForEachTask);
  const studentPlaceHistoryJson = {
    taskList,
    studentsPlaceHistory,
  }
  saveFile('../../public/data/studentPlaceHistory.json', JSON.stringify(studentPlaceHistoryJson, null));
}

export function studentsInfo(studentData, scheduleData, NumberOfTheTopCountry, minimumPeopleFromCity) {
  createStudentsNameList(studentData) // 'students/student-name.csv'
  getStudentConst(studentData, NumberOfTheTopCountry, minimumPeopleFromCity);
  studentsScoreChangingJson(studentData, scheduleData);
}

