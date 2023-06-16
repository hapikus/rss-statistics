import { makeAutoObservable, action } from "mobx";

class RssStatisticsData {
  constructor() {
    makeAutoObservable(this);
  };
  
  studentsTotal = 8108;
  studentsStatus = {
    isActive: 1577,
    notActive: 6603,
  };
  studentsGender: any = { Male: 5262, Female: 2517, Unknown: 401 }
  studentsCountry = [
    [ 'Belarus', 2713 ],
    [ 'Russia', 2360 ],
    [ 'Ukraine', 739 ],
    [ 'Kazakhstan', 463 ],
    [ 'Poland', 429 ],
    [ 'Uzbekistan', 290 ],
    [ 'Georgia', 221 ],
  ]
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
      "Ulyanovsk": 5,
      "Togliatti": 14,
      "Tomsk": 12,
      "Tyumen": 23,
      "Makhachkala": 7,
      "Yaroslavl": 15,
      "Belgorod": 6,
      "Novosibirsk": 49,
      "Saratov": 23,
      "Khabarovsk": 13,
      "Tula": 8,
      "Chelyabinsk": 23,
      "Yoshkar-Ola": 5,
      "Russia": 110,
      "Sankt Petersburg": 14,
      "Izhevsk": 35,
      "Cheboksary": 10,
      "Vladivostok": 10,
      "Ryazan": 12,
      "Taganrog": 7,
      "Москва": 20,
      "Orel": 6,
      "Arkhangelsk": 6,
      "Нижний Новгород": 7,
      "Tambov": 7,
      "Kaluga": 9,
      "Irkutsk": 17,
      "Екатеринбург": 5,
      "Naberezhnye Chelny": 8,
      "Stavropol": 9,
      "Astrakhan": 5,
      "Orenburg": 10,
      "Kursk": 7,
      "Sochi": 10,
      "Elista": 6,
      "Россия": 13,
      "Yakutsk": 9,
      "Tver": 7,
      "Saransk": 5,
      "Краснодар": 5,
      "Magnitogorsk": 9,
      "Самара": 5,
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
      "Chernivtsi": 6,
      "Vinnytsia": 9,
      "Ódessa": 12,
      "Cherkasy": 7,
      "Ternopil": 6,
      "Харьков": 7,
      "Kharkov": 6
    },
    "Kazakhstan": {
      "Astana": 101,
      "Pavlodar": 10,
      "Almaty": 153,
      "Karaganda": 36,
      "Shymkent": 8,
      "Aktau": 7,
      "Kazakhstan": 38,
      "Aktobe": 5,
      "Uralsk": 11,
      "Petropavlovsk": 5,
      "Atyrau": 11,
      "Kostanay": 7,
      "Nur-Sultan": 17,
      "Казахстан": 6,
      "Алматы": 6
    },
    "Poland": {
      "Warsaw": 80,
      "Gdynia": 5,
      "Wrocław": 51,
      "Gdańsk": 45,
      "Katowice": 6,
      "Łódź": 13,
      "Poznań": 36,
      "Warszawa": 54,
      "Białystok": 25,
      "Kraków": 61,
      "Szczecin": 5
    },
    "Uzbekistan": {
      "Fergana": 9,
      "Tashkent": 193,
      "Bukhara": 6,
      "Uzbekistan": 22,
      "Toshkent": 7,
      "Ташкент": 5,
      "Urgench": 5,
      "Uzbekiston": 7
    },
    "Georgia": {
      "Tbilisi": 115,
      "Batumi": 89
    },
    "Kyrgyzstan": {
      "Bishkek": 142,
      "Osh": 8
    },
    "Germany": {
      "Berlin": 24,
      "Düsseldorf": 5
    },
    "USA": {
      "New York": 8
    }
  }
  studentsGeographySelected: string = '';
  
  setStudentsGeographySelected = action((country: string) => {
    this.studentsGeographySelected = country;
  });
}

let rssStatisticsData = new RssStatisticsData();

export default rssStatisticsData;
