function AccountBalance()
{
    var self = this;
    self.dateGroups = [];
    self.currentBalance = 1000; //TODO: get initial value from text input (user provided)

    self.addModifier = function(accountModifier)
    {
        /* updated current balance and balance after modifier */
        self.currentBalance = self.currentBalance + accountModifier.getAmountValue();
        accountModifier.balanceAfterModifier = self.currentBalance;

        /* add account balance to the list */
        self.dateGroups[self.dateGroups.length] = accountModifier;
    };

    return self;
}

function AccountModifier(model)
{
    var self = this;

    self = model;
    self.balanceAfterModifier = null;
    self.getFormattedBalanceAfterModifier = function()
    {
        var result = '-';

        //TODO: implement currencies
        var currencySymbol = '$';

        if (self.balanceAfterModifier != null)
        {
            result = currencySymbol + self.balanceAfterModifier.toFixed(2);
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

    result = accountBalance.dateGroups;
    return result;
}

function generateAccountModifiers(scenario)
{
    var baseModifiers = getBaseModifiers();
    var baseModifier;
    var accountModifier;
    var result = new AccountBalance();
    var i;

    for (i = 0; i < baseModifiers.length; i++)
    {
        baseModifier = baseModifiers[i];
        accountModifier = new AccountModifier(baseModifier);
        result.addModifier(accountModifier);
    }

    for (i = 0; i < baseModifiers.length; i++)
    {
        baseModifier = baseModifiers[i];
        accountModifier = new AccountModifier(baseModifier);
        result.addModifier(accountModifier);
    }

    return result;
}
