export type GreenApiCredentials = {
  idInstance: string
  apiTokenInstance: string
}

export type GetSettingsResponse = {
  wid: string
  countryInstance: string
  typeAccount: string
  webhookUrl: string
  webhookUrlToken: string
  delaySendMessagesMilliseconds: number
  markIncomingMessagesReaded: 'yes' | 'no'
  markIncomingMessagesReadedOnReply: 'yes' | 'no'
  sharedSession: string
  outgoingWebhook: 'yes' | 'no'
  outgoingMessageWebhook: 'yes' | 'no'
  outgoingAPIMessageWebhook: 'yes' | 'no'
  incomingWebhook: 'yes' | 'no'
  deviceWebhook: 'yes' | 'no'
  statusInstanceWebhook: 'yes' | 'no'
  stateWebhook: 'yes' | 'no'
  enableMessagesHistory: 'yes' | 'no'
  keepOnlineStatus: 'yes' | 'no'
  pollMessageWebhook: 'yes' | 'no'
  incomingBlockWebhook: 'yes' | 'no'
  incomingCallWebhook: 'yes' | 'no'
  editedMessageWebhook: 'yes' | 'no'
  deletedMessageWebhook: 'yes' | 'no'
  catalogWebhook: 'yes' | 'no'
  autoTyping: number
  linkPreview: 'yes' | 'no'
  enableLidMode: 'yes' | 'no'
}

export type GetStateInstanceResponse = {
  stateInstance:
    | 'notAuthorized'
    | 'authorized'
    | 'blocked'
    | 'sleepMode'
    | 'starting'
    | 'yellowCard'
    | 'suspended'
}

export type SendMessageResponse = {
  idMessage: string
}

export type SendFileByUrlResponse = {
  idMessage: string
}
