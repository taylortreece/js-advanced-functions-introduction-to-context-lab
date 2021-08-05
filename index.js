function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    let records = []
    for(const array of arrays) {
        records.push(createEmployeeRecord(array))
    }
    return records
}

function createTimeInEvent(record,timeStamp) {
    let hourAndDate = timeStamp.split(" ");
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hourAndDate[1]),
        date: hourAndDate[0]
    }
    record.timeInEvents.push(timeInEvent)
    return record
}

function createTimeOutEvent(record,timeStamp) {
    let hourAndDate = timeStamp.split(" ");
    let timeInEvent = {
        type: "TimeOut",
        hour: parseInt(hourAndDate[1]),
        date: hourAndDate[0]
    }
    record.timeOutEvents.push(timeInEvent)
    return record
}

function hoursWorkedOnDate(record, date) {
    let clockIn = record.timeInEvents.filter((e) => {
        return date === e.date
    })[0]

    let clockOut = record.timeOutEvents.filter((e) => {
        return date === e.date
    })[0]

    return (clockOut.hour - clockIn.hour) / 100
}

function wagesEarnedOnDate(record, date) {
    return record.payPerHour * hoursWorkedOnDate(record, date)
}

function allWagesFor(record, dates) {
    let wagesArray = record.timeInEvents.map(x =>  wagesEarnedOnDate(record, x.date))
    return addWages(wagesArray)
}

function calculatePayroll(records, date) {
    let wagesArray = records.map(x => allWagesFor(x, date))
    return addWages(wagesArray)
}

// my helpers

function addWages(wages) {
    return wages.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    })
}

function findEmployeeByFirstName(records, name) {
    let employee = records.filter((e) => {
        return name === e.firstName
    })[0]
    return employee
}