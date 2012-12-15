function Scenario(name)
{
    var self = this;

    self.name            = name;
    self.startingBalance = 1000;
    self.periodStart     = new Date(2012, 0, 1);
    self.periodEnd       = new Date(2012, 2, 31);
}