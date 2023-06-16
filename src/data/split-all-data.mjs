import {readFile, saveFile} from './fileOperation.mjs';
import {checkGender, countCountry, cityCounter} from './students.mjs';

// studentsTotal
const { content } = readFile('all-students.json')
// console.log('studentsTotal', content.length);

// studentsGender
// const genderObj = checkGender(content);
// console.log('studentsGender', genderObj);

// studentsCountry
// const countryArr = countCountry(content, 7);
//console.log('studentsCountry', countryArr);

// studentsCity
const cityObj = cityCounter(content, 10, 5);
saveFile('students/student-city.json', JSON.stringify(cityObj, null, 2));
