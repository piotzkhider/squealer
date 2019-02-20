import MessageBuilder from './message.builder';
import { Request } from './request';
import { Public } from './builders/public';

export class MessageBuilderResolver {
  private messages: MessageBuilder[] = [new Public()];

  async resolve(request: Request): Promise<MessageBuilder[]> {
    return this.messages.filter(message => message.supports(request));
  }
}
