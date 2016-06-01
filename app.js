var app = angular.module('appHotelLasNieves', ['ui.router']);

app.controller('TodoListController', function($scope) {

  $scope.test="avion";

});
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

         .state('admin',{
           url:'/admin',
           templateUrl:'loginAdmin.html',
         })

         .state('mainAdmin',{
           //url:'/mainAdmin',
           templateUrl:'mainAdmin.html',
         })
         .state('mainAdmin.reservas',{
           url:'/adminreservas',
           templateUrl:'mainAdminReservas.html',
         });

});//Final de config. de las rutas.



app.controller('loginController', function($scope, $location){


    $scope.login = function (credenciales) {
      console.log('Logueando al usuario con credenciales:');
      console.log(credenciales);

      if (credenciales.username == 'admin' && credenciales.password=='admin'){
        console.log('Usuario con permisos');
        $location.path('/adminreservas');
      }

    };

});







app.controller('controladorReservas', function($scope){

  // VARIABLES PARA LA VISTA DE LAS RESERVAS //
  var reservasRealizadas = [];



  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  var fecha = dd+'-'+mm+'-'+yyyy;

  var ddTomorrow = today.getDate();
  ddTomorrow+=1;
  if(ddTomorrow<10) {
      ddTomorrow='0'+ddTomorrow
  }

  var fechaTomorrow= ddTomorrow+'-'+mm+'-'+yyyy;
  console.log(fechaTomorrow);

  //Por defecto:
  var planta = 1;
  //var fecha = '19-05-2016';
  //Lista de habitaciones de la vista: 1-> ocupada 0->libre
  var habitaciones=[0,0,0,0,0];

  $scope.numHabitacionesLibres = 0;

  var reservas = [];
  console.log('Inicialización de la Base de Datos en memoria');
  //Para hoy:
  reservas.push({fecha:fecha, habitaciones:['101']});
  reservas.push({fecha:fechaTomorrow, habitaciones:['104','203','301']});
  console.log(reservas); //En objetos
  console.log(JSON.stringify(reservas)); //En json

  $scope.fechaActual=fecha;


  // Introducimos las reservas de prueba en el sistema.
  localStorage.setItem('reservas', JSON.stringify(reservas));
  console.log('Reservas en base de datos');

  alert(localStorage.length);



  //La sacamos para ver el contenido
  var reservas2 = localStorage.getItem('reservas');
  console.log('RESERVAS object: ', JSON.parse(reservas2));
  console.log(reservas2);


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


 //Añade una habitación a la reserva
 $scope.addHabitacion = function(numHab, precioHab){
   console.log('Call addHabitacion')   ;
   reservasRealizadas.push({fecha:fecha, habitacion:numHab, precio:precioHab})
   console.log(reservasRealizadas);
   $scope.reservasRealizadas=reservasRealizadas;

   //Calculamos el precio total:
   var precioAcum=0;
   for(var i=0; i<reservasRealizadas.length; i++){
     precioAcum+=reservasRealizadas[i].precio;
   }
   $scope.precioTotal=precioAcum;
   //$scope.$apply();

   /*Cuando añadimos una habitación a la reserva hay que mararla roja en el canvas
   para eso modificamos el vecotr de habitaciones (usado para ver el color del dibujo)*/
   console.log('add habitacion !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
   console.log(habitaciones);

   //Hay que realizar la reserva, revistando el objetos reservas
     //si existen reservas para esa fecha se añaden a esta
     var coincideFecha=false;
     alert(reservas.length);
     alert(reservas);
     for(var i=0; i<reservas.length; i++){

       console.log('Buscando coincidencia Fecha');
       console.log(reservas[i].fecha);
       console.log(fecha);

       if(reservas[i].fecha==fecha){
         console.log('Coincide fecha');
         coincideFecha=true;
         reservas[i].habitaciones.push(numHab);
         console.log(reservas[i].habitaciones);
       }
     };
     //si no existen reservas para esa fecha, se introduce sin más
     if(!coincideFecha){
       reservas.push({fecha:fecha, habitaciones:[numHab]});
     }
     console.log('Reservas tras la addHabitacion)');
     console.log(reservas);

     //Se guarda en la base de datos:
     localStorage.setItem('reservas', JSON.stringify(reservas));

   console.log(habitaciones);
   //Para que repinte el canvas
   actualiza2();
 }


  // ### CAMBIO DE PLANTA ### //
  //Función que puede ser llamada desde la vista a través del scope.
  $scope.cambioSelectPlanta = function(){
    console.log('CAmbio');
    console.log($scope.datosSelect.opcionSeleccionada.id);
    planta = $scope.datosSelect.opcionSeleccionada.id;
    actualiza2();
  }

  // ### CAMBIO DE FECHA ### //
  //Lanzamos un escuchador de jQuery que escuche los eventos producidos:
  jQuery(document).ready(function()
  {
      jQuery("#fecha").on("hide.uk.datepicker", function (event)
      {
        //Ejecución cuando se produce un cambio en la fecha.
        console.log(document.getElementById('fecha').value);
        fecha=document.getElementById('fecha').value;
        actualiza2();
      });
  });



  //Función que actualiza el canvas, modificando las variables y llamando a repintar.
  function actualiza2(){
    console.log('PROCESO DE ACTUALIZACIÓN');
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
    var fechaCoincidente = false;
    for(var i=0; i<reservas.length; i++){
      console.log('Fecha actual');
      console.log(fecha);
      console.log('Fecha reserva');
      console.log(reservas[i].fecha);
      if(reservas[i].fecha==fecha){
        console.log('FECHA COINCIDENTE');
        fechaCoincidente = true;
        $scope.numHabitacionesLibres=15-reservas[i].habitaciones.length;
        console.log(15-reservas[i].habitaciones.length);
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
    if(!fechaCoincidente){
      console.log('Fecha no coincidente');
      //si no coincide la fecha es que está todo libre:
      $scope.numHabitacionesLibres=15; //3plantas x 5 habitaciones.
      $scope.$apply();
    }else{
    //  $scope.$apply();
      console.log('Hola');
      $scope.$applyAsync();
    }



    console.log('Habitaciones');
    console.log(habitaciones);

    //Llamamos para que repinte
    init();


  }








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

  //Función que es llamada por los manejadores de eventos de las figuras del canvas.
  function openHab(numHab){
    //alert(numHab);

    //Segun la habitación que sea vamos a pasarle algunos datos al modal para que se concrete un poco.
    $scope.numHab=numHab;
    $scope.precioHab=35;

    //Aplicamos los cambios al scope.
    $scope.$apply();

    //Referenciamos al modal que está definido en la vista en reservas.html
    var modal = UIkit.modal("#Modal101");
    //Lo lanzamos
    modal.show();

  };

  //Creamos la variable del canvas
  var stage = new createjs.Stage("demoCanvas");
  function init(){


    // ### Habitación A ### //
    var habA = new createjs.Shape();
    habA.graphics.beginStroke("black");

    //Comprobamos el color del que tiene que pintarse la habitación.
    if(habitaciones[0]==0)
      habA.graphics.beginFill("Green");
    else
      habA.graphics.beginFill("Red");

    habA.graphics.moveTo(50, 50).
                  lineTo(200, 50).
                  lineTo(200, 200).
                  lineTo(50, 200).
                  lineTo(50, 50);

    habA.addEventListener("click", function(event) {
      //Si la habitación está reservada:
      if(habitaciones[0]==1){
        //Lanzamos un mensaje de que no se puede seleccionar.
         $.UIkit.notify("Habitación selecionada no disponible.", {status:'warning'});
      }else{
        //realizamos el procedimiento normal.
        openHab(planta+'01');
      }
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
    if(habitaciones[1]==0)
      habB.graphics.beginFill("Green");
    else
      habB.graphics.beginFill("Red");
    habB.graphics.moveTo(50, 200).
                  lineTo(400, 200).
                  lineTo(400, 320).
                  lineTo(150, 320).
                  lineTo(50,200);

    habB.addEventListener("click", function(event) {
      //Si la habitación está reservada:
      if(habitaciones[1]==1){
        //Lanzamos un mensaje de que no se puede seleccionar.
         $.UIkit.notify("Habitación selecionada no disponible.", {status:'warning'});
      }else{
        //realizamos el procedimiento normal.
        openHab(planta+'02');
      }
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
    if(habitaciones[2]==0)
      habC.graphics.beginFill("Green");
    else
      habC.graphics.beginFill("Red");
    habC.graphics.moveTo(400, 200).
                  lineTo(600, 200).
                  lineTo(600, 320).
                  lineTo(400, 320).
                  lineTo(400, 200);

    habC.addEventListener("click", function(event) {
      //Si la habitación está reservada:
      if(habitaciones[2]==1){
        //Lanzamos un mensaje de que no se puede seleccionar.
         $.UIkit.notify("Habitación selecionada no disponible.", {status:'warning'});
      }else{
        //realizamos el procedimiento normal.
        openHab(planta+'03');
      }
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
    if(habitaciones[3]==0)
      habD.graphics.beginFill("Green");
    else
      habD.graphics.beginFill("Red");
    habD.graphics.moveTo(600, 200).
                  lineTo(800, 200).
                  lineTo(800, 320).
                  lineTo(600, 320).
                  lineTo(600, 200);

    habD.addEventListener("click", function(event) {
      //Si la habitación está reservada:
      if(habitaciones[3]==1){
        //Lanzamos un mensaje de que no se puede seleccionar.
         $.UIkit.notify("Habitación selecionada no disponible.", {status:'warning'});
      }else{
        //realizamos el procedimiento normal.
        openHab(planta+'04');
      }
    })


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
    if(habitaciones[4]==0)
      habE.graphics.beginFill("Green");
    else
      habE.graphics.beginFill("Red");
    habE.graphics.moveTo(800, 320).
                  lineTo(800, 50).
                  lineTo(950, 50).
                  lineTo(950, 200).
                  lineTo(800, 320);

    habE.addEventListener("click", function(event) {
      //Si la habitación está reservada:
      if(habitaciones[4]==1){
        //Lanzamos un mensaje de que no se puede seleccionar.
         $.UIkit.notify("Habitación selecionada no disponible.", {status:'warning'});
      }else{
        //realizamos el procedimiento normal.
        openHab(planta+'05');
      }
    })
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

  //Llamamos a acutaliza2 para la configuración inicial:
  actualiza2();


});
