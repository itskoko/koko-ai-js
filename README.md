koko-ai-node
============

koko-ai-node is a Node.js client for https://docs.koko.ai

## Install

    npm install koko-ai

## Usage

Create an instance of the client:

```js
const {Tracker} = require('koko-ai')
const koko = new Tracker({auth: 'YOUR_AUTH_KEY'})
```

Track content, see more [here](https://docs.koko.ai/#track-endpoints).

```js
void async function() {
  const classification = await koko.trackContent({
    id: '123',
    user_id: '123',
    type: 'post',
    content_type: 'text',
    content: {text: 'Some content'},
    created_at: new Date().toISOString()
  })

  await koko.trackFlag({
    id: '123',
    flagger_id: '123',
    reasons: ['crisis'],
    targets: [{content_id: '123'}],
    created_at: new Date().toISOString()
  })

  await koko.trackModeration({
    id: '123',
    moderator_id: '123',
    action: 'user_warned',
    targets: [{content_id: '123'}],
    created_at: new Date().toISOString()
  })
}()
```

## Testing

Tests require version 8.1 or later of node.

    npm run test

## License

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

(The MIT License)

Copyright (c) 2017 Koko Inc. <us@itskoko.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
