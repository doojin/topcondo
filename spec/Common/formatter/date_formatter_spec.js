let dateFormatter = require('../../../Helios/Common/formatter/date_formatter');

describe('dateFormatter', () => {

    let date;

    beforeEach(() => date = new Date(1991, 2, 21, 21, 40, 15));

    it('format should format date', () => {
        expect(dateFormatter.format(date)).toEqual('1991/03/21 21:40:15');
    });

    it('_getYear should return year', () => {
        expect(dateFormatter._getYear(date)).toEqual(1991);
    });

    it('_getMonth should return month with leading zero', () => {
        expect(dateFormatter._getMonth(date)).toEqual('03');
    });

    it('_getMonth should return month without leading zero', () => {
        date = new Date(1991, 11, 21, 21, 40, 15);
        expect(dateFormatter._getMonth(date)).toEqual(12);
    });

    it('_getDay should return day with leading zero', () => {
        date = new Date(1991, 2, 3, 21, 40, 15);
        expect(dateFormatter._getDay(date)).toEqual('03');
    });

    it('_getDay should return day without leading zero', () => {
        expect(dateFormatter._getDay(date)).toEqual(21);
    });

    it('_getHours should return hours with leading zero', () => {
        date = new Date(1991, 2, 21, 5, 40, 15);
        expect(dateFormatter._getHours(date)).toEqual('05');
    });

    it('_getHours should return hours without leading zero', () => {
        expect(dateFormatter._getHours(date)).toEqual(21);
    });

    it('_getMinutes should return minutes with leading zero', () => {
        date = new Date(1991, 2, 21, 21, 6, 15);
        expect(dateFormatter._getMinutes(date)).toEqual('06');
    });

    it('_getMinutes should return minutes without leading zero', () => {
        expect(dateFormatter._getMinutes(date)).toEqual(40);
    });

    it('_getSeconds should return seconds with leading zero', () => {
        date = new Date(1991, 2, 21, 21, 40, 7);
        expect(dateFormatter._getSeconds(date)).toEqual('07');
    });

    it('_getSeconds should return seconds without leading zero', () => {
        expect(dateFormatter._getSeconds(date)).toEqual(15);
    });

    it('_addLeadingZero should add zero symbol for numbers which are less than 10', () => {
        expect(dateFormatter._addLeadingZero(9)).toEqual('09');
    });

    it('_addLeadingZero should not add zero symbol for numbers which are greater or equal to 10', () => {
        expect(dateFormatter._addLeadingZero(10)).toEqual(10);
        expect(dateFormatter._addLeadingZero(11)).toEqual(11);
    });

    it('_getFormattedDate should return formatted date', () => {
        expect(dateFormatter._getFormattedDate(date)).toEqual('1991/03/21');
    });

    it('_getFormattedTime should return formatted time', () => {
        expect(dateFormatter._getFormattedTime(date)).toEqual('21:40:15');
    });
});