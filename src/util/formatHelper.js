import numeral from "numeral";
import moment from "moment";
require("numeral/locales/de");

numeral.locale("de");
numeral.localeData("de").delimiters.thousands = ".";

export const formatAmount = (number) => numeral(number).format("$0,0.00");

export const parseAmount = (amountString) => numeral(amountString).value();

export const formatDateTime = (date) => moment(date).format("DD.MM.YYYY HH:mm");
