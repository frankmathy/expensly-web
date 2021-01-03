import numeral from 'numeral';
import firebase from 'firebase';
import moment from 'moment';
require('numeral/locales/de');

numeral.locale('de');
numeral.localeData('de').delimiters.thousands = '.';

export const formatAmount = number => numeral(number).format('$0,0.00');

export const parseAmount = amountString => numeral(amountString).value();

export const formatDateTime = date =>
  moment(makeDate(date)).format('DD.MM.YYYY HH:mm');

export const makeDate = date =>
  moment.isMoment(date) || date instanceof firebase.firestore.Timestamp
    ? date.toDate()
    : date;
