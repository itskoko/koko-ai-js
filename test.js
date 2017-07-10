const {Tracker} = require('.')
const koko = new Tracker({
  auth: process.env.KOKO_AUTH
})

const responses = [
  koko.trackContent({
    id: '123',
    user_id: '123',
    type: 'post',
    content_type: 'text',
    content: {text: 'Some content'},
    created_at: new Date(1498070225000).toISOString(),
    context_id: '123'
  }),

  koko.trackFlag({
    id: '123',
    flagger_id: '123',
    reasons: ['crisis'],
    target: {content_id: "123"},
    created_at: new Date(1498070225000).toISOString()
  }),

  koko.trackModeration({
    id: '123',
    moderator_id: '123',
    action: 'user_warned',
    target: {content_id: "123"},
    reasons: ['abusive'],
    created_at: new Date(1498070225000).toISOString(),
    automated: false
  })
]

Promise.all(responses).catch(err => { throw err })
