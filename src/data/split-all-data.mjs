import {readFile, saveFile} from './fileOperation.mjs';
import {checkGender, countCountry, cityCounter, studentsConst, createStudentsNameList} from './students.mjs';
import {tasksConst} from './tasks.mjs';
import {mentorInfo} from './metors.mjs';

const studentData = readFile('all-students.json').content
const scheduleData = readFile('schedule.json')


// studentsConst(studentData);

// createStudentsNameList(studentData)

// studentsGender
// const genderObj = checkGender(studentData);
// console.log('studentsGender', genderObj);

// studentsCountry
// const countryArr = countCountry(studentData, 7);
//console.log('studentsCountry', countryArr);

// studentsCity
// const cityObj = cityCounter(studentData, 7, 7);
// saveFile('students/student-city.json', JSON.stringify(cityObj, null, 2));

tasksConst(scheduleData, studentData)
mentorInfo(studentData, scheduleData)
