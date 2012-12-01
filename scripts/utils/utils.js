utils = (function(){
    var u = {};

    u.ensureTwoDigitNumber = function(number)
    {
        var result;
        result = (number < 10) ? '0' + number : number;
        return result;
    }

    return u;
}());