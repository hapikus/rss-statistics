import { makeAutoObservable, action } from "mobx";
import {
  StudentsStatus,
  StudentsGender,
  StudentsCountry,
  StudentsCity,
  Task,
  TaskTag,
  MentorsJson,
} from "../components/types/interface";

class Store {
  isLoad: boolean = false;
  studentsTotal?: number;
  studentsStatus?: StudentsStatus | any;
  studentsGender?: StudentsGender | any;
  studentsCountry?: StudentsCountry | any;
  studentsCity?: StudentsCity | any;
  studentsPlaceHistory: any;
  taskList: any;
  taskJson?: Task[] | any;
  tasksResultsJson: any;
  taskTag?: TaskTag | any;
  optionsTaskTag: any;
  optionsTaskList: any;
  optionsStudentsId: any;
  tasksScoreSelectedTask: any;
  mentorsJson?: MentorsJson | any;

  studentsPlaceHistorySelectedStudentGit: any;
  tasksAverageSelectedStudentGit: any;

  constructor() {
    this.loadData();
    makeAutoObservable(this);
  }

  loadData = async () => {
    await this.studentsConstJsonLoadData();
    await this.studentPlaceHistoryLoadData();
    await this.tasksTagLoadData();
    await this.tasksJsonLoadData();
    await this.tasksResultsJsonLoadData();
    await this.mentorsJsonLoadData();

    this.optionsTaskTag = this.getSelectionOptionsTaskTag();
    this.optionsTaskList = this.getSelectionOptionTaskList();
    this.optionsStudentsId = this.getSelectionStudentGithubId();
    this.studentsPlaceHistorySelectedStudentGit = 
      this.optionsStudentsId[0].value;
    this.tasksAverageSelectedStudentGit =
      this.optionsStudentsId[0].value;
    this.tasksScoreSelectedTask =
      this.optionsTaskList[this.tasksScoreSelectedTag][0];
    this.isLoad = true;
  };

  studentsConstJsonLoadData = async () => {
    const studentsData = await fetch("/rss-statistics/data/studentConst.json").then(
      (response) => response.json()
    );
    this.studentsTotal = Number(studentsData["studentsTotal"]);
    this.studentsStatus = studentsData["studentsStatus"];
    this.studentsGender = studentsData["studentsGender"];
    this.studentsCountry = studentsData["studentsCountry"];
    this.studentsCity = studentsData["studentsCity"];
  };

  studentPlaceHistoryLoadData = async () => {
    const studentPlaceHistoryData = await fetch(
      "/rss-statistics/data/studentPlaceHistory.json"
    ).then((response) => response.json());
  this.taskList = studentPlaceHistoryData.taskList;
  this.studentsPlaceHistory = studentPlaceHistoryData.studentsPlaceHistory
  }

  tasksTagLoadData = async () => {
    const taskTagData = await fetch("/rss-statistics/data/tasksTag.json").then((response) =>
      response.json()
    );
    this.taskTag = taskTagData;
  };

  tasksJsonLoadData = async () => {
    const tasksData = await fetch("/rss-statistics/data/tasks.json").then((response) =>
      response.json()
    );
    this.taskJson = tasksData;
  };

  tasksResultsJsonLoadData = async () => {
    const tasksResultsData = await fetch("/rss-statistics/data/tasksResults.json").then((response) =>
      response.json()
    );
    this.tasksResultsJson = tasksResultsData;
  };

  mentorsJsonLoadData = async () => {
    const jsonData = await fetch("/rss-statistics/data/mentors.json").then((response) =>
      response.json()
    );
    this.mentorsJson = jsonData;
  };

  getRssStatisticsData = () => {
    return this;
  };

