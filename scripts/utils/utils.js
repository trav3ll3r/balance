utils = (function(){
    var u = {};

    u.ensureTwoDigitNumber = function(number)
    {
        var result;
        result = (number < 10) ? '0' + number : number;
        return result;
    };

    u.getGUID = function()
    {
        var S4 = function ()
        {
            return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);
        };

        return (
            S4() + S4() + "-" +
                S4() + "-" +
                S4() + "-" +
                S4() + "-" +
                S4() + S4() + S4()
            );

    };

    u.dynamicSort = function(property)
    {
        return function (a, b)
        {
            return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        };
    };

    u.getModifierType = function(modType)
    {
        switch (modType)
        {
            case "DEPOSIT"   : return modifierType.DEPOSIT   ; break;
            case "WITHDRAWAL": return modifierType.WITHDRAWAL; break;
            case "TRANSFER"  : return modifierType.TRANSFER  ; break;
        }
    };

    u.getFrequencyType = function(frequencyType)
    {
        switch (frequencyType)
        {
            case 0: return timeUnit.ONCE ; break;
            case 1: return timeUnit.DAY  ; break;
            case 2: return timeUnit.WEEK ; break;
            case 3: return timeUnit.MONTH; break;
            case 4: return timeUnit.YEAR ; break;

        }
    };

    return u;
}());