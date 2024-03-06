import React, { useEffect, useState } from 'react'

export default function Rate() {
  const UAH_CURR = 980
  const USD_CURR = 840
  const EUR_CURR = 978
  const [date, setDate] = useState()
  const [usdBuy, setUSDBuy] = useState()
  const [eurBuy, setEURBuy] = useState()
  const [usdSell, setUSDSell] = useState()
  const [eurSell, setEURSell] = useState()

  async function updateRates() {
    const URL = `https://api.monobank.ua/bank/currency`
    let data =  await (await fetch(URL)).json();
    if (Array.isArray(data)) {
      setUSDBuy(data?.find(a => a.currencyCodeA==USD_CURR && a.currencyCodeB==UAH_CURR).rateBuy)
      setEURBuy(data?.find(a => a.currencyCodeA==EUR_CURR && a.currencyCodeB==UAH_CURR).rateBuy)
      setUSDSell(data?.find(a => a.currencyCodeA==USD_CURR && a.currencyCodeB==UAH_CURR).rateSell)
      setEURSell(data?.find(a => a.currencyCodeA==EUR_CURR && a.currencyCodeB==UAH_CURR).rateSell)
      setDate(new Date().toTimeString().substr(0,5))
    }
  }
  useEffect(_ => {
    updateRates()
    setTimeout(updateRates, 30000)
  }, [])
  return (
    usdBuy ? <div className='marquee_infinite'>
        <div className='marquee_container'>
          <p className='marquee_txt'>
            {`Курс валют на ${date} USD купівля ${usdBuy} грн /продаж ${usdSell} грн`}
          </p> 
          <p className='marquee_txt'>
            {`Курс валют на ${date} EUR купівля ${eurBuy} грн /продаж ${eurSell} грн`}
          </p> 
        </div>
      </div> : <></>
  )
}
