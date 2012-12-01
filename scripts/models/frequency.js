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
    ONCE : {value:0, singular:'once' , plural:'once'  },
    DAY :  {value:1, singular:'day'  , plural:'days'  },
    WEEK : {value:2, singular:'week' , plural:'weeks' },
    MONTH: {value:3, singular:'month', plural:'months'},
    YEAR:  {value:4, singular:'year' , plural:'years' }
};
