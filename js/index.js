
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

        app.receivedEvent('deviceready');
    },



    // Update DOM on a Received Event
    receivedEvent: function (id) {

        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        

        console.log('Received Event: ' + id);

        LoadScripts();

        callHome();
        //navigator.splashscreen.hide();
        //setTimeout(function () {
        //    navigator.splashscreen.hide();
        //}, 2000);
        //$(".mainImage").attr("src", getFirstImage());

        document.addEventListener("pause", app.onPause, false);
        document.addEventListener("backbutton", app.onBackKeyDown, false);
        document.addEventListener("menubutton", app.onMenuKeyDown, false);
        document.addEventListener("searchbutton", app.onSearchKeyDown, false);
        document.addEventListener("offline", app.onOffline, false);
        document.addEventListener("online", app.onOnline, false);
        document.addEventListener("resume", app.onResume, false);

        //var pushNotification = window.plugins.pushNotification;
        //pushNotification.register(app.successHandler, app.errorHandler, { "senderID": "744083827880", "ecb": "app.onNotificationGCM" });

    },

    successHandler: function (result) {
        //alert('Callback Success! Result = ' + result)
    },

    errorHandler: function (error) {
        //alert(error);
    },

    onNotificationGCM: function (e) {
        switch (e.event) {
            case 'registered':
                if (localStorage.registerID == null) {
                    if (e.regid.length > 0) {
                        console.log("Regid " + e.regid);

                        localStorage.registerID = e.regid;

                        $("#preloader").addClass("hide");
                        jQuery.ajax({
                            url: "http://wazzzapp.net/Mobile/RegisterDevice",
                            type: "POST",
                            dataType: "json",
                            data: { registerID: localStorage.registerID },
                            withCredentials: false,
                            success: function (data, status) {

                                $("#preloader").addClass("hide");
                            },
                            error: function (error) {
                            }
                        });

                        //alert('registration id = ' + e.regid);
                        var elem = document.getElementById("regID");
                        elem.value = e.regid;
                    }
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                alert(e.message);
                //$(".openDialog").trigger("click").trigger("click");
                break;


            case 'error':
                alert('GCM error = ' + e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    },



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
        //alert("menu button clicked");
        //navigator.app.backHistory();
        // Handle menu button
        //ApplySnapper();
        OpenSnapper();
    },

    onSearchKeyDown: function () {
        // Handle the back button
    },

    onOffline: function () {
        //if (confirm('Your internet connection is down. Please connect your device to the internet.')) {

        //}
        //Handle offline event
    },

    onOnline: function () {
        //callAjaxHome();
        // Handle the online event
    },

    onResume: function () {
        //navigator.splashscreen.show();
        //callAjaxHome();
        //navigator.splashscreen.hide();
        // Handle resume event
    }
};
