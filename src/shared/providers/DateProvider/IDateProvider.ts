export interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): Number;
  convertToUTC(date: Date): String;
  compareDateIfSameDays(
    devolutionDate: Date,
    expected_return_date: Date
  ): number;
}
