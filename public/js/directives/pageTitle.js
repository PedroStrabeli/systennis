angular.module('systennis')
.directive('pageTitle', function ($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title
                var pageTitle = 'Systennis';
                // Title pattern
                if (toState.data && toState.data.pageTitle) title = 'Systennis | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeSuccess', listener);
        }
    }
})