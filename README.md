# line-bot-sdk-web

A LINE bot sdk for browser in favor with `https://lds-api-playground.line-apps.com/call/generic` endpoint.

## Installing

Using npm:

```bash
$ npm install line-bot-sdk-web
```

Using yarn:

```bash
$ yarn add line-bot-sdk-web
```

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/axios@0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/qs@6/dist/qs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/line-bot-sdk-web/dist/linebot.js"></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/axios@0/dist/axios.min.js"></script>
<script src="https://unpkg.com/lodash@4/lodash.min.js"></script>
<script src="https://unpkg.com/qs@6/dist/qs.js"></script>
<script src="https://unpkg.com/line-bot-sdk-web/dist/linebot.js"></script>
```

## Example

Get profile

```js
// setting channel access token
linebot.token = 'YOUR_CHANNEL_ACCESS_TOKEN'

linebot.getProfile(userId).then(function (profile) {
  console.log(profile)
}).catch(function (err) {
  // get error message from LINE API (axios)
  err.message = _.get(err, 'response.data.message') || err.message
  console.err(err)
})
```

Create a new client

```js
const client1 = new linebot.Linebot('YOUR_CHANNEL1_ACCESS_TOKEN')
const client2 = new linebot.Linebot('YOUR_CHANNEL2_ACCESS_TOKEN')
```
