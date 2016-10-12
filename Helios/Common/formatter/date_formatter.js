const DATE_DELIMITER = '/';
const TIME_DELIMITER = ':';

class DateFormatter {

    format(date) {
        let formattedDate = this._getFormattedDate(date);
        let formattedTime = this._getFormattedTime(date);

        return formattedDate + ' ' + formattedTime;
    }

    _getFormattedDate (date) {
        let year = this._getYear(date);
        let month = this._getMonth(date);
        let day = this._getDay(date);

        return year + DATE_DELIMITER + month + DATE_DELIMITER + day;
    }

    _getFormattedTime(date) {
        let hours = this._getHours(date);
        let minutes = this._getMinutes(date);
        let seconds = this._getSeconds(date);

        return hours + TIME_DELIMITER + minutes + TIME_DELIMITER + seconds;
    }

    _getYear(date) {
        return this._addLeadingZero(date.getUTCFullYear());
    }

    _getMonth(date) {
        let month = date.getMonth() + 1;
        return this._addLeadingZero(month);
    }

    _getDay(date) {
        return this._addLeadingZero(date.getDate());
    }

     _getHours(date) {
         return this._addLeadingZero(date.getHours());
     }

     _getMinutes(date) {
         return this._addLeadingZero(date.getMinutes());
     }

    _getSeconds(date) {
        return this._addLeadingZero(date.getSeconds());
    }

    _addLeadingZero(value) {
        return (value < 10) ? ('0' + value) : value;
    }
}

module.exports = new DateFormatter();