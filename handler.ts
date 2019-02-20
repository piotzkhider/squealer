import { APIGatewayProxyHandler } from 'aws-lambda';
import { MessageBuilderResolver } from './src/message.builder.resolver';
import { Request } from './src/request';
import { IncomingWebhook } from '@slack/client';

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
const resolver = new MessageBuilderResolver();

export const hello: APIGatewayProxyHandler = async event => {
  const request = new Request(event);

  if (!request.verifySignature()) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "X-Hub-Signature incorrect. Github webhook token doesn't match"
      })
    };
  }

  await resolver
    .resolve(request)
    .then(builders => {
      return Promise.all(builders.map(builder => builder.build(request.payload)));
    })
    .then(messages => {
      return Promise.all(messages.map(message => webhook.send(message)));
    })
    .catch(e => {
      console.log(e);
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'success!',
      input: event
    })
  };
};
