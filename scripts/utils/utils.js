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

    return u;
}());