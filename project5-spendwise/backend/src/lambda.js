const serverlessExpress = require('@codegenie/serverless-express');
const mongoose = require('mongoose');
const app = require('./app');

let serverlessExpressInstance;

async function setup() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false
    });
  }
  return serverlessExpress({ app });
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (!serverlessExpressInstance) {
    serverlessExpressInstance = await setup();
  }
  return serverlessExpressInstance(event, context);
};

