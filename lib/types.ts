export interface Stock {
    symbol: string;
    name: string;
    price: number;
    previousPrice: number;
    percentageChange: number;
    volume: number;
  }
  
  export interface User {
    id: string;
    email: string;
    balance: number;
    portfolio: Portfolio;
  }
  
  export interface Portfolio {
    [symbol: string]: {
      quantity: number;
      averagePrice: number;
    };
  }
  
  export interface Trade {
    symbol: string;
    quantity: number;
    price: number;
    type: 'buy' | 'sell';
    timestamp: Date;
  }