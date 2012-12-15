function AccountBalance()
{
    var self = this;
    self.dateGroups = [];
    self.startDate = new Date(2012, 0, 1);
    self.startingBalance = 1000; //TODO: get initial value from text input (user provided)
    self.currentBalance = 1000;

    self.addModifier = function(accountModifier)
    {
        var existingGroup = null;
        var i = 0;

        /* updated current balance and balance after modifier */
//        self.currentBalance = self.currentBalance + accountModifier.getAmountValue();
//        accountModifier.balanceAfterModifier = self.currentBalance;

        /* try to find dateModGroup by date */
        for (i = 0; i < self.dateGroups.length; i++)
        {
            var group = self.dateGroups[i];
            if (group.dateGroupLabel == utils.date.format(accountModifier.appliedDate, null))
            {
                existingGroup = self.dateGroups[i];
                i = self.dateGroups.length; //force end of FOR loop
            }
        }

        if (existingGroup != null)
        {
            /* if found, add accountModifier to it */
            existingGroup.addAccountModifier(accountModifier);
        }
        else
        {
            /* if not found, create new group, add accountModifier to group and add group to dateGroups */
            existingGroup = new AccountModDateGroup(accountModifier.appliedDate);
            existingGroup.addAccountModifier(accountModifier);
            self.dateGroups[self.dateGroups.length] = existingGroup;
        }
    };

    self.getFormattedStartingDate = function()
    {
        return utils.date.format(self.startDate, null);
    };

    self.getFormattedStartingBalance = function()
    {
        return self.startingBalance.toFixed(2);
    };

    return self;
}

function AccountModDateGroup(date)
{
    var self = this;
    self.dateGroupLabel = utils.date.format(date, null);
    self.dateGroupSort = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    self.accountModifiers = [];

    self.addAccountModifier = function(accountModifier)
    {
        self.accountModifiers[self.accountModifiers.length] = accountModifier;
    }

    return self;
}

function getAccountBalanceByScenario(scenario, baseModifiers)
{
    var result = getAccountBalance(scenario, baseModifiers);
    return result;
}