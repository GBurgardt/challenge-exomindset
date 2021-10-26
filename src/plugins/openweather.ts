import fp from 'fastify-plugin'
import fetch from 'cross-fetch';

export default fp<any>(async (fastify, opts) => {
    fastify.decorate(
        'openweather', 
        {
            getTemperature: async (lat: number, lon: number) => {
                const { OPENWEATHER_API_URL: apiUrl, OPENWEATHER_UNITS: units, OPENWEATHER_APP_ID: appId, OPENWEATHER_EXCLUDE: exclude } = process.env;

                try {
                    const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${appId}&units=${units}&exclude=${exclude}`)
                    const data = await response.json()
                    if (data.current) {
                        return data.current
                    } else {
                        throw new Error(data.message ? data.message : "Error")
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        }
    )
})


declare module 'fastify' {
    export interface FastifyInstance {
        openweather: {
            getTemperature: (lat: number, lon: number) => Promise<any>
        }
    }
}
