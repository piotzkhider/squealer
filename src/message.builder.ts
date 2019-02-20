import { IncomingWebhookSendArguments } from '@slack/client';
import { Payload, Request } from './request';

export default interface MessageBuilder {
  supports(request: Request): boolean;
  build(payload: Payload): Promise<IncomingWebhookSendArguments>;
}
