import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Comparison() {
    const [data, setData] = useState()

    async function getData(start = 2019, end = 2023) {
        let iData =  
            (await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=y&json&id_api=prices_price_cpi_&mcrd081=Total&start=${start}0101&end=${end}1231`)).json())
            .filter(e => e.ku == null && e.tzep == "DTPY_");
        let rData =  
            (await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?period=y&json&id_api=prices_price_ppi_&mcrd081=Total&start=${start}0101&end=${end}1231`)).json())
            .filter(e => e.mcrk110 == "BCDE" && e.tzep == "DTDPY_");
        setData({
            labels: iData.map(e => e.dt.substr(0,4)),
            datasets: [
                { 
                    label: iData[0].txt,
                    data: iData.map(e => e.value),
                    borderColor: "black", 
                    borderRadius: "10", 
                    hoverBackgroundColor: "#5932EA",
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
                    hoverBackgroundColor: "#5932EA",
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
        getData()
    }, [])
    return (
        <div>
            {data ? <Bar data={data} /> : <></>}
        </div>
    )
}
