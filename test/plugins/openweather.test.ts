import { test } from 'tap'
import Fastify from 'fastify'

const fetchStub = (url: any) => Promise.resolve({
  json: () => Promise.resolve({
    current: { temp: 10 }
  })
})

test('support works', async (t) => {

  const OpenweatherWithMock = t.mock(
    '../../src/plugins/openweather',
    {
      'cross-fetch': {
        default: fetchStub
      }
    }
  );

  const fastify: any = Fastify()
  void fastify.register(OpenweatherWithMock)
  await fastify.ready()

  const resp = await fastify.openweather.getTemperature(-33.1236, -23.1236);

  t.same(resp, { temp: 10 })
})


const fetchErrorStub = (url: any) => Promise.resolve({
  json: () => Promise.reject(new Error('wrong latitude'))
})

test('latitude or longitude is wrong', async (t) => {

  const OpenweatherWithMock = t.mock(
    '../../src/plugins/openweather',
    {
      'cross-fetch': {
        default: fetchErrorStub
      }
    }
  );

  const fastify: any = Fastify()
  void fastify.register(OpenweatherWithMock)
  await fastify.ready()

  try {
    await fastify.openweather.getTemperature('wrongLatitude', -23.1236);
  } catch (error: any) {
    t.same(error.message, 'Error: wrong latitude')
  }
})

const fetchWithoutCurrentStub = (url: any) => Promise.resolve({
  json: () => Promise.resolve({ 
    message: "General error"
  })
})

test('openweather request come without current key', async (t) => {

  const OpenweatherWithMock = t.mock(
    '../../src/plugins/openweather',
    {
      'cross-fetch': {
        default: fetchWithoutCurrentStub
      }
    }
  );

  const fastify: any = Fastify()
  void fastify.register(OpenweatherWithMock)
  await fastify.ready()

  
  try {
    await fastify.openweather.getTemperature(-23.1236, -23.1236);
  } catch (error: any) {
    t.same(error.message, 'Error: General error')
  }
  
})