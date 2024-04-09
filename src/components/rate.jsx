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
    let data =  await (await fetch(`https://api.monobank.ua/bank/currency`)).json();
    if (Array.isArray(data)) {
      setUSDBuy(data?.find(a => a.currencyCodeA===USD_CURR && a.currencyCodeB===UAH_CURR).rateBuy.toString().substr(0,5))
      setEURBuy(data?.find(a => a.currencyCodeA===EUR_CURR && a.currencyCodeB===UAH_CURR).rateBuy.toString().substr(0,5))
      setUSDSell(data?.find(a => a.currencyCodeA===USD_CURR && a.currencyCodeB===UAH_CURR).rateSell.toString().substr(0,5))
      setEURSell(data?.find(a => a.currencyCodeA===EUR_CURR && a.currencyCodeB===UAH_CURR).rateSell.toString().substr(0,5))
      setDate(new Date().toTimeString().substr(0,5))
    }
  }
  useEffect(_ => {
    updateRates()
    setTimeout(updateRates, 61000)
  }, [])
  return (
    usdBuy ? <div className='marquee_infinite'>
        <div className='marquee_container'>
          <p className='marquee_txt'>
            {`Курс валют на ${date} - USD ${usdBuy} / ${usdSell}, EUR ${eurBuy} / ${eurSell}`}
          </p> 
          <p className='marquee_txt'>
            {`Курс валют на ${date} - USD ${usdBuy} / ${usdSell}, EUR ${eurBuy} / ${eurSell}`}
          </p>
        </div>
      </div> : <></>
  )
}
