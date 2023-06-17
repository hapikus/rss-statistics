import {readFile, saveFile} from "./fileOperation.mjs";

export function createStudentsNameList(content) {
  const studentsName = new Set();
  content.forEach((student) => {
    studentsName.add(student.name.split(' ')[0]);
  });
  saveFile('students/student-name.csv', Array.from(studentsName).join('\n'));
}

export function studentsConst(content) {
  console.log('studentsTotal', content.length);
}

export function checkGender(content) {
  const genderGuess = readFile('students/gender-guess.json')
  const genderObj = {}
  content.forEach((student) => {
    const studentName = student.name.split(' ')[0];
    const genderPredict = genderGuess[studentName] || 'Unknown';
    genderObj[genderPredict] = (genderObj[genderPredict] || 0) + 1;
  })
  return genderObj
}

function countrySort(a, b) {
  return b[1] - a[1];
}

export function countCountry(content, elements) {
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
  return sortable.slice(0, elements)
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

export function cityCounter(content, counrtyNumber, minStudentsFromCity) {
  const countrylist = countCountry(content, counrtyNumber);
  const countryFilter = countrylist.map((country) => {
    return country[0]
  })
  const countryObj = {};
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