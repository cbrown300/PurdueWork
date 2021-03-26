var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
const tableName = "todolist-table";

var todolistHelper = function () { };
var docClient = new AWS.DynamoDB.DocumentClient();

/*  Adding To Do List   */
todolistHelper.prototype.addToDoList = (todoString, todoData, userID) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName,
            Item: {
              'todoData' : todoData,
              'todoString' : todoString,
              'userId': userID
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

/*  Getting To Do List  */
todolistHelper.prototype.getToDoLists = (userID, todoDataSearch) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: 'userId = :user_id',
            FilterExpression : '#todoData = :todoDataVal',
            ExpressionAttributeNames : {
                '#todoData' : 'todoData'
            },
            ExpressionAttributeValues: {
                ':user_id' : userID,
                ':todoDataVal' : todoDataSearch
            }
        }
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

/*  Removing To Do List  */
todolistHelper.prototype.removeToDoList = (todoStringSearch, userID) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName,
            Key: {
                'userId': userID,
                'todoString': todoStringSearch
            },
            ConditionExpression: "attribute_exists(todoString)"
        }
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(JSON.stringify(err, null, 2))
            }
            console.log(JSON.stringify(err));
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            resolve()
        })
    });
}
module.exports = new todolistHelper();