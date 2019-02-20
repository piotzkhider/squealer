import MessageBuilder from '../message.builder';
import { IncomingWebhookSendArguments } from '@slack/client';
import * as Octkit from '@octokit/rest';
import { Request, Payload as BasePayload } from '../request';

const octokit = new Octkit({
  auth: `token ${process.env.GITHUB_ACCESS_TOKEN}`
});

export class Public implements MessageBuilder {
  supports(request: Request): boolean {
    if (request.githubEvent === 'repository') {
      return Public.isCreatePublicOrPublicized(request.payload as Payload);
    }

    return false;
  }

  async build(payload: Payload): Promise<IncomingWebhookSendArguments> {
    const repository = payload.repository;
    const sender = payload.sender;

    const res = await octokit.users.getByUsername({ username: sender.login });
    const user = res.data;

    return {
      channel: '<notified_channel_id>',
      text: `${repository.full_name} is now public!`,
      attachments: [
        {
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*<${repository.html_url}|${repository.full_name}>*`
              },
              fields: [
                {
                  type: 'mrkdwn',
                  text: `*Description:*\n${repository.description}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Created at:*\n${repository.created_at}`
                }
              ]
            }
          ],
          color: '#cb2431'
        },
        {
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*<${sender.html_url}|${sender.login}>*`
              },
              fields: [
                {
                  type: 'mrkdwn',
                  text: `*Login:*\n${sender.login}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Email:*\n${user.email}`
                }
              ],
              accessory: {
                type: 'image',
                image_url: sender.avatar_url,
                alt_text: sender.login
              }
            }
          ],
          color: '#cb2431'
        }
      ]
    };
  }

  private static isCreatePublicOrPublicized(payload: Payload): boolean {
    if (payload.action === 'publicized') {
      return true;
    }

    return payload.action === 'created' && !payload.repository.private;
  }
}

interface Payload extends BasePayload {
  action: string;
  repository: {
    full_name: string;
    private: boolean;
    html_url: string;
    description: string;
    created_at: string;
  };
  sender: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}
