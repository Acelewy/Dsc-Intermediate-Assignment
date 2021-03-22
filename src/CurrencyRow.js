import React from 'react'

export default function CurrencyRow(props) {
    const {
        CurrencyOptions,
        SelectedCurrency,
        onChangeAmount,
        onChangeCurrency,
        amount
    } = props


    return (
		<div>
			<input type="number" className="input" value={amount} onChange={onChangeAmount}/>

			<select value={SelectedCurrency} 
            onChange={onChangeCurrency}>
				{CurrencyOptions.map((option) => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
		</div>
	);
}
