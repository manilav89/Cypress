//////
import dayjs from 'dayjs'
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);

class dateCalculations {
    getTodaysDate() {
        const todayDate = dayjs().format('YYYY-MM-DD');
        cy.log("todayDate" + todayDate)
        return todayDate;
    }

    
    getNumberOfdaysForGivenMonth(date,format) {
        var formattedDate = dayjs.format(date,format)
        var numberOfDays = dayjs(formattedDate).daysInMonth()
        console.log("numberOfDays" + numberOfDays);
    }

    getEndDate() {
        var endMonth = dayjs().endOf
        console.log("endMonth" + endMonth);
    }

    getDateDifference(date1, date2) {
        const datediff = dayjs(date2)
        const dateDifference = datediff.diff(date1, 'days')
        console.log("dateDifference" + dateDifference)
        return dateDifference;
    }


    getNextMonthEndDate(currentStartDate) {
        var nextMonth = dayjs(currentStartDate).add(1, 'M').format('YYYY-MM-DD');//date to string 
        cy.log("next month end date",nextMonth)
        var month = dayjs(nextMonth).month(); // gets the month for given date
        var days = dayjs(nextMonth).date();// gets the day for the given date
        month = month + 1;
        if (month === 2 && days >= 27) {
            var actualEndDate = dayjs(nextMonth).format('YYYY-MM-DD');
            cy.log("actualEndDate",actualEndDate)

        }
        else {
            var actualEndDate = dayjs(nextMonth).subtract(1, 'd').format('YYYY-MM-DD');
            cy.log("actualEndDate",actualEndDate)
            
        }
        return actualEndDate;

    }

    getNextMonthStartDate(endDateOfPreviousMonth) {

        const nextMonthStartDate = dayjs(endDateOfPreviousMonth).add(1, 'd').format('YYYY-MM-DD');
        cy.log("nextMonthStartDate" + nextMonthStartDate)
        return nextMonthStartDate;

    }

}
export const fromdatecalculationspage = new dateCalculations()
