# Exo Mindset Challenge

## Consideraciones
- Para el consumo de la API de Openweather se creó un plugin encapsulado con la idea de poder reutilizarlo.
- El servicio que evalua la temperatura recibe latitud y longitud por query. Se pensó así con el fin de usarse con otras ciudades además de Rio Cuarto. Además, es un microservicio que podría usarse en otros proyectos
- Respecto a los test unitarios, no se cubrió todo el coverage pero se hicieron tests completos del plugin de Openweather

## Instalación
Copiar archivo `.env` en la raiz del proyecto, luego ejecutar `npm install` y `npm run dev`

## Servicios
El servicio expuesto comprueba si la temperatura del lugar dado es mayor a 15. También se permite pasar una temperatura distinta de 15 para comparar. 
Como ejemplo, las coordenadas de Rio Cuarto son: Latitud: -33.1236, Longitud: -64.3492.
Entonces:

`http://localhost:3000/temperature?latitude=-33.1236&longitude=-64.3492`

Respuesta:

{
    "tempToCompare": 15,
    "searchedTemp": 18.23,
    "isGreater": true
}

Parámetros query
- `latitude`: latitud del lugar (obligatorio)
- `longitude`: longitud del lugar (obligatorio)
- `tempToCompare`: temperatura a comparar (opctional)