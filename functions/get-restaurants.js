const DocumentClient = require('aws-sdk/clients/dynamodb').DocumentClient
const DynamoDB = new DocumentClient()

const defaultResults = process.env.defaultResults || 8
const tableName = process.env.restaurants_table

const getRestaurants = async count => {
  console.log(`fetching ${count} restaurants from ${tableName}...`)

  const req = {
    TableName: tableName,
    Limit: count
  }

  const resp = await dynamodb.scan(req).promise()
  console.log(`found ${res.Items.length} restaurants`)

  return resp.Items
}

module.exports.handler = async(event, context) => {
  const restaurant = await getRestaurants(defaultRestaurants)
  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  }

  return response
}
