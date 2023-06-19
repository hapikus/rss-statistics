import {readFile, saveFile} from "./fileOperation.mjs";

function countrySort(a, b) {
  return b[1] - a[1];
}

function studentsConst(studentData, NumberOfTheTopCountry = 7, minimumPeopleFromCity = 7) {
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

export function studentsInfo(studentData, scheduleData, NumberOfTheTopCountry, minimumPeopleFromCity) {
  // createStudentsNameList(studentData) // 'students/student-name.csv'
  studentsConst(studentData, NumberOfTheTopCountry, minimumPeopleFromCity);
  // studentsJson(studentData);
}