import { FastifyPluginAsync } from "fastify"

const temperatureRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request: any, reply) {
    const { latitude, longitude } = request.query;
    const { openweather } = fastify;

    if (!latitude || !longitude) {
      return reply.code(400).send({
        error: 'latitude and longitude are required'
      })
    }

    const tempToCompare = Number(request.query.tempToCompare ? request.query.tempToCompare : process.env.TEMP_TO_COMPARE);

    try {
      const resp = await openweather.getTemperature(latitude, longitude);
  
      if (resp.temp) {
        return {
          tempToCompare,
          searchedTemp: resp.temp,
          isGreater: resp.temp > tempToCompare
        }
      } else {
        return reply.code(400).send({
          error: resp.error ? resp.error : 'Invalid latitude or longitude'
        })
      }
    } catch (error: any) {
      console.log("error")
      console.log(error)
      console.log(error.message)
      return reply.code(500).send({
        error: error.message
      })
    }
  })
}



export default temperatureRoute;
