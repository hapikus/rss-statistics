import {readFile, saveFile} from './fileOperation.mjs';
import {studentsInfo} from './students.mjs';
import {tasksInfo} from './tasks.mjs';
import {mentorsInfo} from './metors.mjs';

const studentData = readFile('score.json').content
const scheduleData = readFile('schedule.json')

// studentsCity
// const cityObj = cityCounter(studentData, 7, 7);
// saveFile('students/student-city.json', JSON.stringify(cityObj, null, 2));

// studentsInfo(studentData, scheduleData, 7, 7);
tasksInfo(studentData, scheduleData)
// mentorsInfo(studentData, scheduleData)
