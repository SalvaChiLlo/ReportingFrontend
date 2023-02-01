# Reporting Frontend

* [Reporting Frontend](#reporting-frontend)
  * [Puesta en marcha](#puesta-en-marcha)
    * [Modo "Desarrollo"](#modo-desarrollo)
    * [Modo "Producción"](#modo-producción)
  * [Detalles de la implementación](#detalles-de-la-implementación)
    * [Componentes](#componentes)
      * [UploadForm](#uploadform)
      * [ResultsView](#resultsview)
    * [Servicios](#servicios)
      * [ReportingAPIService](#reportingapiservice)
      * [StateService](#stateservice)

El frontend de esta aplicación consta de: 
* Formulario: 
  * Desde el cual se subirán los diferentes archivos de entrada
    customers.csv, products.csv y orders.csv. Los 3 son obligatorios.
* Lector de resultados:
  * Básicamente consiste en una tabla la cual es utilizada para **mostrar los resultados** obtenidos de la ejecución del proceso. En la barra superior, se puede elegir el **reporte que se quiere visualizar** y también se ofrece la **opción de descargar** los mismos en archivos `.csv`

## Puesta en marcha
Para poder hacer uso del frontend existe la posibilidad de lanzarlo desde el entorno de desarrollo o un entorno más orientado a la producción, *Docker*.
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
### Modo "Producción"
El lanzamiento en el modo producción consiste en levantar los servicios en un entorno Docker. Para ello, se hará uso del archivo [docker-compose.yml](https://github.com/SalvaChiLlo/ReportingFrontend/blob/main/docker-compose.yml) el cual contiene la definición del servicio.

Para lanzarlo, en la misma carperta donde se encuentre el fichero [docker-compose.yml](https://github.com/SalvaChiLlo/ReportingFrontend/blob/main/docker-compose.yml) ejecuta:
```
docker-compose up -d
```

## Detalles de la implementación
**Para facilitar la implementación y obtener unos resultados visuales más consistentes, se ha optado por utilizar Bootstrap.*

La aplicación se consiste básicamente en dos *Componentes* y dos *Servicios* mediante los cuales se logra completar la funcionalidad deseada.

### Componentes
#### UploadForm
Este componente es el encargado de mostrar un formulario, el cual, deberá de ser rellenado por el usuario con los ficheros que se piden.

Se puede acceder mediante la ruta `/loadFiles`, la cual, es la ruta base de la aplicación.

Una vez cargados los archivos, el usuario, tiene la posibilidad de realizar el envío del formulario. Internamente, se accede al *servicio ReportingAPIService* que tiene como objetivo consumir la API del backend, enviando los archivos y esperando la respuesta del mismo. Si la ejecución es errónea, se mostrará un mensaje advirtiendo del mismo y explicando qué ha pasado.
En caso de tener una ejecución exitosa el componente en el que nos encontramos, actualizará el *servicio StateService*, el cual contendrá a partir de ahora la información referente a los reportes creados.
Finalmente, el usuario será redirigido a `/showReports` donde podrá observar los reportes generados por el Backend.

#### ResultsView
Este componente se encarga de mostrar los datos obtenidos desde el backend, además de dar la posibilidad de descargar los mismos.
Básicamente, consiste en una paǵina la cual muestra mediante una tabla uno de los reportes.
Para ver el resto de reportes, existe una serie de botones en la parte superior los cuales nos dan la posibilidad de realizar esto.

### Servicios
#### ReportingAPIService
Servicio encargado de comunicarse con el backend. Contiene una petición de tipo *POST* que espera enviar los 3 archivos de datos ya mencionados y que espera por parte del servidor recibir una respuesta, o bien un mensaje de error, o un objeto que contenga los diferentes reportes que se han generado.

#### StateService
El servicio *StateService* principalmente tiene la funcionalidad de ser el *"repositorio central de datos"*. En él, cuando se reciben los reportes del backend, estos son almacenados y formateados para su posterior uso en el componente ResultsView o para descargarlos.