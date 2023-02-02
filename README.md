# Reporting Frontend

- [Reporting Frontend](#reporting-frontend)
  - [Puesta en marcha](#puesta-en-marcha)
    - [Modo "Desarrollo"](#modo-desarrollo)
    - [Modo "Producción"](#modo-producción---docker)
  - [Detalles de la implementación](#detalles-de-la-implementación)
    - [Componentes](#componentes)
      - [UploadForm](#uploadform)
      - [ResultsView](#resultsview)
    - [Servicios](#servicios)
      - [ReportingAPIService](#reportingapiservice)
      - [StateService](#stateservice)
  - [Enlaces de Interés/Bibliografía](#enlaces-de-interés--bibliografía)

El frontend de esta aplicación consta de:

- **Formulario**:
  - Desde el cual **se subirán los archivos de entrada** customers.csv, products.csv y orders.csv. Los 3 son obligatorios.
- **Lector de resultados**:
  - Básicamente consiste en una tabla la cual es utilizada para **mostrar los resultados** obtenidos de la ejecución del proceso. En la barra superior, se puede elegir el **reporte que se quiere visualizar** y también se ofrece la **opción de descargar** los mismos en archivos `.csv`

## Puesta en marcha

Para poder hacer uso del frontend existe la posibilidad de lanzarlo desde el **_entorno de desarrollo_** o un entorno más orientado a la producción, **_Docker_**.

### Modo "Desarrollo"

Para lanzar la aplicación simplemente, clona el proyecto, y posteriormente, realiza la instalación de las dependencias. Ahora ya puedes lanzar la aplicación.

```
git clone https://github.com/SalvaChiLlo/ReportingFrontend.git # Clonar repositorio
cd ReportingFrontend
npm install # Instalar dependencias

# Ejecutar aplicación
ng serve --host 0.0.0.0 --open
```

Como resultado de ejecutar estos comandos, se lanzará la aplicación y se abrirá una ventana en el navegador.

### Modo "Producción" - Docker

El lanzamiento en el modo producción consiste en levantar los servicios **en un entorno Docker**. Para ello, se hará uso del archivo **[docker-compose.yml](https://github.com/SalvaChiLlo/ReportingFrontend/blob/main/docker-compose.yml)** el cual contiene la definición del servicio.

Para lanzarlo, en la misma carperta donde se encuentre el fichero **[docker-compose.yml](https://github.com/SalvaChiLlo/ReportingFrontend/blob/main/docker-compose.yml)** ejecuta:

```
docker-compose up -d
```

## Detalles de la implementación

\*_Para facilitar la implementación y obtener unos resultados visuales más consistentes, se ha optado por utilizar Bootstrap._

La aplicación consiste básicamente en **dos _Componentes_ y dos _Servicios_** mediante los cuales se logra completar la funcionalidad deseada.

### Componentes

#### UploadForm

Este componente es el encargado de **mostrar un formulario**, el cual, deberá de ser rellenado por el usuario con los ficheros que se piden.

Se puede acceder mediante la ruta **`/loadFiles`, la cual, es la ruta base de la aplicación**.

Una vez cargados los archivos, el usuario, tiene la posibilidad de realizar el envío del formulario. Internamente, se accede al _servicio ReportingAPIService_ que tiene como objetivo consumir la API del backend, enviando los archivos y esperando la respuesta del mismo. Si la ejecución es errónea, se mostrará un mensaje advirtiendo del mismo y explicando qué ha pasado.

En caso de tener una **ejecución exitosa** el componente en el que nos encontramos, **actualizará el _servicio StateService_**, el cual contendrá a partir de ahora la información referente a los reportes creados.

Encaso de tener un **ejecución erronea**, **se indicará** al usuario cuál ha sido **el error**.

Finalmente, el usuario será redirigido a `/showReports` donde podrá observar los reportes generados por el Backend.

#### ResultsView

Este componente se encarga de **mostrar los datos** obtenidos desde el backend, además de dar la posibilidad de **descargar** los mismos.
Básicamente, consiste en una paǵina la cual muestra mediante una tabla uno de los reportes.
Para ver el resto de reportes, existe una serie de botones en la parte superior los cuales nos dan la posibilidad de **ver cada uno de los reportes de forma independiente**.

### Servicios

#### ReportingAPIService

Servicio encargado de **comunicarse con el backend**. Contiene una petición de tipo _POST_ que espera **subir los 3 archivos de datos** ya mencionados y que espera por parte del servidor recibir una respuesta, o bien un mensaje de error, o un objeto que contenga los diferentes reportes que se han generado.

#### StateService

El servicio _StateService_ principalmente tiene la funcionalidad de ser el **_"repositorio central de datos"_**. En él, cuando se reciben los reportes del backend, estos son **almacenados y formateados** para su posterior uso en el componente **ResultsView o para descargarlos**.

## Enlaces de interés / Bibliografía

- [Multer](http://expressjs.com/en/resources/middleware/multer.html)
- [Csvtojson](https://www.npmjs.com/package/csvtojson)
- [Ansi-colors](https://www.npmjs.com/package/ansi-colors)
- [Eslint](https://www.npmjs.com/package/eslint)
- [Dynamically set angular env variables in docker](https://nkpremices.com/dynamically-set-angular-env-variables-in-docker/)
- [Configure NGINX for Angular - Docker](https://dev.to/oneofthedevs/docker-angular-nginx-37e4)
