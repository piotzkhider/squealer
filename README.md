<p align="center">
  <a href="https://github.com/piotzkhider/squealer">
    <img alt="squealer" src="https://user-images.githubusercontent.com/7950487/53112096-d6a98d00-3581-11e9-8118-d7b05dbe55a6.png" width="365px">
  </a>
</p>

<h2 align="center">
  squealer - A squealer who squeals on you.
</h2>

## Quick Start

1. Install via yarn:

```sh
yarn
```

2. Set-up:

serverless.yml

```yml
provider:
  ...
  environment:
    GITHUB_ACCESS_TOKEN: your_access_token123
    GITHUB_WEBHOOK_SECRET: your_webhook_secret456
    SLACK_WEBHOOK_URL: https://hooks.slack.com/services/XXXXXXXX/XXXXXXXXXXXX
```

src/builders/public.ts

```ts
      channel: 'SLACKCHANNELID',
```

3. Deploy a Service:

```sh
sls deploy -v
```
