export interface Ticker24h {
  ask: { amount: string; price: string };
  bid: { amount: string; price: string };
  last_price: string | number;
  last_price_changed: string | number;
  last_trading_method: 2;
  liquidity: string | number;
  method: number;
  pair_id: number;
  price_change: string | number;
  price_change_percent: number | string;
  quote_volume: string | number;
  traded_method: number;
  volume: string | number;
  max_price: string | number;
  min_price: string | number;
}

export enum TradingMethod {
  PancakePool = 8,
  BSCOrderBook = 2,
  BSCPool = 4,
}

// export interface TopTicker24h extends Ticker24h, Pair {
//   base_img?: any;
//   quote_img?: any;
//   pair_name: string;
//   highest?: number | string;
//   lowest?: number | string;
//   prev_price?: number | string;
// }
