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

function getAccountBalance(scenario, baseModifiers)
{
    var result = generateAccountModifiers(scenario, baseModifiers);
    return result;
}

function generateAccountModifiers(scenario, baseModifiers)
{
    var baseModifier;
    var accountModifier;
    var result = new AccountBalance(scenario);
    var i, j;
    var appliedDate = null;

    var scenarioStartDate = scenario.periodStart;
    var scenarioEndDate   = scenario.periodEnd;

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

function getAccountBalanceRows(accountBalance)
{
    var result = [];
    var i, j;
    var sortedDateGroups;
    var accountModifiers;
    var accountModifier;

    sortedDateGroups = accountBalance.dateGroups.sort(utils.dynamicSort("dateGroupSort"));

    for (i = 0; i < sortedDateGroups.length; i++)
    {
        accountModifiers = sortedDateGroups[i].accountModifiers;
        for(j = 0; j < accountModifiers.length; j++)
        {
            accountModifier = accountModifiers[j];
            accountBalance.currentBalance = accountBalance.currentBalance + accountModifier.getAmountValue();
            accountModifier.balanceAfterModifier = accountBalance.currentBalance;
            //TODO; create model for accountBalanceRow
            result[result.length] = {appliedDate:sortedDateGroups[i].dateGroupLabel, title:accountModifier.title, amount:accountModifier.getAmountValue(), formattedAmount:accountModifier.getFormattedAmount(), balance:accountModifier.balanceAfterModifier, formattedBalance:accountModifier.getFormattedBalanceAfterModifier()};
        }
    }

    return result;
}