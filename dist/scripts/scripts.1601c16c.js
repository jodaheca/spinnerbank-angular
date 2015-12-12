"use strict";angular.module("spinnerBankAngularApp",["ngAnimate","ngCookies","ngMessages","ngAnimate","toastr","ui.router","satellizer","ui.bootstrap","ngResource","ngRoute","ngSanitize","ngTouch","productos.controllers","productos.services","session.services","principal.controllers","asesor.controllers","LoginGoogle","usuario","Asesor","asesor.services","logOuth"]).config(["$routeProvider","$authProvider",function(a,b){a.when("/",{templateUrl:"views/Login.html",controller:"LoginCtrl",controllerAs:"LoginCtrl"}).when("/producto",{templateUrl:"views/Producto.html",controller:"prodControler",controllerAs:"ProdCtrl"}).when("/salir",{templateUrl:"views/Login.html",controller:"logOuthCont",controllerAs:"LogOutCtrl"}).when("/nuevoProducto",{templateUrl:"views/NuevoProducto.html",controller:"nuevoProducto",controllerAs:"ProdCtrl"}).when("/Principal",{templateUrl:"views/Principal.html",controller:"principalCtrl",controllerAs:"PrincipalCtrl"}).when("/asesor",{templateUrl:"views/InfoAsesor.html",controller:"AsesorCtrl",controllerAs:"AsesorCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("productos.controllers",["productos.services","usuario"]).controller("prodControler",["$scope","ApiProductos","$modal","$location","UsuarioService",function(a,b,c,d,e){a.id=54896257,a.cod=1,a.imagenPersonal=e.getImagen(),a.nombre=e.getNombre(),a.tokenApi=e.getAccess_token(),console.log("El token es: "+a.tokenApi),b.obtenerProductos2(a.tokenApi,a.id).success(function(b){a.productos=b,console.log(b)}).error(function(b,c){a.productos="",console.log(b)}),a.obtenerId=function(){return 1936941186},a.detalles=function(a){c.open({templateUrl:"views/Detalle.html",controller:"modalControler",resolve:{producto:function(){return a}},size:"ls"})},a.nuevoProducto=function(){d.url("/nuevoProducto")}}]).controller("modalControler",["$scope","$modalInstance","ApiProductos","producto","UsuarioService",function(a,b,c,d,e){a.tokenApi=e.getAccess_token(),c.detalleMovimientos2(a.tokenApi,d.productId).success(function(b){a.detalles=b,a.productSelected=d}),a.salirDetalle=function(){b.close()}}]).controller("nuevoProducto",["$scope","$location","ApiProductos","$modal","toastr","UsuarioService",function(a,b,c,d,e,f){var g;a.nombres=[],a.tipos=[],a.options2=[],a.tokenApi=f.getAccess_token(),a.email=f.getCorreo(),c.obtenerNombreTipoProducto(a.tokenApi).success(function(b){for(g=0;g<b.length;g++)a.nombres.push(b[g].productName),a.tipos.push(b[g].productTypes)}).error(function(b,c){a.productos="",console.log("error: "+b)}),a.getOptions2=function(){var b=a.nombres.indexOf(a.option1),c=a.tipos[b];a.options2=c},a.enviar=function(){c.enviarSolicitud(a.tokenApi,a.option1,a.option2,a.cupo,a.email).success(function(a){console.log("success: "+a),e.success("Tu solicitud ha sido enviada, por favor revisa tu correo"),b.url("/Principal")}).error(function(a,c){console.log("error: "+a),e.success("Tu solicitud ha sido enviada, por favor revisa tu correo"),b.url("/Principal")})}}]),angular.module("productos.services",[]).factory("ApiProductos",["$http",function(a){var b="https://spinnerbank-api-external.herokuapp.com";return{detalleMovimientos:function(c){return a.get(b+"/v1/transactions/"+c,{method:"GET"})},detalleMovimientos2:function(c,d){return a.get(b+"/v2/transactions/"+d,{method:"GET",params:{jwt:c}})},obtenerProductos:function(c){return a.get(b+"/v1/products/"+c+"/CC",{method:"GET"})},obtenerProductos2:function(c,d){return a.get(b+"/v2/products/"+d+"/CC",{method:"GET",params:{jwt:c}})},obtenerNombreTipoProducto:function(c){return a.get(b+"/v2/products/type",{method:"GET",params:{jwt:c}})},enviarSolicitud:function(c,d,e,f,g){return a.get(b+"/v2/product/request",{method:"GET",params:{name:d,productType:e,amount:f,email:g}})}}}]),angular.module("session.services",[]).factory("ApiSession",["$http",function(a){var b="http://spinnerbank-api-external.herokuapp.com";return{obtenerTokenApi:function(c){return a.get(b+"/v2/oAuth2/accessToken3",{method:"get",params:{code:c}})},obtenerInfoUsuario:function(c){return a.get(b+"/v1/oAuth2/userInfo",{method:"get",params:{access_token:c}})}}}]),angular.module("asesor.services",[]).factory("ApiAsesor",["$http",function(a){var b="http://spinnerbank-api-external.herokuapp.com";return{obtenerInfoAsesor:function(c,d){return a.get(b+"/v2/customer/adviser/"+d,{method:"GET",params:{jwt:c}})}}}]),angular.module("LoginGoogle",["session.services","usuario"]).controller("LoginCtrl",["$scope","$rootScope","$location","ApiSession","toastr","UsuarioService",function(a,b,c,d,e,f){""===f.getTokenGoogle()&&(a.token=location.search.substring(27,28),""!=a.token&&(a.token=a.token+"/"+location.search.substring(29),f.setTokenGoogle(a.token),d.obtenerTokenApi(f.getTokenGoogle()).success(function(a){console.log("Data: "+a);var b=a.jwt;console.log("Token JWT: "+b),f.setAccess_token(b),d.obtenerInfoUsuario(b).success(function(a){f.setImagen(a.picture),f.setCorreo(a.email),f.setNombre(a.given_name),e.success("Bienvenido "+f.getNombre()),c.url("/Principal")}).error(function(a,b){console.log(a),e.error("Ofrecemos disculpas, por favor intententa en unos minutos")})}).error(function(a,b){console.log(a),e.error("Ofrecemos disculpas, por favor intententa en unos minutos")}))),a.login=function(){var a="email",b="116421120632-otf7afrfqtfeiqlibtlatnou8964bge0.apps.googleusercontent.com",c="http://spinnerbank-angular.herokuapp.com/",d="code",e="security_token",f="offline",g="force",h="https://accounts.google.com/o/oauth2/auth?scope="+a+"&client_id="+b+"&redirect_uri="+c+"&response_type="+d+"&state="+e+"&access_type="+f+"&approval_prompt="+g;window.location.replace(h)}}]),angular.module("principal.controllers",["usuario","asesor.services","Asesor"]).controller("principalCtrl",["$scope","$location","toastr","$modal","UsuarioService","ApiAsesor","AsesorService",function(a,b,c,d,e,f,g){a.imagenPersonal=e.getImagen(),a.nombre=e.getNombre(),a.access_token=e.getAccess_token(),a.idUsuario=1936941186,a.inforAsesor=function(){console.log("Entra al servicio infoAsesor"),f.obtenerInfoAsesor(a.access_token,a.idUsuario).success(function(a){console.log(a),g.setNombreAsesor(a.fullName),g.setTipoDocumento(a.idType),g.setNumDocumento(a.id),g.setCorreo(a.email),g.setCelular(a.cellphone),g.setLatitud(a.lat),g.setLongitud(a["long"]),g.setFotoAsesor(a.photoUrl),g.setDireccion(a.direction),b.url("/asesor")}).error(function(a,b){console.log(a),c.error("Lo sentimos, no podemos consultar la información de tu asesor")})}}]),angular.module("logOuth",["usuario"]).controller("logOuthCont",["$scope","UsuarioService","$location",function(a,b,c){b.setNombre(""),b.setImagen(""),window.location.replace("http://spinnerbank-angular.herokuapp.com/#/")}]),angular.module("asesor.controllers",["Asesor"]).controller("AsesorCtrl",["$scope","$modal","AsesorService",function(a,b,c){a.nombreAsesor=c.getNombreAsesor(),console.log(a.nombreAsesor),a.tipoDocumento=c.getTipoDocumento(),a.numDocumento=c.getNumDocumento(),a.correo=c.getCorreo(),a.celular=c.getCelular(),a.direccion=c.getDireccion(),a.fotoAsesor=c.getFotoAsesor(),a.latitud=c.getLatitud(),a.longitud=c.getLongitud(),a.myLatLng=c.getMyLatLng(),a.mapOptions={center:a.myLatLng,zoom:16,mapTypeId:google.maps.MapTypeId.ROADMAP};var d=new google.maps.Map(document.getElementById("map"),a.mapOptions);a.marker=new google.maps.Marker({position:a.myLatLng,map:d,title:"Oficina"}),a.marker.setMap(d)}]),angular.module("usuario",[]).service("UsuarioService",function(){function a(a){m=a}function b(){return m}function c(a){n=a}function d(){return n}function e(a){a=a}function f(){return o}function g(){return p}function h(a){p=a}function i(){return q}function j(a){q=a}function k(){return r}function l(a){r=a}var m="",n="",o={},p="",q="",r="";return{setTokenGoogle:a,getTokenGoogle:b,setAccess_token:c,getAccess_token:d,setUsuario:e,getUsuario:f,setImagen:h,getImagen:g,setNombre:j,getNombre:i,setCorreo:l,getCorreo:k}}),angular.module("Asesor",[]).service("AsesorService",function(){function a(){return C}function b(a){t=a}function c(){return t}function d(a){u=a}function e(){return u}function f(a){v=a}function g(){return v}function h(a){w=a}function i(){return w}function j(a){x=a}function k(){return x}function l(a){y=a}function m(){return y}function n(a){z=a}function o(){return z}function p(a){A=a}function q(){return A}function r(a){B=a}function s(){return B}var t="David",u="CC",v="468431568",w="jdavidhc94@gmail.com",x="3205090227",y="Calle x",z="-42.53332",A="-39.41298",B="",C={lat:-42.53332,lng:-39.41298};return{setNombreAsesor:b,getNombreAsesor:c,setTipoDocumento:d,getTipoDocumento:e,setNumDocumento:f,getNumDocumento:g,getMyLatLng:a,setCorreo:h,getCorreo:i,setCelular:j,getCelular:k,setDireccion:l,getDireccion:m,setFotoAsesor:r,getFotoAsesor:s,setLatitud:n,getLatitud:o,setLongitud:p,getLongitud:q}}),angular.module("spinnerBankAngularApp").run(["$templateCache",function(a){a.put("views/Detalle.html",'<div> <div class="modal-header"> <center><h1>Detalles Movimientos</h1><center> </center></center></div> <div class="modal-body"> <div class="list-group"> <center> <h2>Producto</h2> </center> <table class="table"> <tr class="btn-primary"> <th>Nombre</th> <th>Tipo Producto</th> <th>Saldo</th> </tr> <tr> <td>{{productSelected.name}}</td> <td>{{productSelected.productType}}</td> <td>{{productSelected.balance | currency:"COP$ "}}</td> </tr> </table> <center> <h2>Movimientos</h2> </center> <table class="table"> <tr class="btn-primary"> <th>Fecha </th> <th>Descripción</th> <th>valor</th> </tr> <tr ng-repeat="detalle in detalles"> <td>{{detalle.date}}</td> <td>{{detalle.description}}</td> <td>{{detalle.value | currency:"COP$ "}}</td> </tr> </table> </div> <div class="alert alert-warning text-center" ng-show="detalles.length === 0"> No hay detalles de los movimientos de este producto </div> </div> <div class="modal-footer"> <button class="btn btn-default" ng-click="salirDetalle()">Salir</button> </div> <div></div></div>'),a.put("views/InfoAsesor.html",'<div class="alert alert-warning text-center" ng-show="nombreAsesor.length === 0"> Ofrecemos disculpas aun no tienes un asesor asignado </div> <div class="jumbotron" ng-show="nombreAsesor.length != 0"> <h2>Información asesor</h2> <div> <div class="container"> <img class="images" ng-src="{{fotoAsesor}}"> </div> <h3> Nombre : {{nombreAsesor}}<br> Tipo documento : {{tipoDocumento}}<br> Número documento : {{numDocumento}}<br> Correo : {{correo}}<br> Celular : {{celular}}<br> Dirección: {{direccion}}<br> </h3> <div id="map"> </div> </div> <div></div></div>'),a.put("views/Login.html",'<div class="jumbotron"> <h1>SpinnerBank</h1> <img src="images/sober.3f648760.jpg" alt="I\'m Sober"><br><br> <p ng-grid="gridOptions"> Somos un importante participante del sistema financiero Colombiano en prestamos a caninos. Contamos con un equipo de profesionales altamente calificados, con un gran compromiso de servicio hacia nuestros clientes y usuarios, apoyados por una plataforma operativa y tecnológica altamente eficiente. </p> <div> <button class="btn btn-block btn-google-plus" ng-click="login()"> <span class="ion-social-googleplus"></span>Sign in with Google </button> </div> </div>'),a.put("views/NuevoProducto.html",'<form name="nuevaSolicitud"> <h1 align="center">Solicitud de nuevo producto</h1> <br> <div class="form-group"> <label for="nombreProducto">Nombre Producto</label> <select class="form-control" data-ng-model="option1" data-ng-change="getOptions2()" required> <option ng-repeat="nombre in nombres" value="{{nombre}}">{{nombre}}</option> </select> </div> <div class="form-group"> <label for="tipoProducto">Tipo Producto</label> <select class="form-control" data-ng-model="option2" required> <option ng-repeat="o in options2" value="{{o.productType}}">{{o.productType}}</option> </select> </div> <div class="form-group"> <label for="cupo">Cupo</label> <input type="number" class="form-control" aria-label="amount" data-ng-model="cupo" required> </div> <button type="submit" class="btn btn-default" ng-disabled="nuevaSolicitud.$invalid" ng-click="enviar()">Enviar</button> </form>'),a.put("views/Principal.html",'<div class="alert alert-warning text-center" ng-show="nombre.length === 0"> Debe <a ng-href="#/">iniciar sesión</a> con google para ver su información personal </div> <div ng-show="nombre.length != 0"> <div class="jumbotron"> <button type="button" class="btn btn-primary center-block" ng-click="inforAsesor()">Información asesor</button> <h1>{{nombre}}</h1> <div class="container"> <img class="images" ng-src="{{imagenPersonal}}"> </div> </div> </div>'),a.put("views/Producto.html",'<!-- @author Jorge Atehortua --><!-- @email jorge.atehortua@gmail.com --><!-- Esta pagina HTML sera la encargada de llamar y mostrar\n los diferentes productos que estaran contenidos en la base\n de datos y que estan relacionados con un cliente--> <div class="container"> <div class="alert alert-warning text-center" ng-show="nombre.length === 0"> Debe <a ng-href="#/">iniciar sesión</a> con google para ver sus productos </div> <div ng-show="nombre.length != 0"> <h1 align="center">Listado de productos adquiridos por el cliente.</h1>   <div class="alert alert-warning text-center" ng-show="productos.length === 0"> Usted no tiene productos registrados </div> <!-- 	tabla para mostrar los archivos  --> <table class="table"> <tr class="btn-primary"> <th>Codigo producto</th> <th>Nombre del producto</th> <th>Tipo de producto</th> <th>Saldo</th> </tr> <!-- 		Columnas de la tabla aplicandoles diversos filtros de busqueda --> <tr class="fondo" ng-repeat="item in productos" ng-click="detalles(item)"> <td>{{item.productId}}</td> <td>{{item.name}}</td> <td>{{item.productType}}</td> <td>{{item.balance | currency:"COP$ "}}</td> </tr> </table> <button type="button" class="btn btn-primary center-block" ng-click="nuevoProducto()">Solicitar nuevo producto</button> </div> </div>')}]);