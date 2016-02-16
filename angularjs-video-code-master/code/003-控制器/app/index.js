

var myApp = angular.module('myApp',[]);


myApp.controller('firstController',function($scope){
    $scope.number = '1111';
    $scope.expanders = [{
        title : 'Click me to expand',
        text : 'Hi there folks, I am the content that was hidden but is now shown.'
    }, {
        title : 'Click this',
        text : 'I am even better text than you have seen previously'
    }, {
        title : 'Test',
        text : 'test'
    }];
});



myApp.directive('myDir1',  function(){
	
	return {
		link: function($scope, iElm, iAttrs, controller) {
			iElm[0].onkeyup = function(){
				if(isNaN(this.value)||this.value<1||this.value>10){
					this.style.borderColor = 'red';
				}else{
					this.style.borderColor = '';
				}
			};
		}
	};
});
myApp.directive('myDir2', function(){

	return {
		restrict:'E',
		template:'<p>Hello{{number}}</>',
		controller:function($scope,$element){
			$scope.number = $scope.number+'2222';
		},
		link: function(scope, iElm, iAttrs, controller) {
			scope.number = scope.number+'333';
		},
		compile:function(iElm,iAttrs){
			return{
				pre:function preLink(scope,iElm,iAttrs){
					scope.number = scope.number + "44444 ";  
				},
				post:function(scope,iElm,iAttrs){
					scope.number = scope.number + "55555 ";  
				}
			};
		}
	};
});
myApp.directive('myDir3', function(){
	return {
		
		restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
		template:  '<div ng-transclude></div>',
		replace: true,
		transclude: true,
		controller: function($scope, $element, $attrs, $transclude) {
			var expanders  = [];
			this.gotOpened  = function(selectedExpander){
				angular.forEach(expanders,function(){
					if(selectedExpander!=expanders){
						$scope.showMe = false;
					}
				});
			};
			this.addExpander = function(expander){
				expanders.push(expander);
			};
		},

	};
});



myApp.directive('myDir4',  function(){
	
	return {
		scope: {
			title:'=expanderTitle',
		}, // {} = isolate, true = child, false/undefined = no change
		require: '^?accordion', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<div>'
                   + '<div class="title" ng-click="toggle()">{{title}}</div>'
                   + '<div class="body" ng-show="showMe" ng-transclude></div>'
                   + '</div>',
		transclude : true,
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
			scope.showMe = false;
			controller.add(scope);
			scope.toggle  = function(){
				scope.showMe = !scope.showMe;
				controller.gotOpened($scope);
			};			
		}
	};
});