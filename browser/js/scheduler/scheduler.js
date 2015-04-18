'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('scheduler', {
        url: '/scheduler',
        templateUrl: 'js/scheduler/scheduler.html'
    });
});