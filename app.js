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


app.controller('controladorReservas', function($scope){

  $scope.data="datos";

  function openHab(){
    alert('openHab');
  };

  var stage = new createjs.Stage("demoCanvas");

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

  var txt = new createjs.Text();
  txt.font = "bold 40px Arial";
  txt.x = 90;
  txt.y = 95;
  txt.color = "#00000";
  txt.text = "101";

  stage.addChild(habA);
  stage.addChild(txt);


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

  var habD = new createjs.Shape();
  habD.graphics.beginStroke("black");
  habD.graphics.beginFill("Green");
  habD.graphics.moveTo(600, 200).
                lineTo(800, 200).
                lineTo(800, 320).
                lineTo(600, 320).
                lineTo(600, 200);

  var habE = new createjs.Shape();
  habE.graphics.beginStroke("black");
  habE.graphics.beginFill("Green");
  habE.graphics.moveTo(800, 320).
                lineTo(800, 50).
                lineTo(950, 50).
                lineTo(950, 200).
                lineTo(800, 320);



  stage.addChild(habB);
  stage.addChild(habC);
  stage.addChild(habD);
  stage.addChild(habE);
  stage.update();

});
