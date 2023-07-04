import {readFile, saveFile} from './fileOperation.mjs';
import {studentsInfo} from './students.mjs';
import {tasksInfo} from './tasks.mjs';
import {mentorsInfo} from './metors.mjs';

const studentData = readFile('score.json').content
const scheduleData = readFile('schedule.json')

studentsInfo(studentData, scheduleData, 7, 7);
tasksInfo(studentData, scheduleData)
mentorsInfo(studentData, scheduleData)
