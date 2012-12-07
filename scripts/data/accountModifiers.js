function AccountModifier(model, appliedDate)
{
    var self = this;

    //self.id = utils.getGUID();

    /* map properties onto AccountModifier (clone) */
    self.title     = model.title;
    self.modType   = model.modType;
    self.amount    = model.amount;
    self.frequency = model.frequency;
    self.startDate = model.startDate;
    self.endDate   = model.endDate;
    self.appliedDate = appliedDate;

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
        return utils.date.format(self.appliedDate, 'dd.mm.yyyy');
    };

    return self;
}

function getAccountBalance(scenario)
{
    var result;

    result = generateAccountModifiers(scenario);

    return result;
}

function generateAccountModifiers(scenario)
{
    var baseModifiers = getBaseModifiers();
    var baseModifier;
    var accountModifier;
    var result = new AccountBalance();
    var i, j;
    var appliedDate = null;

    var scenarioStartDate = new Date(2012, 0, 1);   //TODO: get value off method argument (scenario)
    var scenarioEndDate   = new Date(2012, 1, 1);   //TODO: get value off method argument (scenario)

    /* generate account balance modifiers */
    for (j = 0; j < baseModifiers.length; j++)
    {
        baseModifier = baseModifiers[j];

        appliedDate = baseModifier.startDate;
        while (appliedDate != null && appliedDate.getTime() >= scenarioStartDate.getTime() && appliedDate.getTime() <= scenarioEndDate.getTime())
        {
            accountModifier = new AccountModifier(baseModifier, appliedDate);
            result.addModifier(accountModifier);

            appliedDate = utils.date.getNextDate(appliedDate, baseModifier.frequency);
        }
    }

    return result;
}
