export interface StudentsStatus {
  isActive: number;
  notActive: number;
}

export interface StudentsGender {
  Male?: number;
  Female?: number;
  Unknown?: number;
}

type StudentCountryTuple = [string, number];
export type StudentsCountry = StudentCountryTuple[];

export type StudentsCity = {
  [country: string]: {
    [city: string]: number;
  };
};

type ScoreObj = Record<string, number>;
export type Task = {
  id: number;
  name: string;
  tag: string;
  scoreWeight: number;
  maxScore: number;
  endDate: string;
  scoreObj?: ScoreObj;
  totalPeople?: number;
  averageScore?: number;
};

type TaskTagTuple = [string, number];
export type TaskTag = TaskTagTuple[];

type CourseTaskScore = {
  courseTaskId: number;
  score: number;
};

type StudentScores = Record<string, CourseTaskScore[]>;

export type MentorsJson = Record<string, {
  githubId: string;
  name: string;
  students: StudentScores;
}>;
