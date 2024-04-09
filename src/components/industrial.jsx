import React, { useEffect, useState } from 'react'
import Table from 'antd/es/table/Table'

const 
  CPI = {
  '01': 'Продукти харчування',
  '02': 'Алкоголь, тютюнові вироби',
  '03': 'Одяг і взуття',
  '04': 'Житло, вода, електроенергія та газ',
  '05': 'Предмети домашнього вжитку',
  '06': 'Охорона здоров’я',
  '07': 'Транспорт',
  '08': 'Зв’язок',
  '09': 'Відпочинок і культура',
  '10': 'Освіта',
  '11': 'Ресторани та готелі',
  '12': 'Різні товари та послуги',
},
  PPI = {
  'BCDE': 'Промисловість',
  'B': 'Добувна промисловість',
  'B1': 'Добування  вугілля',
  'B2': 'Добування нафти та газу',
  'B3': 'Добування металевих руд',
  'C': 'Переробна промисловість',
  'C1': 'Виробництво харчових продуктів',
  'C2': 'Текстильне виробництво',
  'C3': 'Виготовлення виробів з деревини',
  'C4': 'Виробництво продуктів нафтоперероблення',
  'C5': 'Виробництво хімічних речовин',
  'C6': 'Виробництво фармацевтичних продуктів',
  'C7': 'Виробництво гумових і пластмасових виробів',
  'C8': 'Металургійне виробництво',
  'C91': 'Виробництво комп`ютерів',
  'C92': 'Виробництво електричного устаткування',
  'C93': 'Виробництво машин і устаткування',
  'C94': 'Виробництво автотранспортних засобів',
  'D': 'Постачання електроенергії',
},
  KU = {
  "1": "Вінницька",
  "2": "Волинська",
  "3": "Дніпропетровська",
  "4": "Донецька",
  "5": "Житомирська",
  "6": "Закарпатська",
  "7": "Запорізька",
  "8": "Івано-Франківська",
  "9": "Київська",
  "10": "Кіровоградська",
  "11": "Крим",
  "12": "Луганська",
  "13": "Львівська",
  "14": "Миколаївська",
  "15": "Одеська",
  "16": "Полтавська",
  "17": "Рівненська",
  "18": "Сумська",
  "19": "Тернопільська",
  "20": "Харківська",
  "21": "Херсонська",
  "22": "Хмельницька",
  "23": "Черкаська",
  "24": "Чернігівська",
  "25": "Чернівецька",
  "26": "Київ",
  "29": "Севастополь",
  },
  years = Array(11).fill(new Date().getFullYear()).map((d, i) => d-i)


export default function Industrial() {
    const [data, setData] = useState()
    const [yearFrom, setYearFrom] = useState(new Date().getFullYear()-3)
    const [yearTill, setYearTill] = useState(new Date().getFullYear()-2)
   
    async function getData() {
        setData(
          (await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=y&json&start=${yearFrom}0101&end=${yearTill}1231`)).json())
          .filter(e => e.value && e.mcrd081 !== 'Total' && (e.ku !== null || e.mcrk110 !== 'NULL') && (e.tzep === 'DTPY_' || e.tzep === 'DTDPY_'))
          .map(e => { return {...e, ...{
            caption: CPI[e.mcrd081] || PPI[e.mcrk110] || e.mcrd081,
            year: e.dt.substr(0, 4),
            region: KU[e.ku] || e.ku,
          }}})
        )
    }
    useEffect(_ => { getData() }, [yearFrom, yearTill])

  return (
    <div>
      <div className='first_screen' id='industrial'>
          <h2 className='h2_first_screen'>
          {window.outerWidth > 765 ? 'Індекс споживчих цін та індекс цін виробників' : 'ІСЦ / ІЦВ по регіонах'}
          </h2>
          <div className='select_container'>
              <select value={yearFrom} onChange={e => setYearFrom(e.target.value)} className='year_select'>
                  {years.map(i => 
                      <option value={i} key={'setYearFrom'+i}>{i}</option>    
                  )}
              </select>
              <select value={yearTill} onChange={e => setYearTill(e.target.value)} className='year_select'>
                  {years.map(i => 
                      <option value={i} key={'setYearTill'+i}>{i}</option>    
                  )}
              </select>
          </div>
      </div>  
      <Table dataSource={data} columns={[
        {title: 'Назва',  dataIndex: 'caption',   key: 'caption',   sorter: (a, b) => a.caption > b.caption ? 1 : -1},
        {title: 'Регіон',     dataIndex: 'region',    key: 'region',    sorter: (a, b) => a.region > b.region ? 1 : -1},
        {title: 'Рік',        dataIndex: 'year',      key: 'year',      sorter: (a, b) => a.year - b.year}, 
        {title: '%',   dataIndex: 'value',     key: 'value',     sorter: (a, b) => a.value - b.value, align: 'right'},
      ]} size="small" />
    </div>
  )
}
