utils.date = (function(){
    var d = {};

    //TODO: support various formats using standard patterns (i.e. 'dd.MM.yyyy HH:mm:ss')
    d.format = function(date, format)
    {
        var VALUE_DELIMITER = '.';

        var dateValue  = date.getDate();
        var monthValue = date.getMonth() + 1; //Months are zero based
        var yearValue  = date.getFullYear();

        dateValue  = utils.ensureTwoDigitNumber(dateValue);
        monthValue = utils.ensureTwoDigitNumber(monthValue);
        yearValue  = utils.ensureTwoDigitNumber(yearValue);

        return dateValue + VALUE_DELIMITER + monthValue + VALUE_DELIMITER + yearValue;
    };

    d.getNextDate = function(date, frequency)
    {
        var result = null;
        var f = frequency;
        var numberOfDays = 0;

        switch (f.unit)
        {
            case timeUnit.ONCE : return null; break;
            case timeUnit.DAY  : numberOfDays = f.quantity; result = d.addDays(date, numberOfDays); break;
            case timeUnit.WEEK : numberOfDays = f.quantity * 7; result = d.addDays(date, numberOfDays); break;
            case timeUnit.MONTH: result = d.addMonths(date, f.quantity); break;
            case timeUnit.YEAR : result = d.addYears(date, f.quantity); break;
        }

        return result;

    };

    d.addDays = function(myDate, days)
    {
        return new Date(myDate.getTime() + days*24*60*60*1000);
    }
    d.addMonths = function(myDate, months)
    {
        var dateValue  = myDate.getDate();
        var monthValue = myDate.getMonth(); //Months are zero based
        var yearValue  = myDate.getFullYear();

        monthValue += months;

        return new Date(yearValue, monthValue, dateValue);
    }
    d.addYears = function(myDate, years)
    {
        var dateValue  = myDate.getDate();
        var monthValue = myDate.getMonth(); //Months are zero based
        var yearValue  = myDate.getFullYear();

        yearValue += years;

        return new Date(yearValue, monthValue, dateValue);
    }


    return d;
}());

