### Consideraciones

- Para el consumo de la API de Openweather se creó un plugin encapsulado con la idea de poder reutilizarlo.
- El servicio que evalua la temperatura recibe latitud y longitud por query. Se pensó así con el fin de usarse con otras ciudades además de Rio Cuarto. Además, es un microservicio que podría usarse en otros proyectos

### Instalación
Copiar archivo .env en raiz del proyecto, ejecutar `npm install` y `npm run dev`