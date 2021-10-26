import Fastify from 'fastify'
import fp from 'fastify-plugin'
import App from '../src/app'
import * as tap from 'tap';

export type Test = typeof tap['Test']['prototype'];

async function config () {
  return {}
}

async function build (t: Test) {
  const app = Fastify()
  void app.register(fp(App), await config())
  await app.ready();
  t.teardown(() => void app.close())
  return app
}

export {
  config,
  build
}
