import _ from 'lodash'
import axios from 'axios'
import Qs from 'qs'

const APIBASE_BOT = 'https://api.line.me/v2/bot'
const APIBASE_OAUTH = 'https://api.line.me/v2/oauth'
const ENDPOINT_PLAYGROUND = 'https://lds-api-playground.line-apps.com/call/generic'

function qs (params) {
  return Qs.stringify(params, {
    addQueryPrefix: true,
    arrayFormat: 'brackets',
  })
}

export default class Linebot {
  constructor (token) {
    this.token = token
  }

  async httpGet ({ endpoint, params }) {
    return _.get(await axios.post(ENDPOINT_PLAYGROUND, {
      accessToken: this.token,
      method: 'get',
      preparedUrl: `${endpoint}${qs(params)}`,
      requestBody: {},
      requestHeader: {
        contentType: null,
        authorization: {
          scheme: 'Bearer',
          means: 'channelAccessToken',
        },
      },
    }), 'data')
  }

  async httpPost ({ body, endpoint }) {
    return _.get(await axios.post(ENDPOINT_PLAYGROUND, {
      accessToken: this.token,
      method: 'post',
      preparedUrl: endpoint,
      requestBody: body,
      requestHeader: {
        contentType: null,
        authorization: {
          scheme: 'Bearer',
          means: 'channelAccessToken',
        },
      },
    }), 'data')
  }

  static async httpPostForm ({ body, endpoint }) {
    return _.get(await axios.post(ENDPOINT_PLAYGROUND, {
      accessToken: null,
      method: 'post',
      parameters: null,
      preparedUrl: endpoint,
      requestBody: body,
      requestHeader: {
        authorization: null,
        contentType: 'application/x-www-form-urlencoded',
      },
    }), 'data')
  }

  static async postOauthAccessToken (clientId, clientSecret) {
    return await Linebot.httpPostForm({
      endpoint: `${APIBASE_OAUTH}/accessToken`,
      body: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      },
    })
  }

  static async postOauthRevoke (token) {
    return await Linebot.httpPostForm({
      endpoint: `${APIBASE_OAUTH}/revoke`,
      body: {
        access_token: token,
      },
    })
  }

  async getMessageQuota () {
    return await this.httpGet({
      endpoint: `${APIBASE_BOT}/message/quota`,
    })
  }

  async getMessageQuotaConsumption () {
    return await this.httpGet({
      endpoint: `${APIBASE_BOT}/message/quota/consumption`,
    })
  }

  async getMessageDeliveryReply (date) {
    return await this.httpGet({
      endpoint: `${APIBASE_BOT}/message/delivery/reply`,
      params: { date },
    })
  }

  async getMessageDeliveryPush (date) {
    return await this.httpGet({
      endpoint: `${APIBASE_BOT}/message/delivery/push`,
      params: { date },
    })
  }

  async getMessageDeliveryMulticast (date) {
    return await this.httpGet({
      endpoint: `${APIBASE_BOT}/message/delivery/multicast`,
      params: { date },
    })
  }

  async getProfile (userId) {
    return await this.httpGet({
      endpoint: `${APIBASE_BOT}/profile/${userId}`,
    })
  }
}
