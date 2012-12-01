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
    }

    return d;
}());

