import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getColor } from '../utils/color'

ChartJS.register(ArcElement, Tooltip, Legend)
let years = Array(9).fill(new Date().getFullYear()-2).map((d, i) => d-i)

const CPI = {
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
}
const PPI = {
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
}

export default function Correlation() {
    const [year, setYear] = useState(new Date().getFullYear()-2)
    const [dataCPI, setDataCPI] = useState()
    const [dataPPI, setDataPPI] = useState()

    async function getData() {
        let iData =  
            (await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=y&json&id_api=prices_price_cpi_&tzep=DTPY_&sort=value&order=desc&date=${year}0101`)).json())
            .filter(e => e.ku == null && e.mcrd081 != 'Total')
            .sort(_ => Math.random() > 0.5 ? 1 : -1)
            .map((e,i,a)=> { return {...e, ...{color: getColor(a.length, i)[0]}}})
            .sort((a, b) => b.value - a.value);
        setDataCPI({
            labels: iData.map(e => CPI[e.mcrd081] || e.mcrd081),
            datasets: [
                { 
                    label: iData[0]?.txt,
                    data: iData.map(e => e.value),
                    borderRadius: "5",
                    backgroundColor: iData.map(e => e.color)
                    // backgroundColor: iData.map((_, i) => `rgb(
                    //     ${Math.random() * 200 + 55}, 
                    //     ${Math.random() * 200 + 55}, 
                    //     ${Math.random() * 200 + 55}
                    // )`)
                }
            ]
        })
        let rData =  
            (await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=y&json&id_api=prices_price_ppi_&tzep=DTDPY_&sort=value&order=desc&date=${year}0101`)).json())
            .filter(e => e.mcrk110 != 'BCDE')
            .sort(_ => Math.random() > 0.5 ? 1 : -1)
            .map((e,i,a)=> { return {...e, ...{color: getColor(a.length, i)[0]}}})
            .sort((a, b) => b.value - a.value);
        setDataPPI({
            labels: rData.map(e => PPI[e.mcrk110] || e.mcrk110),
            datasets: [
                { 
                    label: rData[0]?.txt,
                    data: rData.map(e => e.value),
                    borderRadius: "5",
                    backgroundColor: rData.map(e => e.color)
                    // backgroundColor: rData.map(_ => `rgb(
                    //     ${Math.random() * 200 + 55}, 
                    //     ${Math.random() * 200 + 55}, 
                    //     ${Math.random() * 200 + 55}
                    // )`)
                }
            ]
        }) 
    }
    useEffect(_ => { getData() }, [year])

    return (
        <div>
            <div className='first_screen' id='correlation'>
                <h2 className='h2_first_screen'>
                {window.outerWidth > 765 ? 'Співвідношення товарних груп та видів діяльності' : 'Товарні групи / видів діяльності'}
                </h2>
                <div className='select_container'>
                    <select value={year} onChange={e => setYear(e.target.value)} className='year_select'>
                        {years.map(i => 
                            <option value={i} key={'setYear'+i}>{i}</option>    
                        )}
                    </select>
                </div>
            </div>  
            <div className='first_screen'>
                <div className='w-50'>{dataCPI ? <Pie data={dataCPI} options={{radius: '95%', plugins: {legend: {position: 'bottom', maxHeight: 90}}}} /> : <></>}</div>
                <div className='w-50'>{dataPPI ? <Pie data={dataPPI} options={{radius: '95%', plugins: {legend: {position: 'bottom', maxHeight: 90}}}} /> : <></>}</div>
            </div>
        </div>
    )
}
