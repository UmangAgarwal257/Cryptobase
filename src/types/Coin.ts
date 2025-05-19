export type Ticker = {
  trust_score?: string; 
};

export type Coin = {
  description : {
    en: string;
  };
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
      [key: string]: number;
    };
    market_cap: {
      usd: number;
      [key: string]: number;
    };
    high_24h: { [key: string]: number; usd: number };
    low_24h: { [key: string]: number; usd: number };
    total_volume: {
      usd: number;
      [key: string]: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d : number;
    price_change_percentage_30d : number;
    price_change_percentage_60d : number;
    price_change_percentage_1y : number;
    price_change_24h: number;
    sparkline_7d: {
      price: number[];
    };
  };
  market_cap_rank: number;
  hashing_algorithm?: string | null;
  tickers?: Ticker[];
  liquidity_score?: number;
};

export type MarketCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
};