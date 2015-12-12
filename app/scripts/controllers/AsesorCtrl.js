'use strict';

angular.module('asesor.controllers',['Asesor'])
  // Controlador encargado de las funciones que se pueden realizar sobre
  // un producto 
  .controller('AsesorCtrl', function($scope, $modal,AsesorService) {

    $scope.nombreAsesor = AsesorService.getNombreAsesor();
    console.log($scope.nombreAsesor);
    $scope.tipoDocumento = AsesorService.getTipoDocumento();
    $scope.numDocumento = AsesorService.getNumDocumento();
    $scope.correo = AsesorService.getCorreo();
    $scope.celular = AsesorService.getCelular();
  	$scope.direccion = AsesorService.getDireccion();
  	$scope.fotoAsesor = AsesorService.getFotoAsesor();
    $scope.latitud = AsesorService.getLatitud();
    $scope.longitud = AsesorService.getLongitud();


    $scope.map = {
      center: {
        latitude: 40.454018, 
        longitude: -3.509205
      }, 
      zoom: 12,
      options : {
        scrollwheel: false
      },
      control: {}
    };
    
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 40.454018,
        longitude: -3.509205
      },
      options: {
        draggable: true
      }
    };

  });