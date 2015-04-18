'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('wiki', {
        url: '/wiki',
        templateUrl: 'js/wiki/wiki.html'
    });
});