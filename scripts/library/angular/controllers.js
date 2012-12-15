/* ************************************* */
/* *** BASE MODIFIER LIST CONTROLLER *** */
/* ************************************* */
function BaseModifierListCtrl($scope, $rootScope)
{
    $scope.mods = getBaseModifiers();

    $rootScope.$on('baseModifierCreated', function(event, args)
    {
        var newBaseModifier = args.elem;
        $scope.mods.push(newBaseModifier);
        $rootScope.$emit('baseModifiersListUpdated',{mods:$scope.mods});
    });

    /* emit 'baseModifiersListUpdated' event */
    $rootScope.$emit('baseModifiersListUpdated',{mods:$scope.mods});
}
// Explicitly inject stuff. This is optional unless you plan on minifying the code.
BaseModifierListCtrl.$inject = ['$scope', '$rootScope'];

/* ************************************ */
/* *** ACCOUNT FORECAST LIST CONTROLLER *** */
/* ************************************ */
function AccountForecastCtrl($scope, $rootScope)
{
    $scope.scenario = new Scenario('main');

    $rootScope.$on('baseModifiersListUpdated', function(event, args)
    {
        var baseMods = args.mods;
        $scope.accountBalance = getAccountBalanceByScenario($scope.scenario, baseMods);
        $scope.balanceRows    = getAccountBalanceRows($scope.accountBalance);
    });
}
AccountForecastCtrl.$inject = ['$scope', '$rootScope'];

/* ************************************ */
/* *** NEW BASE MODIFIER CONTROLLER *** */
/* ************************************ */
function NewBaseModCtrl($scope, $rootScope)
{
    $scope.modifierTypes = [modifierType.DEPOSIT, modifierType.WITHDRAWAL];
    $scope.modifierType  = $scope.modifierTypes[1];

    $scope.freqUnits = [timeUnit.ONCE, timeUnit.DAY, timeUnit.WEEK, timeUnit.MONTH, timeUnit.YEAR];
    $scope.modFrequencyType = $scope.freqUnits[3];

    $scope.modFrequencyOccurrence = 1;

    $scope.create = function()
    {
        var _modTitle  = $scope.modTitle;
        var _modAmount = parseFloat($scope.modAmount);
        var _startDate = new Date(2012, 0, 1);
        var _freqType  = $scope.modFrequencyType;
        var _freq      = new Frequency(parseInt($scope.modFrequencyOccurrence), _freqType);   //'Every 2 weeks TODO: on Monday'
        var _modType   = $scope.modifierType;

        var newBaseModifier = new BaseModifier({title:_modTitle, modType:_modType, amount:_modAmount, frequency:_freq, startDate:_startDate, endDate:''});

        /* emit 'baseModifierCreated' event */
        $rootScope.$emit('baseModifierCreated', {elem:newBaseModifier});
    };
}
// Explicitly inject stuff. This is optional unless you plan on minifying the code.
NewBaseModCtrl.$inject = ['$scope', '$rootScope'];