import {saveFile} from "./fileOperation.mjs";

export function mentorInfo(students, schedule) {
  const mentors = {}
  students.forEach((student) => {
    if (student?.mentor) {
      if (!mentors.hasOwnProperty(student.mentor.id)) {
        mentors[student.mentor.id] = {}
        mentors[student.mentor.id]['githubId'] = student.mentor.githubId
        mentors[student.mentor.id]['name'] = student.mentor.name
        mentors[student.mentor.id]['students'] = {}
      }
      mentors[student.mentor.id]['students'][student.githubId] = student.taskResults
    }
  })
  saveFile('../../public/data/mentors.json', JSON.stringify(mentors, null));
}