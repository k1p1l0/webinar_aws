'use strict';

console.log('Function is loading');

const AWS = require('aws-sdk');
const randomID = require("random-id");

const documentClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.table;

const putItem = ({name}) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: randomID(10),
            state: false,
            name
        }
    };

    return new Promise((resolve, reject) => {
        documentClient.put(params, function(err, data) {
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

    if (!event.name) 
        callback(null, 'NULL');

    const params = {
        name: event.name
    };

    putItem(params)
        .then((results) => {
            console.log(results);

            callback(null, 'OK');
        })
        .catch((error) => {
            console.log(error);

            callback(error);
        });
};