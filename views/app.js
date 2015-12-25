var app = angular.module('slug',['ngRoute','ngCookies']);

app.config(function($routeProvider) {
	$routeProvider.when('/',{
		templateUrl:'./login.html',
		controller:'loginCtrl'
	})
	.when('/dash-feed',{
		templateUrl:'./dash-feed.html',
		controller:'dashFeedCtrl'
	});
})
.controller('loginCtrl',['$scope','$cookies','$location','$http',function($scope,$cookies,$location,$http){
	$scope.submit = function(){
		if($scope.username=='' || $scope.password=='')
			return;
		$http.post('https://whispering-crag-9669.herokuapp.com/login',{"username":$scope.username, "password":$scope.password})
		.success(function(data){
			if(data.success){
				
				$cookies.put('token',data.token);
				$cookies.put('displayName',data.displayName);
				$location.path('/dash-feed');
			}else{
				alert('Unsuccessful login')
			}
		});
	}
}])

.controller('dashFeedCtrl',['$scope','$cookies','$location','$http',function($scope,$cookies,$location,$http){
	this.displayName = $cookies.get('displayName');
}]);