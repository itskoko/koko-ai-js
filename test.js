const assert = require('assert')
const {Tracker} = require('.')
const koko = new Tracker({auth: process.env.KOKO_AUTH})

async function testTrackContent() {
  const request = {
    id: '123',
    user_id: '123',
    type: 'post',
    content_type: 'text',
    content: {text: 'Some content'}
  }

  await koko.trackContent(request)

  try {
    delete request.type
    await koko.trackContent(request)
    throw new Error('API should require `type` parameter.')
  }

  catch ({message}) {
    assert.equal(message, 'Required property type was not present.')
  }
}

async function testTrackFlag() {
  const request = {
    id: '123',
    flagger_id: '123',
    reasons: ['crisis'],
    targets: [{content_id: '123'}],
    target: {content_id: '123'} // TODO: delete
  }

  await koko.trackFlag(request)

  try {
    delete request.flagger_id
    await koko.trackFlag(request)
    throw new Error('API should require `flagger_id` parameter.')
  }

  catch ({message}) {
    assert.equal(message, 'Required property flagger_id was not present.')
  }
}

async function testTrackModeration() {
  const request = {
    id: '123',
    moderator_id: '123',
    action: 'user_warned',
    target: {content_id: '123'}
  }

  await koko.trackModeration(request)

  try {
    delete request.moderator_id
    await koko.trackModeration(request)
    throw new Error('API should require `moderator_id` parameter.')
  }

  catch ({message}) {
    assert.equal(message, 'Required property moderator_id was not present.')
  }
}

const tests = [
  testTrackContent(),
  testTrackFlag(),
  testTrackModeration()
]

Promise.all(tests).catch(err => { throw err })
