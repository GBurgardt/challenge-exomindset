import { test } from 'tap'
import { build } from '../helper'

test('latitude and longitude is missing', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/temperature'
  })

  t.same(JSON.parse(res.payload), { "error": "latitude and longitude are required" })
})