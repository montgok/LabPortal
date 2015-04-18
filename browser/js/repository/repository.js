'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('repository', {
        url: '/repository',
        templateUrl: 'js/repository/repository.html'
    });
});