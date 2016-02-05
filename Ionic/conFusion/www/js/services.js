'use strict';

angular.module('conFusion.services', ['ngResource'])
  .constant("baseURL", "http://192.168.0.101:3000/")
  .factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "dishes/:id", null, {
      'update': {
        method: 'PUT'
      }
    });

  }])

  .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    return $resource(baseURL + "promotions/:id");

  }])

  .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "leadership/:id");

  }])

  .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "feedback/:id");

  }])

  .factory('favoriteFactory', ['$localStorage', function ($localStorage) {
    var favFac = {};
    var array = $localStorage.getObject("favorites", "[]");

    favFac.addToFavorites = function (index) {


       var newValue = {id: index};

      //check exist favorites array in the local storage or not
      if (array.length !== 0) {

        for (var i = 0; i < array.length; i++) {
          if (array[i].id == index) {
            console.log("this id already exists");
            return;
          }
        }
        array.push(newValue);
        console.log("new favorites array", array);
        $localStorage.storeObject("favorites", array);
      }
      else {
        console.log("local storage was empty");
        array.push(newValue);
        $localStorage.storeObject("favorites", array);
      }

    };

    favFac.deleteFromFavorites = function (index) {

      for (var i = 0; i < array.length; i++) {
        if (array[i].id == index) {
          array.splice(i, 1);
          $localStorage.storeObject("favorites", array);
        }
      }
    };

    favFac.getFavorites = function () {
      return $localStorage.getObject("favorites", "[]");
    };

    return favFac;
  }])

  .factory('$localStorage', ['$window', function ($window) {
    return {
      store: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      storeObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key, defaultValue) {
        return JSON.parse($window.localStorage[key] || defaultValue);
      }
    }
  }])

;
