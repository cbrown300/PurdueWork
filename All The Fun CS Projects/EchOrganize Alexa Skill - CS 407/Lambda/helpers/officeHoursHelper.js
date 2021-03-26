var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
const tableName = "officeHours-table";

var officeHoursHelper = function () {};
var docClient = new AWS.DynamoDB.DocumentClient();

officeHoursHelper.prototype.saveNewOfficeHours = (className, dateCreated, dayOfWeek, Time, userID) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName,
            Item: {
                'userId': userID,
                'dateCreated': dateCreated,
                'dayOfWeek': dayOfWeek,
                'officeHoursTime': Time,
                'className': className
            }
        };
        docClient.put(params, (err, data) => {
            if (err) {
                console.log("Unable to insert =>", JSON.stringify(err));
                return reject("Unable to insert office hours");
            }
            console.log("Saved new office hours: ", JSON.stringify(data));
            resolve(data);
        });
    });
};
/*
examHelper.prototype.saveNewExam = (className, date, Time, userID) => {
    const dateCreated = new Date().toISOString();
    console.log('className: ' + className);
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName,
            Item: {
                'userId': userID,
                'dateCreated': dateCreated,
                'className': className,
                'examDate': date,
                'examTime': Time
            }
        };
        docClient.put(params, (err, data) => {
            if (err) {
                console.log("Unable to insert =>", JSON.stringify(err))
                return reject("Unable to insert");
            }
            console.log("Saved Data, ", JSON.stringify(data));
            resolve(data);
        });
    });
}
*/
const officeHoursInstance = {
    "className": "",
    "nextDate": "",
    "time": ""
};

officeHoursHelper.prototype.getOfficeHours = (userID, className) => {
    return new Promise((resolve, reject) => {
       var params = {
           ExpressionAttributeValues: {
               ':user_id': userID,
               ':class_name': className
           },
           KeyConditionExpression: 'userId = :user_id',
           FilterExpression: 'className = :class_name',
           ProjectionExpression: 'className, dayOfWeek, officeHoursTime',
           TableName: tableName
       };
       docClient.query(params, (err, data) => {
           if (err) {
               console.error("Unable to read office hours. Error JSON: ", JSON.stringify(err,null,2));
               return reject(JSON.stringify(err,null,2));
           }
           console.log("GetOfficeHours succeeded:", JSON.stringify(data,null,2));
           //console.log("DayOfWeek: ", JSON.stringify(data.Items.dayOfWeek,null,2));
           resolve(data.Items);
       })
    });
}
/*
examHelper.prototype.getExams = (userID) => {
    console.log('userID: ' + userID);
    return new Promise((resolve, reject) => {
        var params = {
            ExpressionAttributeValues: {
                ':user_id': userID,
            },
            KeyConditionExpression: 'userId = :user_id',
            ProjectionExpression: 'className, examDate, examTime',
            TableName: tableName
};
        docClient.query(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(JSON.stringify(err, null, 2))
            }
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            resolve(data.Items)
        })

    });
}

examHelper.prototype.getExamsByClass = (userID, ClassName) => {
    console.log('userID: ' + userID);
    console.log('ClassName: ' + ClassName);
    return new Promise((resolve, reject) => {
        var params = {
            ExpressionAttributeValues: {
                ':user_id': userID,
                ':class_Name': ClassName,
            },
            KeyConditionExpression: 'userId = :user_id',
            FilterExpression: 'className = :class_Name',
            ProjectionExpression: 'className, examDate, examTime',
            TableName: tableName
        };
        docClient.query(params, (err, data) => {
            if (err) {
                console.error("Unable to read item exams by class. Error JSON:", JSON.stringify(err, null, 2));
                return reject(JSON.stringify(err, null, 2))
            }
            console.log("GetExamsByClass succeeded: ", JSON.stringify(data, null,2));
            resolve(data.Items)
        })
    });
}*/

module.exports = new officeHoursHelper();