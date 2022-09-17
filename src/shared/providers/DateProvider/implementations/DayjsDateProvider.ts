import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  addMin(minutes: number): Date {
    return dayjs().add(minutes, "minutes").toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  compareDateIfSameDays(
    devolution_date: Date,
    expected_return_date: Date
  ): number {
    return (
      dayjs(devolution_date).get("D") - dayjs(expected_return_date).get("D")
    );
  }

  convertToUTC(date: Date): String {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date): Number {
    const convertedHourStartTime = String(this.convertToUTC(start_date));
    const convertedHourEndTime = String(this.convertToUTC(end_date));
    return dayjs(convertedHourEndTime).diff(convertedHourStartTime, "hours");
  }
}
