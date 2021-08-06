import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform = (date: Date): string => {
    let newDate = new Date(date)
    let day = newDate.getDate()
    let year = newDate.getFullYear()
    let monthName = this.formatMonthName(newDate.toLocaleDateString(undefined, { month: 'short' }))
    let dateformatted = `${day} ${monthName} ${year}`
    return dateformatted
  }

  formatMonthName = (month: string): string => {
    let monthCapitalized = this.capitalize(month)
    return this.removeDotInTheEnd(monthCapitalized)
  }

  capitalize = (word: string): string => {
    return word[0].toUpperCase() + word.slice(1)
  }

  removeDotInTheEnd = (word: string): string => {
    let length = word.length
    return word.slice(0, length - 1);
  }

}
