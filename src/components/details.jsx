import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, LineElement } from "chart.js"
import { Line } from 'react-chartjs-2'
import { getColor } from '../utils/color'
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend )

const KU = {
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
}
let chart;
setInterval(_ => {
    chart?.data?.datasets?.reduce((acc, el) => { 
        el.hidden = Math.random() > 0.8 && acc-- > 0 ? false : true  
        return acc
    }, 3)
    chart && chart.update()
}, 5000)

export default function Details() {
    const [data, setData] = useState()
    const [dateFrom, setDateFrom] = useState('20170101')
    const [dateTill, setDateTill] = useState('20220101')

    function pointRadius(ctx){
        return Math.ceil(Math.sqrt(ctx.parsed.y*3));
    }

    async function getData() {
        let iData =  
            (await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=m&json&id_api=prices_price_cpi_&mcrd081=Total&tzep=DTPY_&sort=dt&order=asc&start=${dateFrom}&end=${dateTill}`)).json())
            .filter(e => e.ku !== null);
        setData({
            labels: iData.map(e => e.dt.substr(0, 6).replace(/(.{4})(.{2})/,'$2.$1')).filter((v, i, a) => a.indexOf(v) == i),
            datasets: Object.values(Object.groupBy(iData, e => e.ku)).map((arr, i) => { 
                let [borderColor, backgroundColor] = getColor(Object.keys(Object.groupBy(iData, e => e.ku)).length, i)
                return { 
                    label: KU[arr[0].ku] || arr[0].ku,
                    data: arr.map(e => e.value),
                    hidden: i > 5,
                    tension: 0.3,
                    borderColor: arr.map(_ => borderColor),
                    backgroundColor: arr.map(_ => backgroundColor)
                }
            }).sort(_=>Math.random() > 0.5 ? 1 : -1)
        })    
    }
    useEffect(_ => { getData() }, [dateFrom, dateTill])

    return (
        <div id='details'>
            <div className='first_screen'>
                <h2 className='h2_first_screen'>
                {window.outerWidth > 765 ? 'Індекс споживчих цін по регіонах' : 'ІСЦ по регіонах'}
                </h2>
                <div className='select_container'>
                    <input type='date' min="2014-01-01" value={dateFrom.replace(/(.{4})(.{2})(.{2})/, '$1-$2-$3')} onChange={e => setDateFrom(e.target.value.replaceAll('-', ''))} className='year_select' />
                    <input type='date' min="2014-01-01" value={dateTill.replace(/(.{4})(.{2})(.{2})/, '$1-$2-$3')} onChange={e => setDateTill(e.target.value.replaceAll('-', ''))} className='year_select' />
                </div>
            </div>  
            {data ? <Line data={data} options={{ elements: {point: {radius: pointRadius, hoverRadius: c=>pointRadius(c) + 3}}, plugins: {legend: {display: window.outerWidth > 765}}}}  ref={r => chart=r} /> : <></>}
        </div>
    )
}
