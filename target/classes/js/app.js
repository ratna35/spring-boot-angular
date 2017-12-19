'use strict';
 
var app = angular.module('app', [ 'ngFileUpload' ]);
 
app.factory('Model', function($resource) {
  return $resource('api/upload');
});
 
app.controller('SubmitFileCtrl', function ($scope, Upload, $timeout) {
  $scope.uploadFile = function(file) {
  file.upload = Upload.upload({
    url: 'upload',
    data: {file: file },
  });
  file.upload.then(function (response) {
    $timeout(function () {
    file.result = response.data;
    });
  }, function (response) {
    if (response.status > 0)
    $scope.errorMsg = "Server Error! ("+response.data+")";
  }, function (evt) {
    // Math.min is to fix IE which reports 200% sometimes
    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
  });
  }
});
 