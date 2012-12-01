function BaseModifiersList($scope)
{
    $scope.mods = getBaseModifiers();
}

function AccountModifiersList($scope)
{
    var scenario = new Scenario('main');

    $scope.mods = getAccountModifiers(scenario);
}