import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js"
  import { Bar } from 'react-chartjs-2'
  
ChartJS.register(  
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function Comparison() {

    const [data, setData] = useState()

    async function getData(year = 2019, end = 2023) {
        const URL = `https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=y&json&id_api=prices_price_cpi_&mcrd081=Total&start=${year}0101&end=${end}1231`
        let rawData =  
            (await (await fetch(URL)).json())
            .filter(e => e.ku == null && e.tzep == "DTPY_");
        setData({
            labels: rawData.map(e => e.dt.substr(0,14)),
            datasets: [
                { 
                    data: rawData.map(e => e.value),
                    borderColor: "black", 
                    borderRadius: "10", 
                    hoverBackgroundColor: "#5932EA",
                    backgroundColor: rawData.map(_ => `rgb(
                        ${Math.random() * 200 + 55}, 
                        ${Math.random() * 200 + 55}, 
                        ${Math.random() * 200 + 55}
                    )`)
                }
            ]
        })    
    }
    useEffect(_ => {
        getData()
    }, [])
    return (
        <div>
            {data ? <Bar data={data} 
                options={{
                    scales: {x: {display: false}},
                    plugins: {
                        legend: {display: false}
                    }
                }}
            /> : <></>}
        </div>
    )
}
