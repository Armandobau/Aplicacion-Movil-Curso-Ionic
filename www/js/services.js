'use strict';

angular.module('conFusion.services',['ngResource'])
        //.constant("baseURL","http://localhost:3000/")
        .constant("baseURL","http://192.168.1.108:3000/")


        .factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

            return $resource(baseURL + "dishes/:id", null, {'update': {method: 'PUT'}});

        }])



        .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            
            return $resource(baseURL + "promotions/:id");

        }])



        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            return $resource(baseURL+"leadership/:id");
    
        }])



        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            return $resource(baseURL+"feedback/:id");
    
        }])



        .factory('favoriteFactory', ['$resource', 'baseURL', '$localStorage', function ($resource, baseURL, $localStorage) {
            var favFac = {};
            //var favorites = [];
            var favorites = $localStorage.getObject('choosen','[]');
            

            favFac.addToFavorites = function (index) {
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == index)
                        return;
                }
                favorites.push({id: index});
                //-------
                $localStorage.storeObject('choosen', favorites);
            };
            
            
            
            favFac.deleteFromFavorites = function (index) {
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == index) {
                        favorites.splice(i, 1);
                        //--------
                        $localStorage.storeObject('choosen', favorites);
                    }
                }
            };

            
            favFac.getFavorites = function () {
                return favorites;
            };

            
            return favFac;
        }])




        .factory('$localStorage', ['$window', function($window) {
            return {
                store: function(key, value) {
                    $window.localStorage[key] = value;
                },
                get: function(key, defaultValue) {
                    return $window.localStorage[key] || defaultValue;
                },
                storeObject: function(key, value) {
                    $window.localStorage[key] = JSON.stringify(value);
                },
                getObject: function(key,defaultValue) {
                    return JSON.parse($window.localStorage[key] || defaultValue);
                }
              }
        }])






;
