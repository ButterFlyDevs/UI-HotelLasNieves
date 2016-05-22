var app = angular.module('appHotelLasNieves', ['ui.router']);

app.controller('TodoListController', function($scope) {

  $scope.test="avion";

});


//Más info sobre las rutas y sus posibilidades: https://github.com/angular-ui/ui-router

app.config(function($stateProvider, $urlRouterProvider) {


       $urlRouterProvider.otherwise('/inicio');
       //#Configuración de estados:
       $stateProvider
         //Configura la URL principal
         .state('inicio',{
           url:'/inicio',
           templateUrl:'inicio.html',
         })
         .state('reservas',{
           url:'/reservas',
           templateUrl:'reservas.html',
         })
         .state('ofertas',{
           url:'/ofertas',
           templateUrl:'ofertas.html',
         })
         .state('ocio',{
           url:'/ocio',
           templateUrl:'ocio.html',
         })
         .state('servicios',{
           url:'/servicios',
           templateUrl:'servicios.html',
         })
         .state('acercade',{
           url:'/acercade',
           templateUrl:'acercade.html',
         })
         .state('admin',{
           url:'/admin',
           templateUrl:'admin.html',
         })

});//Final de config. de las rutas.
