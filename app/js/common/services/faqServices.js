angular.module('app')
.factory('faqcontents', function () {
    var faqcategories = [
        { id: 1, name: 'Basics', link: 'basics', icon: 'favorite_border' },
        { id: 2, name: 'LUX Coin', link: 'coin', icon: 'attach_money' },
        { id: 3, name: 'ADs', link: 'ads', icon: 'store' },
        { id: 4, name: 'Business', link: 'business', icon: 'business' },
        { id: 5, name: 'Gamification', link: 'gamification', icon: 'videogame_asset' },
        { id: 6, name: 'Privacy & Security', link: 'privacy', icon: 'fingerprint' }

    ];

    var faqquestions = [
        { 
            category: 1,
            position: 1,
            qustion: 'What is Luxore?',
            answer: 'Luxore is a project of a decentralized social network that rewards its users by placing ads and distributing the revenue among the participants. The initial ditribution is:'
        },
    ];

    return {
        getQuestions: function (cat) { return faqquestions.filter(function (c) { return c.category === cat; })[0]; },
        getCategory: function (id) { return faqcategories.filter(function (c) { return c.id === id; })[0]; }
    };
});