import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

let years = []

export default function Comparison() {
    const [data, setData] = useState()
    const [yearFrom, setYearFrom] = useState(new Date().getFullYear()-15)
    const [yearTill, setYearTill] = useState(new Date().getFullYear())

    async function getData(start = yearFrom, end = yearTill) {
        let iData =  
            (await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=y&json&id_api=prices_price_cpi_&mcrd081=Total&sort=dt&order=asc&start=${start}0101&end=${end}1231`)).json())
            .filter(e => e.ku == null && e.tzep == "DTPY_");
        let rData =  
            (await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=y&json&id_api=prices_price_ppi_&mcrd081=Total&sort=dt&order=asc&start=${start}0101&end=${end}1231`)).json())
            .filter(e => e.mcrk110 == "BCDE" && e.tzep == "DTDPY_");
        setData({
            labels: iData.map(e => e.dt.substr(0,4)),
            datasets: [
                { 
                    label: iData[0].txt,
                    data: iData.map(e => e.value),
                    borderColor: "black", 
                    borderRadius: "10", 
                    backgroundColor: iData.map(_ => `rgb(
                        ${Math.random() * 200 + 55}, 
                        ${Math.random() * 200 + 55}, 
                        ${Math.random() * 200 + 55}
                    )`)
                },
                { 
                    label: rData[0].txt,
                    data: rData.map(e => e.value),
                    borderColor: "black", 
                    borderRadius: "10",
                    backgroundColor: iData.map(_ => `rgb(
                        ${Math.random() * 200 + 55}, 
                        ${Math.random() * 200 + 55}, 
                        ${Math.random() * 200 + 55}
                    )`)
                }
            ]
        })    
    }
    useEffect(_ => {
        years = []
        for (let i = new Date().getFullYear(); i >= new Date().getFullYear() - 15; i--){ 
            years.push(i)
        }
        getData()
    }, [])

    useEffect(_ => {
        getData(yearFrom, yearTill)
    }, [yearFrom, yearTill])
    return (
        <div>
            <div className='first_screen'>
                <h2 className='h2_first_screen'>Співвідношення індексів інфляції</h2>
                <div className='select_container'>
                    <select onChange={e => setYearFrom(e.target.value)} className='year_select'>
                        {years.map(i => 
                            <option value={i} key={'setYearFrom'+i} selected={yearFrom==i?'selected':false}>{i}</option>    
                        )}
                    </select>
                    <select onChange={e => setYearTill(e.target.value)} className='year_select'>
                        {years.map(i => 
                            <option value={i} key={'setYearTill'+i} selected={yearTill==i?'selected':false}
                            >{i}</option>    
                        )}
                    </select>
                </div>
            </div>  
            {data ? <Bar data={data} /> : <></>}
        </div>
    )
}
