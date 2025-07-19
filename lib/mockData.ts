import { Stock } from './types';

export const initialStocks: Stock[] = [
  {
    symbol: 'UDI',
    name: 'UDIT Inc.',
    price: -150,
    previousPrice: -123,
    percentageChange: 0.3,
    volume: 1000000,
  },
  {
    symbol: 'MAN',
    name: 'FORCE Inc.',
    price: 2750.8,
    previousPrice: 2745.5,
    percentageChange: 0.19,
    volume: 500000,
  },
  {
    symbol: 'EVE',
    name: 'ELEVEN Corporation',
    price: 285.9,
    previousPrice: 283.75,
    percentageChange: 0.76,
    volume: 750000,
  },
  {
    symbol: 'VAR',
    name: 'JOS Inc.',
    price: 3300.45,
    previousPrice: 3290.2,
    percentageChange: 0.31,
    volume: 600000,
  },
  {
    symbol: 'TA',
    name: 'TA Inc.',
    price: 890.5,
    previousPrice: 885.3,
    percentageChange: 0.59,
    volume: 900000,
  },
];

// Function to generate a mock price update for a given stock
export function generateMockPriceUpdate(stock: Stock): Stock {
  // Calculate a random price change within ±1% of the current price
  const priceChange = (Math.random() - 0.5) * (stock.price * 0.02);
  // Calculate the new price by adding the price change to the current price
  const newPrice = stock.price + priceChange;
  // Calculate the percentage change from the previous price to the new price
  const percentageChange =
    ((newPrice - stock.previousPrice) / stock.previousPrice) * 100;

  // Return a new stock object with updated price, previous price, percentage change, and volume
  return {
    ...stock, // Spread the existing stock properties
    previousPrice: stock.price, // Update the previous price to the current price
    price: Number(newPrice.toFixed(2)), // Update the price to the new price, rounded to 2 decimal places
    percentageChange: Number(percentageChange.toFixed(2)), // Update the percentage change, rounded to 2 decimal places
    volume: stock.volume + Math.floor(Math.random() * 10000), // Update the volume with a random increase up to 9999
  };
}
