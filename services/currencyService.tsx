
export class currencyService {
  static getTotalFromItems(items: any[]) {
    if (!items) return 0;
    const total = items.reduce( (prev, current) => {
      console.log(current)
      return Number(prev) + (current.amount ? Number(current.amount) : 0);
    }, 0);
    return total;
  }
}