function Frequency(quantity, unitType)
{
    var self = this;

    self.unit = unitType;
    self.quantity = quantity;

    self.getDescription = function()
    {
        var result = '';
        if (self.unit != timeUnit.ONCE)
        {
            result = 'Every ';
            if (self.quantity == 1)
            {
                result += self.unit.singular;
            }
            else
            {
                result += self.quantity + ' ' + self.unit.plural;
            }
        }
        else
        {
            result = self.unit.name;
        }
        return result;
    }
}

var timeUnit =
{
    ONCE : {value:1, label:'once' , singular:'once' , plural:'once'  },
    DAY :  {value:2, label:'day(s)'  , singular:'day'  , plural:'days'  },
    WEEK : {value:3, label:'week(s)' , singular:'week' , plural:'weeks' },
    MONTH: {value:4, label:'month(s)', singular:'month', plural:'months'},
    YEAR:  {value:5, label:'year(s)' , singular:'year' , plural:'years' }
};
