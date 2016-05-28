var app = angular.module('appHotelLasNieves', ['ui.router']);

app.controller('TodoListController', function($scope) {

  $scope.test="avion";

});


app

/*

  Más info en: http://www.w3schools.com/html/html5_webstorage.asp
  Ejemplo de uso de LocalStorage de html5 para simular la base de datos  de la app

  var testObject = { 'one': 1, 'two': 2, 'three': 3 };

  // Put the object into storage
  localStorage.setItem('testObject', JSON.stringify(testObject));

  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('testObject');

  console.log('retrievedObject: ', JSON.parse(retrievedObject));
*/



//Más info sobre las rutas y sus posibilidades: https://github.com/angular-ui/ui-router

app.config(function($stateProvider, $urlRouterProvider) {


       $urlRouterProvider.otherwise('/inicio');
       //#Configuración de estados:
       $stateProvider
         //Configura la URL principal

         /*

        */

         .state('public',{
           templateUrl:'publicTemplate.html',
         })
         //Vistas anidadas
         .state('public.inicio',{
           url:'/inicio',
           templateUrl:'inicio.html',
         })
         .state('public.reservas',{
           url:'/reservas',
           templateUrl:'reservas.html',
           controller: 'controladorReservas'
         })
         .state('public.ofertas',{
           url:'/ofertas',
           templateUrl:'ofertas.html',
         })
         .state('public.ocio',{
           url:'/ocio',
           templateUrl:'ocio.html',
         })
         .state('public.servicios',{
           url:'/servicios',
           templateUrl:'servicios.html',
         })
         .state('public.acercade',{
           url:'/acercade',
           templateUrl:'acercade.html',
         })
         .state('public.historia',{
           url:'/historia',
           templateUrl:'historia.html',
         })
         .state('admin',{
           url:'/admin',
           templateUrl:'admin.html',
         });

});//Final de config. de las rutas.



app.controller('loginController', function($scope){


    $scope.login = function (credenciales) {
      console.log('Logueando al usuario con credenciales:');
      console.log(credenciales);

      if (credenciales.username == 'admin' && credenciales.password=='admin'){
        console.log('Usuario con permisos');
      }

    };

});


// VARIABLES PARA LA VISTA DE LAS RESERVAS //
//Por defecto:
var planta = 1;
var fecha = '19-05-2016';
//Lista de habitaciones de la vista: 1-> ocupada 0->libre
var habitaciones=[0,0,0,0,0];

//Avisador del cambio
function cambioDate(){
  console.log('cambioDate');
  //Cambiamos los datos modificando la fecha y llamamos a actualizar
  //angular.element(document.getElementById('controladorReservas')).scope();
  console.log(document.getElementById('fecha').value);
  fecha=document.getElementById('fecha').value;

  actualiza2();

}


//Función que actualiza el canvas, modificando las variables y llamando a repintar.
function actualiza2(){
  /*Para actualizar los datos que necesitamos son la planta y la fecha. Con estos
  revisamos las reservas realizadas y si alguna nos conicide pintamos la habitación como corresponda.
  */
  habitaciones=[0,0,0,0,0];

  console.log('Variables');
  console.log(planta);
  console.log(fecha);
  console.log('Habitaciones');
  console.log(habitaciones);

  //Extraemos el objeto reservas de la base de datos:
  var reservas = localStorage.getItem('reservas');
  console.log('RESERVAS object: ', JSON.parse(reservas));
  //Comporbamos si existe
  if(reservas == null){
    console.log('Aún no se han realizado reservas');
  }else{
    console.log('Reservas existentes');
    console.log(reservas);
  };

  //Trabajamos con el objeto de javascript
  reservas = JSON.parse(reservas);

  //Comprobamos si existen reservas para esa fecha:
  for(var i=0; i<reservas.length; i++){
    console.log(fecha);
    if(reservas[i].fecha==fecha){
      console.log('FECHA COINCIDENTE');
      //Ahora cargamos en el vector habitaciones las que haya para esta fecha para la planta que se está visualizando:
      for(var j=0; j<reservas[i].habitaciones.length; j++){
        //Extraemos la habitación que es.
        var habitacion=reservas[i].habitaciones[j].substring(2,3);
        console.log('habitacion: '+habitacion);
        //Si la habitación coincide con la planta
        if(planta==reservas[i].habitaciones[j].substring(0,1)){
          //Se marca como ocupada
          habitaciones[habitacion-1]=1;
        }
      }
    }
  };

  console.log('Habitaciones');
  console.log(habitaciones);






  //init();
}

