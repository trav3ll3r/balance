/* ************************************* */
/* *** BASE MODIFIER LIST CONTROLLER *** */
/* ************************************* */
function BaseModifierListCtrl($scope, $rootScope)
{
    $rootScope.baseModifiers = getBaseModifiers();
    $scope.mods = $rootScope.baseModifiers

    /* catch and handle 'baseModifierCreated' event */
    $rootScope.$on('baseModifierCreated', function(event, args)
    {
        var newBaseModifier = args.elem;
        $rootScope.baseModifiers.push(newBaseModifier);
    });
}
// Explicitly inject stuff. This is optional unless you plan on minifying the code.
BaseModifierListCtrl.$inject = ['$scope', '$rootScope'];

/* ************************************ */
/* *** ACCOUNT FORECAST LIST CONTROLLER *** */
/* ************************************ */
function AccountForecastCtrl($scope, $rootScope)
{
    $rootScope.$on('scenarioUpdated', function(event, args)
    {
        var _scenario = args.scenario;
        var _baseMods = $rootScope.baseModifiers;
        $scope.accountBalance = getAccountBalanceByScenario(_scenario, _baseMods);
        $scope.balanceRows    = getAccountBalanceRows($scope.accountBalance);
    });
}
// Explicitly inject stuff. This is optional unless you plan on minifying the code.
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

/* *********************************** */
/* ******* SCENARIO CONTROLLER ******* */
/* *********************************** */
function ScenarioCtrl($scope, $rootScope)
{
    var _scenario = new Scenario('main');
    _scenario.startingBalance = 5000;

    $scope.scenario = _scenario;

    $scope.update = function()
    {
        console.log('scenarioUpdated');

        /* emit 'scenarioUpdated' event */
        $rootScope.$emit('scenarioUpdated', {scenario:$scope.scenario});
    }
}
// Explicitly inject stuff. This is optional unless you plan on minifying the code.
ScenarioCtrl.$inject = ['$scope', '$rootScope'];