'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Device Status', state: 'device' },
                { label: 'IOS Repository', state: 'repository' },
                { label: 'Config Admin', state: 'admin' },
                { label: 'Scheduler', state: 'scheduler' },
                { label: 'Topology Diagrams', state: 'topology' },
                { label: 'Message Board', state: 'message' },
                { label: 'Wiki', state: 'wiki' },
                { label: 'How To', state: 'howTo' }
               // { label: 'Tutorial', state: 'tutorial' },
               // { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});