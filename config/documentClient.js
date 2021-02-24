const AWS = require('aws-sdk')

AWS.config.region = process.env.AWS_REGION;
AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const documentClient = new AWS.DynamoDB.DocumentClient()

module.exports = documentClient