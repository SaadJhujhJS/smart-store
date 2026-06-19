// config/safepay.js
const { Safepay } = require('@sfpy/node-sdk')

const safepay = new Safepay({
  environment: 'sandbox',        // change to 'production' when going live
  apiKey: process.env.SAFEPAY_API_KEY,
  v1Secret: process.env.SAFEPAY_V1_SECRET,
  webhookSecret: process.env.SAFEPAY_WEBHOOK_SECRET
})

module.exports = safepay