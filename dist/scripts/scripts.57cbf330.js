"use strict";angular.module("spinnerBankAngularApp",["ngAnimate","ngCookies","ngMessages","ngAnimate","toastr","ui.router","satellizer","ui.bootstrap","ngResource","ngRoute","ngSanitize","ngTouch","productos.controllers","productos.services","session.services","principal.controllers","asesor.controllers","LoginGoogle","usuario","Asesor","logOuth"]).config(["$routeProvider","$authProvider",function(a,b){a.when("/",{templateUrl:"views/Login.html",controller:"LoginCtrl",controllerAs:"LoginCtrl"}).when("/producto",{templateUrl:"views/Producto.html",controller:"prodControler",controllerAs:"ProdCtrl"}).when("/salir",{templateUrl:"views/Login.html",controller:"logOuthCont",controllerAs:"LogOutCtrl"}).when("/Principal",{templateUrl:"views/Principal.html",controller:"principalCtrl",controllerAs:"PrincipalCtrl"}).when("/asesor",{templateUrl:"views/InfoAsesor.html",controller:"AsesorCtrl",controllerAs:"AsesorCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("productos.controllers",["productos.services","usuario"]).controller("prodControler",["$scope","ApiProductos","$modal","UsuarioService",function(a,b,c,d){a.id=1936941186,a.cod=1,a.imagenPersonal=d.getImagen(),a.nombre=d.getNombre(),b.obtenerProductos(a.id).success(function(b){console.log("Resultado peticion: "+b),a.productos=b}).error(function(b,c){a.productos="",console.log(b)}),a.obtenerId=function(){return 1936941186},a.detalles=function(a){c.open({templateUrl:"views/Detalle.html",controller:"modalControler",resolve:{producto:function(){return a}},size:"ls"})}}]).controller("modalControler",["$scope","$modalInstance","ApiProductos","producto",function(a,b,c,d){c.detalleMovimientos(d.productId).success(function(b){a.detalles=b,a.productSelected=d}),a.salirDetalle=function(){b.close()}}]),angular.module("productos.services",[]).factory("ApiProductos",["$http",function(a){var b="https://spinnerbank-api-external.herokuapp.com";return{detalleMovimientos:function(c){return a.get(b+"/v1/transactions/"+c,{method:"GET"})},obtenerProductos:function(c){return a.get(b+"/v1/products/"+c+"/CC",{method:"GET"})}}}]),angular.module("session.services",[]).factory("ApiSession",["$http",function(a){var b="http://spinnerbank-api-external.herokuapp.com";return{obtenerTokenApi:function(c){return a.get(b+"/v2/oAuth2/accessToken2",{method:"get",params:{code:c}})},obtenerInfoUsuario:function(c){return a.get(b+"/v1/oAuth2/userInfo",{method:"get",params:{access_token:c}})}}}]),angular.module("LoginGoogle",["session.services","usuario"]).controller("LoginCtrl",["$scope","$rootScope","$location","ApiSession","toastr","UsuarioService",function(a,b,c,d,e,f){a.token=location.search.substring(27,28),""!=a.token&&(a.token=a.token+"/"+location.search.substring(29),f.setTokenGoogle(a.token),d.obtenerTokenApi(f.getTokenGoogle()).success(function(a){console.log("Data: "+a);var b=a.jwt;console.log("Token JWT: "+b),f.setAccess_token(b),d.obtenerInfoUsuario(b).success(function(a){f.setImagen(a.picture),f.setNombre(a.given_name),e.success("Bienvenido "+f.getNombre()),c.url("/Principal")}).error(function(a,b){console.log(a)})}).error(function(a,b){console.log(a)})),a.login=function(){var a="email",b="116421120632-otf7afrfqtfeiqlibtlatnou8964bge0.apps.googleusercontent.com",c="http://localhost:9000/",d="code",e="security_token",f="offline",g="force",h="https://accounts.google.com/o/oauth2/auth?scope="+a+"&client_id="+b+"&redirect_uri="+c+"&response_type="+d+"&state="+e+"&access_type="+f+"&approval_prompt="+g;window.location.replace(h)}}]),angular.module("principal.controllers",["usuario"]).controller("principalCtrl",["$scope","$modal","UsuarioService",function(a,b,c){a.imagenPersonal=c.getImagen(),a.nombre=c.getNombre()}]),angular.module("logOuth",["usuario"]).controller("logOuthCont",["$scope","UsuarioService","$location",function(a,b,c){b.setNombre(""),b.setImagen(""),window.location.replace("http://localhost:9000/#/")}]),angular.module("asesor.controllers",["Asesor"]).controller("AsesorCtrl",["$scope","$modal","AsesorService",function(a,b,c){a.nombreAsesor=c.getNombreAsesor(),a.tipoDocumento=c.getTipoDocumento(),a.numDocumento=c.getNumDocumento(),a.correo=c.getCorreo(),a.celular=c.getCelular(),a.direccion=c.getDireccion(),a.direccionGeografica=c.getDireccionGeografica(),a.fotoAsesor=c.getFotoAsesor(),a.map={center:{latitude:40.454018,longitude:-3.509205},zoom:12,options:{scrollwheel:!1},control:{}},a.marker={id:0,coords:{latitude:40.454018,longitude:-3.509205},options:{draggable:!0}}}]),angular.module("usuario",[]).service("UsuarioService",function(){function a(a){j=a}function b(){return j}function c(a){k=a}function d(a){a=a}function e(){return l}function f(){return m}function g(a){m=a}function h(){return n}function i(a){n=a}var j="",k="",l={},m="",n="";return{setTokenGoogle:a,getTokenGoogle:b,setAccess_token:c,getAccess_token:c,setUsuario:d,getUsuario:e,setImagen:g,getImagen:f,setNombre:i,getNombre:h}}),angular.module("Asesor",[]).service("AsesorService",function(){function a(a){q=a}function b(){return q}function c(a){r=a}function d(){return r}function e(a){s=a}function f(){return s}function g(a){t=a}function h(){return t}function i(a){u=a}function j(){return u}function k(a){v=a}function l(){return v}function m(a){w=a}function n(){return w}function o(a){x=a}function p(){return x}var q="Pablo",r="CC",s="468431568",t="jdavidhc94@gmail.com",u="3205090227",v="Calle x",w="Cualquier cosa",x="";return{setNombreAsesor:a,getNombreAsesor:b,setTipoDocumento:c,getTipoDocumento:d,setNumDocumento:e,getNumDocumento:f,setCorreo:g,getCorreo:h,setCelular:i,getCelular:j,setDireccion:k,getDireccion:l,setFotoAsesor:o,getFotoAsesor:p,setDireccionGeografica:m,getDireccionGeografica:n}}),angular.module("spinnerBankAngularApp").run(["$templateCache",function(a){a.put("views/Detalle.html",'<div> <div class="modal-header"> <center><h1>Detalles Movimientos</h1><center> </center></center></div> <div class="modal-body"> <div class="list-group"> <center> <h2>Producto</h2> </center> <table class="table"> <tr class="btn-primary"> <th>Nombre</th> <th>Tipo Producto</th> <th>Saldo</th> </tr> <tr> <td>{{productSelected.name}}</td> <td>{{productSelected.productType}}</td> <td>{{productSelected.balance | currency:"COP$ "}}</td> </tr> </table> <center> <h2>Movimientos</h2> </center> <table class="table"> <tr class="btn-primary"> <th>Fecha </th> <th>Descripción</th> <th>valor</th> </tr> <tr ng-repeat="detalle in detalles"> <td>{{detalle.date}}</td> <td>{{detalle.description}}</td> <td>{{detalle.value | currency:"COP$ "}}</td> </tr> </table> </div> <div class="alert alert-warning text-center" ng-show="detalles.length === 0"> No hay detalles de los movimientos de este producto </div> </div> <div class="modal-footer"> <button class="btn btn-default" ng-click="salirDetalle()">Salir</button> </div> <div></div></div>'),a.put("views/InfoAsesor.html",'<div class="jumbotron"> <h2>Información asesor</h2> <div> <div class="container"> <img class="images" ng-src="{{imagenPersonal}}"> </div> <h3> Nombre: {{nombreAsesor}}<br> Tipo documento: {{tipoDocumento}}<br> Número documento: {{numDocumento}}<br> Correo : {{correo}}<br> Celular : {{celular}}<br> Dirección: {{direccion}}<br> Dirección geografica: {{direccionGeografica}}<br> </h3> </div> <google-map center="map.center" zoom="map.zoom" draggable="true" options="map.options" control="map.control"> <marker coords="marker.coords" options="marker.options" idkey="marker.id"></marker> </google-map> <div></div></div>'),a.put("views/Login.html",'<div class="jumbotron"> <h1>SpinnerBank</h1> <img src="images/sober.3f648760.jpg" alt="I\'m Sober"><br><br> <p ng-grid="gridOptions"> Somos un importante participante del sistema financiero Colombiano en prestamos a caninos. Contamos con un equipo de profesionales altamente calificados, con un gran compromiso de servicio hacia nuestros clientes y usuarios, apoyados por una plataforma operativa y tecnológica altamente eficiente. </p> <div> <button class="btn btn-block btn-google-plus" ng-click="login()"> <span class="ion-social-googleplus"></span>Sign in with Google </button> </div> </div>'),a.put("views/Principal.html",'<div class="jumbotron"> <h1>{{nombre}}</h1> <div class="container"> <img class="images" ng-src="{{imagenPersonal}}"> </div> </div>'),a.put("views/Producto.html",'<!-- @author Jorge Atehortua --><!-- @email jorge.atehortua@gmail.com --><!-- Esta pagina HTML sera la encargada de llamar y mostrar\n los diferentes productos que estaran contenidos en la base\n de datos y que estan relacionados con un cliente--> <div class="container"> <div class="alert alert-warning text-center" ng-show="nombre.length === 0"> debes logearte con google para ver tus productos </div> <div ng-show="nombre.length != 0"> <h1 align="center">Listado de productos adquiridos por el cliente.</h1>   <div class="alert alert-warning text-center" ng-show="productos.length === 0"> Usted no tiene productos registrados </div> <!-- 	tabla para mostrar los archivos  --> <table class="table"> <tr class="btn-primary"> <th>Codigo producto</th> <th>Nombre del producto</th> <th>Tipo de producto</th> <th>Saldo</th> </tr> <!-- 		Columnas de la tabla aplicandoles diversos filtros de busqueda --> <tr class="fondo" ng-repeat="item in productos" ng-click="detalles(item)"> <td>{{item.productId}}</td> <td>{{item.name}}</td> <td>{{item.productType}}</td> <td>{{item.balance | currency:"COP$ "}}</td> </tr> </table> </div> </div>')}]);