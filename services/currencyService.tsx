import axios from 'axios';
import { currency } from 'configs'
export class currencyService<T> {
  constructor() {
    this.url = `${currency.url}?apikey=${currency.apiKey}&base_currency=${currency.base}`;
  }
  async initialize() {
    const currencyInfo = await axios.get(this.url);
    this.currencyData = currencyInfo.data.data;
  }
  getTotalFromItems(items: any[]) {
    if (!items) return 0;
    const total = items.reduce( (prev, current) => {
      return Number(prev) + (current.amount ? Number(current.amount) : 0);
    }, 0);
    return {MXN: total, USD: this.mxnToUsd(total)};
  }

  mxnToUsd (amount: number) {
    return this.currencyData.USD * amount;
  }
}