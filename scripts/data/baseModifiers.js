function BaseModifier(model)
{
    var self = this;

    self = model;
    self.getAmountValue = function()
    {
        var result = null;
        var multiplier = 1;

        if (self.amount > 0 && self.modType == modifierType.WITHDRAWAL)
        {
            multiplier =  -1;
        }

        result = (multiplier * self.amount);

        return result;
    }
    self.getFormattedAmount = function()
    {
        var result;

        //TODO: implement various currencies
        var currencySymbol = '$';

        result = currencySymbol + (self.amount).toFixed(2);

        if (self.getAmountValue() < 0)
        {
            result = '-' + result;
        }

        return result;
    };

    return self;
}

function getBaseModifiers()
{
    var models = getBaseModifiersData();
    var model;
    var baseModifier;
    var result = [];

    for (i = 0; i < models.length; i++)
    {
        model = models[i];
        baseModifier = new BaseModifier(model);
        result[i] = baseModifier;
    }

    return result;
}

function getBaseModifiersData()
{
    var f1 = new Frequency(1, timeUnit.MONTH);  // Every month TODO: on 1st
    var f2 = new Frequency(2, timeUnit.WEEK);   //'Every 2 weeks TODO: on Monday'
    var f3 = new Frequency(1, timeUnit.WEEK);   //'Every weeks TODO: on Monday'
    var f4 = new Frequency(2, timeUnit.DAY);   //'Every 2 days'
    var f5 = new Frequency(1, timeUnit.DAY);   //'Every day'
    var f6 = new Frequency(1, timeUnit.DAY);   //'Every day'

    var startDate = new Date(2012, 0, 1);

    var result = [
        {title:'Hole in a tree trunk (rent)', modType:modifierType.WITHDRAWAL, amount:100,  frequency:f1, startDate:startDate, endDate:''},
        {title:'Bag of nuts (salary)'       , modType:modifierType.DEPOSIT   , amount:200,  frequency:f2, startDate:startDate, endDate:''},
        {title:'Swinging (commuting)'       , modType:modifierType.WITHDRAWAL, amount:20, frequency:f3, startDate:startDate, endDate:''},
        {title:'Berries (eating out)'       , modType:modifierType.WITHDRAWAL, amount:5,    frequency:f4, startDate:startDate, endDate:''},
        {title:'Magic Potion (coffee)'      , modType:modifierType.WITHDRAWAL, amount:1,    frequency:f5, startDate:startDate, endDate:''},
        {title:'Watching Sunrise'           , modType:modifierType.WITHDRAWAL, amount:0,    frequency:f6, startDate:startDate, endDate:''}
    ];

    return result;
}