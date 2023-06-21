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
  taskJson?: Task[] | any;
  taskTag?: TaskTag | any;
  optionsTaskTag: any;
  optionsTaskList: any;
  tasksScoreSelectedTask: any;
  mentorsJson?: MentorsJson | any;

  constructor() {
    this.loadData();
    makeAutoObservable(this);
  }

  loadData = async () => {
    await this.studentsConstJsonLoadData();
    await this.tasksTagLoadData();
    await this.tasksJsonLoadData();
    await this.mentorsJsonLoadData();

    this.optionsTaskTag = this.getSelectionOptionsTaskTag();
    this.optionsTaskList = this.getSelectionOptionTaskList();
    this.tasksScoreSelectedTask =
      this.optionsTaskList[this.tasksScoreSelectedTag][0];
    this.isLoad = true;
  };

  studentsConstJsonLoadData = async () => {
    const studentsData = await fetch("/data/studentConst.json").then(
      (response) => response.json()
    );
    this.studentsTotal = Number(studentsData["studentsTotal"]);
    this.studentsStatus = studentsData["studentsStatus"];
    this.studentsGender = studentsData["studentsGender"];
    this.studentsCountry = studentsData["studentsCountry"];
    this.studentsCity = studentsData["studentsCity"];
  };

  tasksTagLoadData = async () => {
    const taskTagData = await fetch("/data/tasksTag.json").then((response) =>
      response.json()
    );
    this.taskTag = taskTagData;
  };

  tasksJsonLoadData = async () => {
    const tasksData = await fetch("/data/tasks.json").then((response) =>
      response.json()
    );
    this.taskJson = tasksData;
  };

  mentorsJsonLoadData = async () => {
    const jsonData = await fetch("/data/mentors.json").then((response) =>
      response.json()
    );
    this.mentorsJson = jsonData;
  };

  getRssStatisticsData = () => {
    return this;
  };

  // students
  studentsGeographySelected: string = "";
  setStudentsGeographySelected = action((country: string) => {
    this.studentsGeographySelected = country;
  });

  // tasks
  tasksMainSelectedTag = "test";
  tasksAverageSelectedTag = "test";
  tasksAverageSelectedWeight = "without Weight";
  tasksAverageSelectedPersonName = "none";
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
  setTasksAverageSelectedPersonName = action((name: string) => {
    this.tasksAverageSelectedPersonName = name;
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
      if (!optionSet.has(task.tag) && !task.tag.includes("submit")) {
        options.push({
          value: task.tag,
          label: task.tag[0].toUpperCase() + task.tag.slice(1),
        });
      }
      optionSet.add(task.tag);
    });
    return options;
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
