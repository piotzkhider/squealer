<p align="center">
  <a href="https://github.com/piotzkhider/squealer">
    <img alt="squealer" src="hhttps://1.bp.blogspot.com/-yqSXdt2MNfA/V5YArqYC00I/AAAAAAAA8xQ/QLveQ6Riu1Ayel1Q9o-31OxQUJBG2Ld6QCLcB/s800/animal_hadaka_debanedumi_group.png" width="365px">
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
