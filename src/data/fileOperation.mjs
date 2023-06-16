import fs from 'fs';

export function readFile(fileName) {
  let data;
  try {
    const jsonData = fs.readFileSync(fileName, 'utf-8');
    data = JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
  return data
}

export function saveFile(filename, data) {
  try {
    fs.writeFileSync(filename, data, 'utf-8');
    console.log('CSV file saved successfully.');
  } catch (error) {
    console.error('Error saving CSV file:', error);
  }
}

// {
//   "id": 126545,
//   "name": "Andrey Nazarov",
//   "githubId": "adybah",
//   "active": true,
//   "cityName": "Nizhny Novgorod",
//   "countryName": "Russia",
//   "rank": 1,
//   "totalScore": 1127.3,
//   "mentor": {
//   "id": 3664,
//     "githubId": "jirisimonov",
//     "name": "George Simonov"
// },
//   "totalScoreChangeDate": "2023-06-07T01:00:22.681Z",
//   "crossCheckScore": 467,
//   "repositoryLastActivityDate": "2023-06-09T19:56:44.786Z",
//   "isActive": true
// }
