import React from "react";
import { observer } from "mobx-react-lite";
import { Select } from 'antd';
import { CirclePacking } from '@ant-design/plots';

import rssStatisticsData from '../../../stores/RssStatisticsData';
import styles from './students-geography.module.css'

function sortFunction(a: [string, number], b: [string, number]): number {
  return b[1] - a[1];
}

function getSelectOptions() {
  const {studentsCity} = rssStatisticsData;
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

const onChange = (value: string) => {
  rssStatisticsData.setStudentsGeographySelected(value);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

const cityCirclePacking = (): any => {
  const cityObj = rssStatisticsData.studentsCity;
  const countrySelect = rssStatisticsData.studentsGeographySelected;
  console.log('11.11', rssStatisticsData.studentsGeographySelected);
  const data: {name: string, children: {name: string, value: number}[]} = {
    "name": 'City',
    "children": []
  };
  for (let city of Object.keys(cityObj[countrySelect])) {
    data['children'].push({
      'name': city,
      'value': cityObj[countrySelect][city],
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
  if (rssStatisticsData.studentsGeographySelected === '') {
    rssStatisticsData.setStudentsGeographySelected(optionsSelect[0].label);
  }
  return (
  <>
    <div>
      <Select
        className={styles.selectCountry}
        showSearch
        placeholder="Select a country"
        optionFilterProp="children"
        defaultValue={optionsSelect[0].label}
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={optionsSelect}
      />
    </div>
    <div>
      {cityCirclePacking()}
    </div>
  </>
  );
};

export default observer(StudentsGeography);