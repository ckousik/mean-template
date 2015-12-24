var app = angular.module('slug',['ngRoute','ngCookies']);

app.config(function($routeProvider) {
	$routeProvider.when('/',{
		templateUrl:'./login.html',
		controller:'loginCtrl'
	})
	.when('/dash',{
		templateUrl:'./dash.html',
	});
})
.controller('loginCtrl',['$scope','$cookies','$location','$http',function($scope,$cookies,$location,$http){
	$scope.submit = function(){
		if($scope.username=='' || $scope.password=='')
			return;
		$http.post('localhost:3000/login',{"username":$scope.username, "password":$scope.password})
		.success(function(data){
			if(data.success){
				$cookies.put('token',data.token);
				$location.path('/dash');
			}else{
				alert('Unsuccessful login')
			}
		});
	}
}]);