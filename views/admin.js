var app = angular.module('slugadmin',['ngRoute','ngCookies']);

app.config(function($routeProvider) {
	$routeProvider.when('/',{
		templateUrl:'./login.html'
	}).when('/events',{
		templateUrl:'./events.html'
	})
})
.controller('loginCtrl',['$scope','$location','$http','$cookies',function($scope,$location,$http,$cookies) {
	$scope.submit = function(){
		if($scope.username=='' || $scope.password=='')
			return;
		$http.post('https://whispering-crag-9669.herokuapp.com/admin/login',{"username":$scope.username, "password":$scope.password})
		.success(function(data){
			if(data.success){
				$cookies.put('token',data.token);
				$cookies.put('displayName',data.displayName);
				$location.path('/events');
			}else{
				alert(data.error);
			}
		});
	}
}])
.controller('eventCtrl',['$scope','$location','$http','$cookies',function($scope,$location,$http,$cookies){
	$scope.events = []
	$http.post()
}]);