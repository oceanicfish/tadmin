/**
 * Created by yangwei on 10/10/2015.
 */
var app = angular.module('loginApp', []);

app.controller('loginController',[ '$http','$location', function($http,$location){

    var ds = this;

    ds.notice = "Sign in to start your session";
}]);