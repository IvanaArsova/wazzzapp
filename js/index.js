
function initPushwoosh() {
    var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
    //if (device.platform == "Android") {
    //    registerPushwooshAndroid();
    //}

    if (device.platform == "iPhone" || device.platform == "iOS") {
        registerPushwooshIOS();
    }

    //if (device.platform == "Win32NT") {
    //    registerPushwooshWP();
    //}
}


var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //alert('bindEvents');
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        initPushwoosh();
        app.receivedEvent('deviceready');
    },



    // Update DOM on a Received Event
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);

        LoadScripts();

        callHome();
        document.addEventListener("pause", app.onPause, false);
        document.addEventListener("backbutton", app.onBackKeyDown, false);
        document.addEventListener("menubutton", app.onMenuKeyDown, false);
        document.addEventListener("searchbutton", app.onSearchKeyDown, false);
        document.addEventListener("offline", app.onOffline, false);
        document.addEventListener("online", app.onOnline, false);
        document.addEventListener("resume", app.onResume, false);

        //var pushNotification = window.plugins.pushNotification;
        //pushNotification.register(tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" });

    },

    //tokenHandler: function (result) {
    //    //$("#app-status-ul").append('<li>token: '+ result +'</li>');
    //    // Your iOS push server needs to know the token before it can push to this device
    //    // here is where you might want to send it the token for later use.

    //},

    successHandler: function (result) {
        //alert('Callback Success! Result = ' + result)
    },

    errorHandler: function (error) {
        //alert(error);
    },

    //onNotificationAPN: function (e) {
    //    if (e.alert) {
    //        //$("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
    //        // showing an alert also requires the org.apache.cordova.dialogs plugin
    //        navigator.notification.alert(e.alert);
    //    }
    //    if (e.sound) {
    //        // playing a sound also requires the org.apache.cordova.media plugin
    //        var snd = new Media(e.sound);
    //        snd.play();
    //    }
    //    if (e.badge) {
    //        pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
    //    }
    //},

    onResume: function () {
        //navigator.splashscreen.hide();
        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 2000);
        // Handle the back button
    },

    onPause: function () {
        //navigator.splashscreen.show();
        // Handle the back button
    },

    onBackKeyDown: function () {

        if (localStorage.page != "home") {
            var counter = 0;
            $('.colapseAll').each(function () {
                if ($(this).hasClass('ui-collapsible-collapsed')) {
                    counter++;
                }
            });
            if (counter == $(".colapseAll").length) {
                callAjaxHome();
            }
            else {
                $(".colapseAll").collapsible("option", "collapsed", true);
            }
        }
        else {
            if (confirm('Are you sure you want to exit the app?')) {
                navigator.app.exitApp();
            }
        }
    },

    onMenuKeyDown: function () {
        // Handle menu button
        OpenSnapper();
    },

    onSearchKeyDown: function () {
        // Handle the back button
    },

    onOffline: function () {
        //Handle offline event
    },

    onOnline: function () {
        // Handle the online event
    },

    onResume: function () {
        // Handle resume event
    }
};
