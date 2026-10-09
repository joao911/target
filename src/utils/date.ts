import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { isEmpty } from "lodash";

/**
 * This validates the date object and returns a correct date object if needed
 *
 * @param {any} any - date object
 * @returns correct date object
 */
const normalizeDateFormat = (date: any): Date => {
  let currentDate: any = date;

  // check if date comes with format: /Date(1626145200000)/
  if (!isEmpty(currentDate) && currentDate?.includes("Date")) {
    // regex to extract the numbers from date
    const time = /\/Date\((\d*)\)\//.exec(currentDate)?.[1];

    // create a new Date with the numbers extracted from JSON
    currentDate = new Date(+time!);
  }

  // check if date comes as string return a Date
  if (typeof currentDate === "string") {
    return parseISO(currentDate);
  } else {
    return currentDate;
  }
};

const toDayMonthYear = (date: Date | string | null | undefined) => {
  if (date) {
    return format(normalizeDateFormat(date), "dd/MM/yyyy").toString();
  }
  return "";
};

const toMonthYear = (date: Date | string | null | undefined) => {
  if (date) {
    return format(normalizeDateFormat(date), "MM/yyyy").toString();
  }
  return "";
};

const toHourMinute = (date: Date | string | null | undefined) => {
  if (date) {
    return format(normalizeDateFormat(date), "HH:mm").toString();
  }
  return "";
};

const formatDateWithHour = (date: Date | string | null | undefined) => {
  if (date) {
    return format(normalizeDateFormat(date), "dd/MM/yyyy 'às' HH:mm", {
      locale: ptBR,
    });
  }
  return "";
};

/**
 * This functions takes two dates as parameter and return de minutes between them
 *
 * @param {Date} Date - date object
 * @param {Date} Date - date object
 * @returns {number} current diff minutes from given dates
 */

const getMinutesBetweenDates = (startDate: Date, endDate: Date) => {
  const diff = endDate.getTime() - startDate.getTime();
  return diff / 60000;
};

const datesHelper = {
  toMonthYear,
  toHourMinute,
  toDayMonthYear,
  formatDateWithHour,
  getMinutesBetweenDates,
};

export default datesHelper;
