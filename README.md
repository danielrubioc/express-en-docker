# express-en-docker

Ejecutar psql desde la terminal para crear database

```
psql -p5432 -U postgres
```

Crear Base de datos

```
CREATE DATABASE simple_db;
```

### Dependencias

Despues de crear la BD se deben instalar las dependencias del proyecto

```
npm i
```

En la raiz del proyecto encontraras un archivo `.env-example` debes renombrarlo a `.env` y configurar las variables segun corresponda.

Poblar la base de datos:

```
npm run migrate:db
```

Revisar la base de datos:

```
npm run test:db
```

## Docker

Cambiar el host del archivo .env

```
PGHOST=host.docker.internal
```

Ejecutar en terminal en la raiz del proyecto para crear un contendor en docker:

```
docker build . -t express-docker
```

-   el comando build, sirve para construir una imagen
-   el punto . indica que se construirá la imagen con los archivos en la ruta del proyecto
-   -t sirve para indicar el nombre y opcionalmente una etiqueta en el formato 'nombre: etiqueta'

Ejecutar en terminal para levantar el contenedor en el puerto 4000

```
docker run -d -p 4000:4000 express-docker
```

Listo ahora revisa http://localhost:4000/
