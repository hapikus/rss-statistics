import { makeAutoObservable, action } from "mobx";

class Store {
  taskJson: any;
  optionsTaskTag: any;
  optionsTaskList: any;
  tasksScoreSelectedTask: any;

  constructor() {
    this.loadData();
    makeAutoObservable(this);
  };

  loadData = async () => {
    await this.taskJsonLoadData();
    await this.mentorsObjLoadData();
  
    this.optionsTaskTag = this.getSelectionOptionsTaskTag();
    this.optionsTaskList = this.getSelectionOptionTaskList();
    this.tasksScoreSelectedTask = this.optionsTaskList[this.tasksScoreSelectedTag][0];
  };

  taskJsonLoadData = async () => {
    const jsonData = await fetch('/data/tasks.json').then(response => response.json());
    this.taskJson = jsonData;
  };

  mentorsObjLoadData = async () => {
    const jsonData = await fetch('/data/mentors.json').then(response => response.json());
    this.mentorsObj = jsonData;
  };

  getRssStatisticsData = () => {
    return this
  }

  // students  
  studentsTotal = 8108;
  studentsStatus = {
    isActive: 1577,
    notActive: 6603,
  };
  studentsGender: any = { Male: 5405, Female: 2582, Unknown: 193 };
  studentsCountry = [
    [ 'Belarus', 2713 ],
    [ 'Russia', 2360 ],
    [ 'Ukraine', 739 ],
    [ 'Kazakhstan', 463 ],
    [ 'Poland', 429 ],
    [ 'Uzbekistan', 290 ],
    [ 'Georgia', 221 ],
  ];
  studentsCity: any = {
    "Belarus": {
      "Minsk": 1455,
      "Mogilev": 114,
      "Soligorsk": 13,
      "Novopolotsk": 25,
      "Zhlobin": 10,
      "Pinsk": 20,
      "Минск": 95,
      "Brest": 164,
      "Gomel": 156,
      "Baranovichi": 15,
      "Vitebsk": 72,
      "Беларусь": 31,
      "Bobruisk": 8,
      "Могилёв": 10,
      "Belarus": 201,
      "Grodno": 70,
      "Borisov": 13,
      "Orsha": 7,
      "Hrodna": 21,
      "Homel": 11,
      "Гродно": 7,
      "Mozyr": 14,
      "Lida": 9,
      "Maladzyechna": 7,
      "Homyel": 11,
      "Polotsk": 9,
      "Гомель": 14
    },
    "Russia": {
      "Nizhny Novgorod": 47,
      "Saint Petersburg": 309,
      "Barnaul": 10,
      "Kaliningrad": 26,
      "Moscow": 482,
      "Krasnoyarsk": 16,
      "Санкт-Петербург": 35,
      "Bryansk": 7,
      "Rostov-on-Don": 22,
      "Ufa": 44,
      "Yekaterinburg": 30,
      "Perm": 15,
      "Samara": 52,
      "Vologda": 10,
      "Krasnodar": 59,
      "Penza": 9,
      "St Petersburg": 29,
      "Omsk": 25,
      "Voronezh": 25,
      "Volgograd": 24,
      "Kazan": 64,
      "Lipetsk": 9,
      "Ekaterinburg": 31,
      "Kirov": 10,
      "Togliatti": 14,
      "Tomsk": 12,
      "Tyumen": 23,
      "Makhachkala": 7,
      "Yaroslavl": 15,
      "Novosibirsk": 49,
      "Saratov": 23,
      "Khabarovsk": 13,
      "Tula": 8,
      "Chelyabinsk": 23,
      "Russia": 110,
      "Sankt Petersburg": 14,
      "Izhevsk": 35,
      "Cheboksary": 10,
      "Vladivostok": 10,
      "Ryazan": 12,
      "Taganrog": 7,
      "Москва": 20,
      "Нижний Новгород": 7,
      "Tambov": 7,
      "Kaluga": 9,
      "Irkutsk": 17,
      "Naberezhnye Chelny": 8,
      "Stavropol": 9,
      "Orenburg": 10,
      "Kursk": 7,
      "Sochi": 10,
      "Россия": 13,
      "Yakutsk": 9,
      "Tver": 7,
      "Magnitogorsk": 9,
      "Grozny": 12
    },
    "Ukraine": {
      "Zaporizhzhia": 16,
      "Ukraine": 87,
      "Kyiv": 128,
      "Mykolaiv": 15,
      "Kiev": 28,
      "Kharkiv": 83,
      "Dnipro": 38,
      "Odessa": 11,
      "Donetsk": 7,
      "Киев": 7,
      "Poltava": 8,
      "Lviv": 50,
      "Odesa": 25,
      "Ivano-Frankivsk": 8,
      "Khmelnytskyi": 9,
      "Vinnytsia": 9,
      "Ódessa": 12,
      "Cherkasy": 7,
      "Харьков": 7
    },
    "Kazakhstan": {
      "Astana": 101,
      "Pavlodar": 10,
      "Almaty": 153,
      "Karaganda": 36,
      "Shymkent": 8,
      "Aktau": 7,
      "Kazakhstan": 38,
      "Uralsk": 11,
      "Atyrau": 11,
      "Kostanay": 7,
      "Nur-Sultan": 17
    },
    "Poland": {
      "Warsaw": 80,
      "Wrocław": 51,
      "Gdańsk": 45,
      "Łódź": 13,
      "Poznań": 36,
      "Warszawa": 54,
      "Białystok": 25,
      "Kraków": 61
    },
    "Uzbekistan": {
      "Fergana": 9,
      "Tashkent": 193,
      "Uzbekistan": 22,
      "Toshkent": 7,
      "Uzbekiston": 7
    },
    "Georgia": {
      "Tbilisi": 115,
      "Batumi": 89
    }
  }
  studentsGeographySelected: string = '';  
  setStudentsGeographySelected = action((country: string) => {
    this.studentsGeographySelected = country;
  });

  // tasks
  tasksMainSelectedTag = 'test';
  tasksAverageSelectedTag = 'test';
  tasksAverageSelectedWeight = 'without Weight';
  tasksAverageSelectedPersonName = 'none';
  tasksAverageSelectedPersonStatus = 'Active'
  taskTag = [
    [ 'test', 35 ],
    [ 'lecture', 10 ],
    [ 'coding', 14 ],
    [ 'self-study', 68 ],
    [ 'cross-check-submit', 12 ],
    [ 'cross-check-review', 12 ],
    [ 'interview', 1 ]
  ];
  tasksScoreSelectedTag = 'test';
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
  mentorStudentsSelectedTag = '';
  mentorsObj = {};

  setMentorStudentsSelectedTag = action((tag: string) => {
    this.mentorStudentsSelectedTag = tag;
  });

  getSelectionOptionsTaskTag() {
    const options: {value: string, label: string}[] = [];
    const optionSet = new Set();
    this.taskJson.forEach((task: any) => {
      if (!optionSet.has(task.tag) && !task.tag.includes('submit')) {
        options.push({
          value: task.tag,
          label: task.tag[0].toUpperCase() + task.tag.slice(1),
        })
      }
      optionSet.add(task.tag);    
    })
    return options;
  }

  getSelectionOptionTaskList() {
    const options: any = {};
    this.optionsTaskTag.forEach((tag: any) => {
      options[tag.value] = [];
    })
    this.taskJson.forEach((task: any) => {
      if (options.hasOwnProperty(task.tag)) {
        options[task.tag].push(task.name);
      }
    });
    return options;
  }
}

let store = new Store();

export default store;