  // students
  studentsGeographySelected: string = "";
  studentsPlaceHistorySwitcher: string = 'studentSeletor';
  studentsPlaceHistorySelectedStudentGitBack = "";
  studentsPlaceHistorMentorSelected = "";
  studentsPlaceHistorMentorIdSelected = "";
  setStudentsGeographySelected = action((country: string) => {
    this.studentsGeographySelected = country;
  });
  setStudentsPlaceHistorySelectedStudentGit = action((name: any) => {
    this.studentsPlaceHistorySelectedStudentGit = name;
  })
  setStudentsPlaceHistorySelectedStudentGitBack = action((name: string) => {
    this.studentsPlaceHistorySelectedStudentGitBack = name;
  });
  setStudentsPlaceHistorySwitcher = action((value: string) => {
    this.studentsPlaceHistorySwitcher = value;
  });
  setStudentsPlaceHistorMentorSelected = action((mentor: string) => {
    this.studentsPlaceHistorMentorSelected = mentor;
  });
  setStudentsPlaceHistorMentorIdSelected = action((mentorId: string) => {
    this.studentsPlaceHistorMentorIdSelected = mentorId;
  });

  // tasks
  tasksMainSelectedTag = "test";
  tasksAverageSelectedTag = "test";
  tasksAverageSelectedWeight = "without Weight";
  tasksAverageSelectedPersonStatus = "Active";
  tasksScoreSelectedTag = "test";
  setTasksMainSelectedTag = action((taskType: string) => {
    this.tasksMainSelectedTag = taskType;
  });
  setTasksAverageSelectedTag = action((taskType: string) => {
    this.tasksAverageSelectedTag = taskType;
  });
  setTasksScoreSelectedTag = action((taskType: string) => {
    this.tasksScoreSelectedTag = taskType;
  });
  setTasksAverageSelectedWeight = action((weightOptions: string) => {
    this.tasksAverageSelectedWeight = weightOptions;
  });
  setTasksAverageSelectedStudentGit = action((name: string) => {
    this.tasksAverageSelectedStudentGit = name;
  });
  setTasksAverageSelectedPersonStatus = action((status: string) => {
    this.tasksAverageSelectedPersonStatus = status;
  });
  setTasksScoreSelectedTask = action((task: string) => {
    this.tasksScoreSelectedTask = task;
  });

  // mentors
  mentorStudentsSelectedTag = "";
  mentorStudentsSelectedMentor = "";
  mentorStudentsSelectedMentorId = "";

  setMentorStudentsSelectedTag = action((tag: string) => {
    this.mentorStudentsSelectedTag = tag;
  });
  setMentorStudentsSelectedMentor = action((name: string) => {
    this.mentorStudentsSelectedMentor = name;
  });
  setMentorStudentsSelectedMentorId = action((id: string) => {
    this.mentorStudentsSelectedMentorId = id;
  });

  getSelectionOptionsTaskTag() {
    const options: { value: string; label: string }[] = [];
    const optionSet = new Set();
    this.taskJson.forEach((task: any) => {
      if (!optionSet.has(task.tag)) {
        options.push({
          value: task.tag,
          label: task.tag[0].toUpperCase() + task.tag.slice(1),
        });
      }
      optionSet.add(task.tag);
    });
    return options;
  }

  getSelectionStudentGithubId() {
    const options: any = [];
    let studentGit: any;
    for (studentGit of Object.keys(this.tasksResultsJson)) {
      options.push({
        value: studentGit,
        label: studentGit,
      })
    }
    return options
  }

  getSelectionOptionTaskList() {
    const options: any = {};
    this.optionsTaskTag.forEach((tag: any) => {
      options[tag.value] = [];
    });
    this.taskJson.forEach((task: any) => {
      if (options.hasOwnProperty(task.tag)) {
        options[task.tag].push(task.name);
      }
    });
    return options;
  }

  getSelectionOptionsMentorsName() {
    const options: { value: string; label: string }[] = [];
    let mentor: any;
    for (mentor of Object.values(this.mentorsJson)) {
      options.push({
        value: mentor.githubId,
        label: mentor.name,
      });
    }
    return options;
  }
}

let store = new Store();

export default store;
