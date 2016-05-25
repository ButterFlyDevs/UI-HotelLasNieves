var app = angular.module('appHotelLasNieves', ['ui.router']);

app.controller('TodoListController', function($scope) {

  $scope.test="avion";

});


/*Ejemplo de uso de LocalStorage de html5 para simular la base de datos  de la app

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
