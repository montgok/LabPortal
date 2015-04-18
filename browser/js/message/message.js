'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('message', {
        url: '/message',
        templateUrl: 'js/message/message.html'
    });
});