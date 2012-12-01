function BaseModifiersList($scope)
{
    $scope.mods = getBaseModifiers();
}

function AccountModifiersList($scope)
{
    var scenario = new Scenario('main');

    $scope.accMods = getAccountModifiers(scenario).dateGroups;
    $scope.accountBalance = getAccountModifiers(scenario);
}