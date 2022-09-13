import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): String {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date): Number {
    const convertedHourStartTime = String(this.convertToUTC(start_date));
    const convertedHourEndTime = String(this.convertToUTC(end_date));
    return dayjs(convertedHourEndTime).diff(convertedHourStartTime, "hours");
  }
}
