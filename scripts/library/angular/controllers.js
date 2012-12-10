function ListsCtrl($scope)
{
    $scope.mods = getBaseModifiers();

    $scope.scenario = new Scenario('main');

    $scope.accountBalance = getAccountBalanceByScenario($scope.scenario, $scope.mods);
    $scope.balanceRows = getAccountBalanceRows($scope.accountBalance);

    $scope.addBaseModifier = function()
    {
        var startDate = new Date(2012, 0, 1);
        var f2 = new Frequency(2, timeUnit.WEEK);   //'Every 2 weeks TODO: on Monday'
        var newBaseModifier = new BaseModifier({title:$scope.modName, modType:modifierType.WITHDRAWAL, amount:113,  frequency:f2, startDate:startDate, endDate:''});
        $scope.mods.push(newBaseModifier);
        $scope.accountBalance = getAccountBalanceByScenario($scope.scenario, $scope.mods);
        $scope.balanceRows = getAccountBalanceRows($scope.accountBalance);
        $scope.modName = '';
    };
}

function getAccountBalanceByScenario(scenario, baseModifiers)
{
    var result = getAccountBalance(scenario, baseModifiers);
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