app.controller('controladorReservas', function($scope){



  var reservas = [];
  reservas.push({fecha:'28-05-2016', habitaciones:['101']})
  reservas.push({fecha:'29-05-2016', habitaciones:['104','203','301']})
  console.log(reservas);
  console.log(JSON.stringify(reservas))

  $scope.fechaActual=fecha;


  // Introducimos las reservas de prueba en el sistema.
  localStorage.setItem('reservas', JSON.stringify(reservas));


  //Inicialización del plugin, buscando si hay reservas para hoy y moidificando el canvas en consecuencia








  //Usada para pintar el canvas con la selcción del form

  //Configuración del form <select>
  $scope.datosSelect = {
   opciones: [
     {id: '1', nombre: 'Planta 1'},
     {id: '2', nombre: 'Planta 2'},
     {id: '3', nombre: 'Planta 3'}
   ],
   opcionSeleccionada: {id: '1', nombre: 'Planta 1'} //This sets the default value of the select in the ui
   };

  //Función que puede ser llamada desde la vista a través del scope.
  $scope.cambioSelectPlanta = function(){
    console.log('CAmbio');
    console.log($scope.datosSelect.opcionSeleccionada.id);
    planta = $scope.datosSelect.opcionSeleccionada.id;

    actualiza2();



  }


  //Lanzamos un escuchador de jQuery que escuche los eventos producidos:
  jQuery(document).ready(function()
  {
      jQuery("#fecha").on("hide.uk.datepicker", function (event)
      {
        alert('HI');
      });
  });











  $scope.hola = function(){
    console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa');
    console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa');
    console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa');
  //Extraemos el dato desde el campo con id='fecha'
   console.log(document.getElementById('fecha'));
  };


  //Función que actualiza el canvas, modificando las variables y llamando a repintar.
  function actualiza(){
    /*Para actualizar los datos que necesitamos son la planta y la fecha. Con estos
    revisamos las reservas realizadas y si alguna nos conicide pintamos la habitación como corresponda.
    */
    //Extraemos el objeto reservas de la base de datos:
    var reservas = localStorage.getItem('reservas');
    console.log('RESERVAS object: ', JSON.parse(reservas));
    //Comporbamos si existe
    if(reservas == null){
      console.log('Aún no se han realizado reservas');
    }else{
      console.log('Reservas existentes');
      console.log(reservas);
    };





    init();
  }

  //Función que solo puede ser llamada desde el controlador
  function openHab(){
    alert('openHab');
  };

  //Creamos la variable del canvas
  var stage = new createjs.Stage("demoCanvas");
  function init(){


    // ### Habitación A ### //
    var habA = new createjs.Shape();
    habA.graphics.beginStroke("black");
    habA.graphics.beginFill("Green");
    habA.graphics.moveTo(50, 50).
                  lineTo(200, 50).
                  lineTo(200, 200).
                  lineTo(50, 200).
                  lineTo(50, 50);

    habA.addEventListener("click", function(event) {
      habA.graphics.beginFill("Red");
      habA.graphics.moveTo(50, 50).
                    lineTo(200, 50).
                    lineTo(200, 200).
                    lineTo(50, 200).
                    lineTo(50, 50);
      stage.update(event);
      openHab();
    })

    var txtHabA = new createjs.Text();
    txtHabA.font = "bold 40px Arial";
    txtHabA.x = 90;
    txtHabA.y = 95;
    txtHabA.color = "#00000";
    txtHabA.text = planta+"01";

    stage.addChild(habA);
    stage.addChild(txtHabA);


    var habB = new createjs.Shape();
    habB.graphics.beginStroke("black");
    habB.graphics.beginFill("Green");
    habB.graphics.moveTo(50, 200).
                  lineTo(400, 200).
                  lineTo(400, 320).
                  lineTo(150, 320).
                  lineTo(50,200);

    habB.addEventListener("click", function(event) {
      habB.graphics.beginFill("Red");
      habB.graphics.moveTo(50, 200).
                    lineTo(400, 200).
                    lineTo(400, 320).
                    lineTo(150, 320).
                    lineTo(50,200);
      stage.update(event);
    })

    var txtHabB = new createjs.Text();
    txtHabB.font = "bold 40px Arial";
    txtHabB.x = 210;
    txtHabB.y = 240;
    txtHabB.color = "#00000";
    txtHabB.text = planta+"02";

    stage.addChild(habB);
    stage.addChild(txtHabB);

    var habC = new createjs.Shape();
    habC.graphics.beginStroke("black");
    habC.graphics.beginFill("Green");
    habC.graphics.moveTo(400, 200).
                  lineTo(600, 200).
                  lineTo(600, 320).
                  lineTo(400, 320).
                  lineTo(400, 200);

    habC.addEventListener("click", function(event) {
      habC.graphics.beginFill("Red");
      habC.graphics.moveTo(50, 200).
                    lineTo(200, 200).
                    lineTo(400, 320).
                    lineTo(150, 320).
                    lineTo(50,200);
      stage.update(event);
    })


    var txtHabC = new createjs.Text();
    txtHabC.font = "bold 40px Arial";
    txtHabC.x = 460;
    txtHabC.y = 240;
    txtHabC.color = "#00000";
    txtHabC.text = planta+"03";

    stage.addChild(habC);
    stage.addChild(txtHabC);

    var habD = new createjs.Shape();
    habD.graphics.beginStroke("black");
    habD.graphics.beginFill("Green");
    habD.graphics.moveTo(600, 200).
                  lineTo(800, 200).
                  lineTo(800, 320).
                  lineTo(600, 320).
                  lineTo(600, 200);

    var txtHabD = new createjs.Text();
    txtHabD.font = "bold 40px Arial";
    txtHabD.x = 660;
    txtHabD.y = 240;
    txtHabD.color = "#00000";
    txtHabD.text = planta+"04";

    stage.addChild(habD);
    stage.addChild(txtHabD);


    var habE = new createjs.Shape();
    habE.graphics.beginStroke("black");
    habE.graphics.beginFill("Green");
    habE.graphics.moveTo(800, 320).
                  lineTo(800, 50).
                  lineTo(950, 50).
                  lineTo(950, 200).
                  lineTo(800, 320);


    var txtHabE = new createjs.Text();
    txtHabE.font = "bold 40px Arial";
    txtHabE.x = 840;
    txtHabE.y = 95;
    txtHabE.color = "#00000";
    txtHabE.text = planta+"05";

    stage.addChild(habE);
    stage.addChild(txtHabE);

    stage.update();
  }


  init();

});
