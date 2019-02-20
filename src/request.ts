import { APIGatewayProxyEvent } from 'aws-lambda';
import * as crypto from 'crypto';

export class Request {
  private readonly event;

  constructor(event: APIGatewayProxyEvent) {
    this.event = event;
  }

  verifySignature(): boolean {
    return this.headers['X-Hub-Signature'] === this.calculateSignature();
  }

  private calculateSignature(): string {
    const secret = process.env.GITHUB_WEBHOOK_SECRET;

    const calculated = crypto
      .createHmac('sha1', secret)
      .update(this.body, 'utf8')
      .digest('hex');

    return `sha1=${calculated}`;
  }

  private get body(): string | null {
    return this.event.body;
  }

  private get headers(): { [name: string]: string } {
    return this.event.headers;
  }

  get githubEvent() {
    return this.headers['X-GitHub-Event'];
  }

  get payload(): Payload {
    return JSON.parse(this.event.body);
  }
}

export interface Payload {
  //
}
