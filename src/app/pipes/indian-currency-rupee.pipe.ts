import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "indianCurrencyRupee",
  standalone: false,
})
export class IndianCurrencyRupeePipe implements PipeTransform {
  transform(value: number, currencySymbol: string = "₹"): string {
    if (value >= 10000000) {
      return `${currencySymbol}${(value / 10000000).toFixed(2)} Crores`;
    } else if (value >= 100000) {
      return `${currencySymbol}${(value / 100000).toFixed(2)} Lakhs`;
    } else {
      return `${currencySymbol}${value.toFixed(2)}`;
    }
  }
}
