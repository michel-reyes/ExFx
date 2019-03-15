//http://restcountries.eu/#rest-countries
//https://currencylayer.com/quickstart

const axios = require('axios');

const currencyPlayerAPI = '8b2a88cac52ad6a724a7ec59f6ff0e70';

const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
        const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${currencyPlayerAPI}&format=1`);
    
        const rate = response.data.rate;
        const euro = 1 / rate[fromCurrency];
        const exchangeRate = euro * rate[toCurrency];
    
        return exchangeRate;        
    } catch (error) {
        throw new Error(`Unable to get currency ${fromCurrency} and  ${toCurrency}`);
    }
};

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    
        return response.data.map(country => country.name);        
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} 
    ${toCurrency}. You can spend these in the following countries: ${countries}`;
}

convertCurrency('USD', 'HRK', 20)
  .then((message) => {
    console.log(message);
  }).catch((error) => {
    console.log(error.message);
  });