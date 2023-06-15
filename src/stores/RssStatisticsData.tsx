import { makeAutoObservable } from "mobx";

class RssStatisticsData {
  constructor() {
    makeAutoObservable(this);
  };
  
  studentsTotal = 8108;
  studentsStatus = {
    isActive: 1577,
    notActive: 6603,
  };
}

let rssStatisticsData = new RssStatisticsData();

export default rssStatisticsData;
