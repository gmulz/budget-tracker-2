export const getMonthStartEndFromDate = (date: Date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let startDate = new Date(year, month, 1);
    let lastDay = [9, 4, 6, 11].indexOf(month) !== -1 ? 30 : (month == 2 ? (year % 4 == 0 ? 29 : 28) : 31);
    let endDate = new Date(year, month, lastDay)
    return [startDate, endDate];
}

