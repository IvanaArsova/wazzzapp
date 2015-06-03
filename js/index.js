
function initPushwoosh() {
    var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");

    //set push notification callback before we initialize the plugin
    document.addEventListener('push-notification', function (event) {
        //get the notification payload
        var notification = event.notification;

        //display alert to the user for example
        //alert(notification.aps.alert);
        navigator.notification.alert(notification.aps.alert, function () { }, "WazzzApp Frankfurt", "Ok");

        //clear the app badge
        pushNotification.setApplicationIconBadgeNumber(0);
    });

    //initialize the plugin
    pushNotification.onDeviceReady({ pw_appid: "EB9A6-5654D" });

    //register for pushes
    pushNotification.registerDevice(
        function (status) {
            var deviceToken = status['deviceToken'];
            console.warn('registerDevice: ' + deviceToken);
        },
        function (status) {
            console.warn('failed to register : ' + JSON.stringify(status));
            alert(JSON.stringify(['failed to register ', status]));
        }
    );

    //reset badges on app start
    pushNotification.setApplicationIconBadgeNumber(0);
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

    onPause: function () {
        //navigator.splashscreen.show();
        // Handle the back button
    },

    onBackKeyDown: function () {
        e.preventDefault();
        if (!$("#preloader").hasClass('hide')) {
            $("#preloader").addClass('hide');
        }
        else {
            if (localStorage.page == "page") {
                if ($(".colapseAll:not(.ui-collapsible-collapsed)").length > 0) {
                    $(".colapseAll").collapsible("option", "collapsed", true);
                }
                else {
                    $("#preloader").removeClass("hide");
                    callAjaxHome();
                }
            }
            else if (localStorage.page != "home") {
                $("#preloader").removeClass("hide");
                callAjaxHome();
            }
            else {
                if (confirm(Translate(16))) {
                    navigator.app.exitApp();
                }
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
        $("#preloader").addClass("hide");
    }
};
