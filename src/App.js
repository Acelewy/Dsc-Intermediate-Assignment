import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [CurrencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency , setFromCurrency] = useState()
   const [toCurrency, setToCurrency] = useState();
   const [exchangeRate , setExchangeRate] = useState();
   const [amount, setAmount ] = useState(1);
   const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

   let toAmount , fromAmount
   if (amountInFromCurrency){
     fromAmount = amount
     toAmount = amount * exchangeRate
   } else{
     toAmount = amount
     fromAmount = amount / exchangeRate
   }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
			const FirstCurrency = Object.keys(data.rates)[0];
			setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
			setFromCurrency(data.base);
			setToCurrency(FirstCurrency);
      setExchangeRate(data.rates[FirstCurrency])
		})
  }, [])

  useEffect(() => {
    if(fromCurrency !=null && toCurrency !=null){
          fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
				.then((res) => res.json())
				.then((data) => setExchangeRate(data.rates[toCurrency]));


    }

  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

    function handleToAmountChange(e) {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	}
  


  return (
		<>
			<h1>Currency Converter</h1>
			<CurrencyRow
				CurrencyOptions={CurrencyOptions}
				SelectedCurrency={fromCurrency}
				onChangeCurrency={(e) => setFromCurrency(e.target.value)
          }
				onChangeAmount={handleFromAmountChange}
				amount={fromAmount}
			/>

			<div className="equals">=</div>
			<CurrencyRow
				CurrencyOptions={CurrencyOptions}
				SelectedCurrency={toCurrency}
				onChangeCurrency={(e) => {setToCurrency(e.target.value)}}
				onChangeAmount={handleToAmountChange}
				amount={toAmount}
			/>
		</>
  );
}

export default App;
