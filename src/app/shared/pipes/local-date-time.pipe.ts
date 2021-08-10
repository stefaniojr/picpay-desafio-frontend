import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "localDateTime",
})
export class LocalDateTimePipe implements PipeTransform {
  transform(date: string): string {
    let formatedDate: moment.Moment = moment(date, "YYYY-MM-DDTHH:mm:ss");

    return formatedDate.format("DD MMM YYYY HH:mm A");
  }
}
