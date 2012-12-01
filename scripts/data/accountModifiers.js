function AccountModifier(model)
{
    var self = this;

    //self.id = utils.getGUID();

    /* clone properties */
    self.title     = model.title;
    self.modType   = model.modType;
    self.amount    = model.amount;
    self.frequency = model.frequency;
    self.startDate = model.startDate;
    self.endDate   = model.endDate;

    /* clone functions */
    self.getAmountValue     = model.getAmountValue;
    self.getFormattedAmount = model.getFormattedAmount;



    self.balanceAfterModifier = null;
    self.getFormattedBalanceAfterModifier = function()
    {
        var result = '-';

        //TODO: implement currencies
        var currencySymbol = '$';

        if (self.balanceAfterModifier != null)
        {
            result = currencySymbol + Math.abs(self.balanceAfterModifier).toFixed(2);
            if (self.balanceAfterModifier < 0)
            {
                result = '-' + result;
            }
        }

        return result;
    };

    self.getFormattedDate = function()
    {
        return utils.date.format(self.startDate, 'dd.mm.yyyy');
    };

    return self;
}

function getAccountModifiers(scenario)
{
    var accountBalance;
    var result;
    accountBalance = generateAccountModifiers(scenario);

    //result = accountBalance.dateGroups;
    result = accountBalance;
    return result;
}

function generateAccountModifiers(scenario)
{
    var baseModifiers = getBaseModifiers();
    var baseModifier;
    var accountModifier;
    var result = new AccountBalance();
    var i, j;

    for (i = 0; i < 3; i++)
    {
        for (j = 0; j < baseModifiers.length; j++)
        {
            baseModifier = baseModifiers[j];
            accountModifier = new AccountModifier(baseModifier);
            result.addModifier(accountModifier);
        }
    }

    return result;
}
