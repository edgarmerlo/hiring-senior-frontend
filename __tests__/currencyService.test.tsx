import { currencyService } from '../services/currencyService';

describe('Currency service', () => {
  it('should retrive the USD convertion', async () => {
    const currency = new currencyService();
    await currency.initialize();
    expect(currency.currencyData.USD).toBeDefined();
  });

  it('Chould calculate total in MXN and USD', async () => {
    const currency = new currencyService();
    await currency.initialize();
    const total = currency.getTotalFromItems([{amount: 100},{ amount: 50}])
    expect(total.MXN).toBe(150);
    expect(total.USD).toBeGreaterThan(0);
  })
})