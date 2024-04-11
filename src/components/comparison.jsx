import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { getColor } from '../utils/color'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
let years = Array(11).fill(new Date().getFullYear()).map((d, i) => d-i)

export default function Comparison() {
    const [data, setData] = useState()
    const [yearFrom, setYearFrom] = useState(new Date().getFullYear()-10)
    const [yearTill, setYearTill] = useState(new Date().getFullYear())
    
    async function getData() {
        let iData =  
            (await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=y&json&id_api=prices_price_cpi_&mcrd081=Total&tzep=DTPY_&sort=dt&order=asc&start=${yearFrom}0101&end=${yearTill}1231`)).json())
            .filter(e => e.ku == null);
        let rData = 
            (await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=y&json&id_api=prices_price_ppi_&mcrd081=Total&mcrk110=BCDE&tzep=DTDPY_&sort=dt&order=asc&start=${yearFrom}0101&end=${yearTill}1231`)).json());
        setData({
            labels: iData.map(e => e.dt.substr(0,4)),
            datasets: [
                { 
                    label: iData[0].txt,
                    data: iData.map(e => e.value),
                    borderRadius: "5", 
                    backgroundColor: iData.map((_, i) => getColor(iData.length, i)[0])
                        .sort(_=>Math.random() > 0.5 ? 1 : -1)
                },
                { 
                    label: rData[0].txt,
                    data: rData.map(e => e.value),
                    borderRadius: "5",
                    backgroundColor: rData.map((_, i) => getColor(rData.length, i)[0])
                        .sort(_=>Math.random()>0.5?1:-1)
                }
            ]
        })    
    }
    useEffect(_ => { getData() }, [yearFrom, yearTill])

    return (
        <div id='comparison'>
            <div className='first_screen'>
                <h2 className='h2_first_screen'>
                    {window.outerWidth > 765 ? 'Індекс споживчих цін та індекс цін виробників' : 'ІСЦ / ІЦВ'}
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
            {data ? <Bar data={data} options={{plugins: {legend: {display: false}}}} /> : <></>}
        </div>
    )
}
