balance.scenario = (function(){
    var s = {};
    s.name = '';
    s.periodStart = '';
    s.periodEnd = '';

    return s;
}());

function BalanceModifier(label, amount)
{
    var self = this;

    self.label = label;
    self.amount = amount;
    self.isExpense = false;
}