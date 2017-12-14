'use strict';

const AWS = require('aws-sdk');

// const dynamodb = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.table;

const scanTable = () => {
    const params = {
        TableName: TABLE_NAME
    };

    return new Promise((resolve, reject) => {
        documentClient.scan(params, function(err, data) {
            if (err) {
                console.log(err);

                reject(err);
            }
            
            resolve(data);
         });
    });
};

module.exports.handler = (event, context, callback) => {
    console.log(event);

    scanTable()
        .then((result) => {
            console.log(result);

            callback(null, result);
        })
        .catch((err) => {  
            console.error(err);

            callback(err);
        });
};