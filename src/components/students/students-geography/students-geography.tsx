import React from "react";
import { observer } from "mobx-react-lite";
import { Select, Typography } from 'antd';
import { CirclePacking } from '@ant-design/plots';

import store from '../../../stores/RssStatisticsData';
import styles from './students-geography.module.css'

function sortFunction(a: [string, number], b: [string, number]): number {
  return b[1] - a[1];
}

const { Title } = Typography;

function getSelectOptions() {
  const {studentsCity} = store;
  const countryOptions: [string, number][] = [];
  for (let country of Object.keys(studentsCity)) {
    const countryPeople = Object.values(studentsCity[country])
      .reduce((acc: number, item: any) => acc + item, 0)
      countryOptions.push([country, countryPeople]);
  }
  const sortedCountryOptions = countryOptions.sort(sortFunction)
  const options: {value: string, label: string}[] = [];
  sortedCountryOptions.forEach((country) => {
    options.push({
      value: country[0],
      label: country[0],
    })
  })
  return options
}

const selectOnChange = (value: string) => {
  store.setStudentsGeographySelected(value);
};

const selectOnSearch = (value: string) => {
  console.log('search:', value);
};

const CityCirclePacking = (): any => {
  const cityObj = store.studentsCity;
  const countryObj = store.studentsCountry;
  const countrySelect = store.studentsGeographySelected;
  let totalPeopleInCircle  = 0;
  let totalCitizen = 0
  countryObj.forEach((country) => {
    if (country[0] === countrySelect) {
      totalCitizen = Number(country[1]);
    }
  })  
  const data: {name: string, children: {name: string, value: number}[]} = {
    "name": 'City',
    "children": []
  };
  for (let city of Object.keys(cityObj[countrySelect])) {
    totalPeopleInCircle += cityObj[countrySelect][city];
    data['children'].push({
      'name': city,
      'value': cityObj[countrySelect][city],
    })
  }
  if (totalCitizen) {
    data['children'].push({
      'name': 'Other',
      'value': totalCitizen - totalPeopleInCircle,
    })
  }
  const config: any = {
    autoFit: true,
    data,
    label: {
      formatter: (element: any) => {
        return element.name !== 'City' ? element.name : '';
      },
      // 偏移
      offsetY: 8,
      style: {
        fontSize: 12,
        textAlign: 'center',
        fill: 'rgba(0,0,0,0.65)',
      },
    },
    legend: false,
    hierarchyConfig: {
      sort: (a: any, b: any) => b.depth - a.depth,
    },
  };
  return <CirclePacking {...config} />;
};

const StudentsGeography = () => {
  const optionsSelect = getSelectOptions();
  if (store.studentsGeographySelected === '') {
    store.setStudentsGeographySelected(optionsSelect[0].label);
  }
  return (
  <>
    <Title className={styles.title} level={2}>Country and City</Title>
    <div className={styles.optionContainer}>
      <Select
        className={styles.selectCountry}
        showSearch
        placeholder="Select a country"
        optionFilterProp="children"
        defaultValue={optionsSelect[0].label}
        onChange={selectOnChange}
        onSearch={selectOnSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={optionsSelect}
      />
    </div>
    <div>
      {CityCirclePacking()}
    </div>
  </>
  );
};

export default observer(StudentsGeography);