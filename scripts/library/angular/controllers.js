function BaseModifiersList($scope)
{
    $scope.mods = getBaseModifiers();
}

function AccountModifiersList($scope)
{
    var scenario = new Scenario('main');
    var accountBalance;
    var accountModifiers;
    var accountModifier;
    var i, j;

    var sortedDateGroups;
    var accountBalanceRows = [];

    accountBalance = getAccountBalance(scenario);

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
            accountBalanceRows[accountBalanceRows.length] = {appliedDate:sortedDateGroups[i].dateGroupLabel, title:accountModifier.title, amount:accountModifier.getAmountValue(), formattedAmount:accountModifier.getFormattedAmount(), balance:accountModifier.balanceAfterModifier, formattedBalance:accountModifier.getFormattedBalanceAfterModifier()};
        }
    }

    $scope.accountBalance = accountBalance;
    $scope.balanceRows = accountBalanceRows;
}