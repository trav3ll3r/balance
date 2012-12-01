function AccountBalance()
{
    var self = this;
    self.dateGroups = [];
    self.startDate = new Date(2012, 0, 1);
    self.startingBalance = 1000; //TODO: get initial value from text input (user provided)
    self.currentBalance = 1000;

    self.addModifier = function(accountModifier)
    {
        /* updated current balance and balance after modifier */
        self.currentBalance = self.currentBalance + accountModifier.getAmountValue();
        accountModifier.balanceAfterModifier = self.currentBalance;

        /* add account balance to the list */
        self.dateGroups[self.dateGroups.length] = accountModifier;
    };

    self.getFormattedStartingDate = function()
    {
        return utils.date.format(self.startDate, null);
    }

    self.getFormattedStartingBalance = function()
    {
        return self.startingBalance.toFixed(2);
    }

    return self;
}