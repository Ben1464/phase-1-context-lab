const createEmployeeRecord = function([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = function(employeeData) {
    return employeeData.map(createEmployeeRecord);
};

const createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
};

const createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
};

const hoursWorkedOnDate = function(date) {
    const inEvent = this.timeInEvents.find(e => e.date === date);
    const outEvent = this.timeOutEvents.find(e => e.date === date);
    return (outEvent.hour - inEvent.hour) / 100;
};

const wagesEarnedOnDate = function(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
};

const allWagesFor = function() {
    const eligibleDates = this.timeInEvents.map(function(e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);

    return payable;
};

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(rec => rec.firstName === firstName);
};

const calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce((memo, rec) => {
        return memo + allWagesFor.call(rec);
    }, 0);
};

