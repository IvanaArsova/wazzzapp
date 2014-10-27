//Dictionaries
var lanDic = { "English": 0, "German": 1 };
//var b = { "HOME": 0, "FAVOURITES": 1, "SETTINGS":2, "MAIL":3,"TAXI":4,"REFRESH APP":5 };

var myMappings = [
["HOME", "HOME"],
["FAVOURITES", "FAVORITEN"],
["SETTINGS", "EINSTELLUNGEN"],
["MAIL", "MAIL"],
["TAXI", "TAXI"],
["REFRESH APP", "AKTUALISIERE"],
["English", "Englisch"],
["German", "Deutsch"],
["Are you sure you want to add this item to favourites?", "Zu Favoriten hinzufügen?"],
["Already in Favourites", "Ist bereits bei den Favoriten"],
["Sorry! No Local Storage support", "Sorry! Lokale Speicherung wird nicht unterstützt"],
["No internet connection found. Please enable internet and Continiue.", "Keine InternetVerbindung - Verbindung herstellen und fortfahren."],
["Favourites cleared", "Favoriten löschen"],
["Can't find you geolocation.", "Kann Geolocation nicht finden."],
["Browser doesn't support geolocation.", "Browser unterstützt keine Geolocation."],
["Are you sure you want to remove this item from favourites?", "Wirklich löschen?"],
["Are you sure you want to exit the app?", "App verlassen?"]
];


function LoadScripts() {

    ApplySnapper();
    var now = new Date();
    localStorage.date = now.getDate() + "/" + (now.getMonth() + 1).toString() + "/" + now.getFullYear();
    localStorage.favs = localStorage.favs == null ? "" : localStorage.favs;
    //localStorage.favs = "";
    //alert(localStorage.favs);
    //localStorage.lang = localStorage.favs == null ? localStorage.favs : "";

    $(".link").on("vclick", function () {
        window.open($(this).attr("title"), '_system', 'location=yes');
        return false;
    });

    $("#home-btn").on("vclick", function () {
        window.location.hash = "#home";
        callAjaxHome();
        return false;
    });
    $("#favs-btn").on("vclick", function () {
        window.location.hash = "#favs";
        $("#preloader").removeClass("hide");
        callAjaxFavourites();
        show("#FavouritesContainer");
        return false;
    });
    $("#settings-btn").on("vclick", function () {
        window.location.hash = "#settings";
        show("#SettingsContainer");
        return false;
    });
    $(".refresh").on("vclick", function () {
        window.location.hash = "#home";
        callAjaxHome();
        return false;
    });
    translateApplication();

    jQuery.event.add(window, "resize", resize);
}

function resize() {
    //alert("orientation changed");
    var h = jQuery(window).height();
    var w = jQuery(window).width();
    jQuery("#HomeContainer").css({ "width": w, "height": h });
    jQuery("#HomeContainer #choose").css({ "height": h * 8 / 100 });
    jQuery("#select-choice-0-button span").css({ "height": h * 8 / 100 });
    jQuery("#select-choice-0-section-Day-button").css({ "height": "8% !important", "height": "8vh !important" });
    jQuery("#select-choice-0-section-Day").css({ "height": "8% !important", "height": "8vh !important" });

    jQuery("#SettingsContainer").css({ "width": w, "height": h });
    jQuery("#SettingsContainer .lang").css({ "width": w, "height": h / 2 });

    jQuery("#DayContainer #choose-section").css({ "height": h * 8 / 100 });
    jQuery("#select-choice-0-section-Day-button span").css({ "height": h * 8 / 100 });

    jQuery("#SettingsContainer").css({ "width": w, "height": h });
    jQuery("#SettingsContainer .lang").css({ "width": w, "height": h / 2 });

    jQuery(".homeHeader").css({ "font-size": h/25 + "px" })

}

function clearContainers() {
    $("#DayContainer").html("");
    $("#NightContainer").html("");;
    $("#HomeContainer").html("");;
    $("#FavouritesContainer").html("");
}

//Handlers
function showMainImage() {
    $("#preloader").addClass("hide");
    $("#mainImage").attr("class", "mainImage-" + localStorage.lang);
    show("#mainImage");
    $("#mainImage").on("vclick", function () {
        $("#preloader").removeClass("hide");
        //window.location.hash = "#home";
        callAjaxHome();
        show("#HomeContainer");
        return false;
    });
}

function AttachSettingsHandlers() {
    localStorage.page = "settings";
    $(".lang").click(function () {
        localStorage.lang = $(this).attr("Title");
        $("#preloader").removeClass("hide");

        translateApplication();
        showMainImage();

        //callAjaxHome();
    });
}

function AttachHomeHandlers() {
    jQuery(".day").on("vclick", function () {
        window.location.hash = "#day";
        $("#preloader").removeClass("hide");
        localStorage.type = "Day";
        callAjaxEvents("Day");
        return false;
    });
    jQuery(".night").on("vclick",
        function () {
            window.location.hash = "#night";
            $("#preloader").removeClass("hide");
            localStorage.type = "Night";
            callAjaxEvents("Night");
            return false;
        });
}

function AttachShowMoreHandlers() {
    $(".more").click(function () {
        var divShow = $(this).attr("id").split('_')[1];
        $("#" + divShow).removeClass("hide");
        $(this).addClass("hide");
    });
}

function AttachAddToFavouritesHandlers() {

    $(".addToFavourites").on("vclick", function () {
        var favID = $(this).attr("id").split('_')[0];
        navigator.notification.confirm(
            Translate(8),
            function (button) {
                if (button == 1) {
                    addIt(favID);
                }
            },
            "WazzzApp Frankfurt",
            "Ok,Cancel");
    });

    
    //$(".addToFavourites").on("vclick", function () {
    //    if (navigator.notification.confirm(Translate(8), function (button) {
    //        if (button == "Ok") {
    //        if (typeof (Storage) !== "undefined") {
    //            var favID = $(this).attr("id").split('_')[0];
    //            if (!checkIfInLocalStorage(favID)) {
    //                var items = localStorage.favs;
    //                items = items + favID + ';';
    //                localStorage.favs = items;
    //    }
    //    else { navigator.notification.alert(Translate(9), function () { }, "WazzApp Frankfurt", "Ok"); }
    //    }
    //    else {
    //                navigator.notification.alert(Translate(10), function () { }, "WazzApp Frankfurt", "Ok");
    //    }
    //    }
    //    }, "WazzApp Frankfurt", "Ok,Cancel")) {

    //    }
    //});
}

function addIt(id) {
    if (typeof (Storage) !== "undefined") {
        var favID = id;
        if (!checkIfInLocalStorage(favID)) {
            var items = localStorage.favs;
            items = items + favID + ';';
            localStorage.favs = items;
        }
        else {
            navigator.notification.alert(Translate(9), function () { }, "WazzApp Frankfurt", "Ok");
        }
    }
    else {
        navigator.notification.alert(Translate(10), function () { }, "WazzApp Frankfurt", "Ok");
    }
}

function AttachBackButton() {
    $(".back-button").off("vclick").on("vclick", Back );
}

function Back() {
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
}
function AttachExitButton() {
    e.preventDefault();
    (".exit-button").off("vclick").on("vclick", AskToExit);
}

function AskToExit() {
    navigator.notification.confirm(
            Translate(16),
            ExitApp,
            "WazzzApp Frankfurt",
            "Ok,Cancel");
}

function ExitApp(button) {
    if (button == 1)
    {
        navigator.app.exitApp();
    }
}

function AttachRemoveFromFavouritesHandlers() {
    $(".removeFromFavourites").on("vclick", function () {
        navigator.notification.confirm(Translate(15), function (button) {
            if (button == 1) {
                if (typeof (Storage) !== "undefined") {
                    var favID = $(this).attr("id").split('_')[0];

                    var items = ";" + localStorage.favs;
                    items = items.replace(";" + favID + ";", ";");
                    localStorage.favs = items.substring(1, items.length);
                    $("#" + favID + "_" + $(this).attr("id").split('_')[1]).addClass("hide");
                }
                else {
                    navigator.notification.alert(Translate(10), function () { }, "WazzApp Frankfurt", "Ok");
                }
            }
        },
        "WazzzApp Frankfurt",
        "Ok,Cancel");
    });
}

function Translate(text) {
    var lan = localStorage.lang;
    var lanID = lanDic[lan];
    //var baseNameID = b[text];
    return myMappings[text][lanID];
}

function translateApplication() {
    $(".translate").each(function () {
        var toTranslate = parseInt($(this).attr("id"));
        $(this).html(Translate(toTranslate));
    })
}

function attachSelects() {
    $(".select").trigger("create");
}

function getOrientation(aspect) {
    if (aspect > 1) {
        return "portrait";
    }
    else {
        return "landscape";
    }
}

function getAspect(pixelRatio) {
    if (pixelRatio >= 0.5 && pixelRatio <= 0.9) {
        return "ldpi";
    }
    else if (pixelRatio > 0.9 && pixelRatio <= 1.4) {
        return "mdpi";
    }
    else if (pixelRatio > 1.4 && pixelRatio <= 1.9) {
        return "hdpi";
    }
    else if (pixelRatio > 1.9 && pixelRatio <= 2.9) {
        return "xdpi";
    }
    else {
        return "xhdpi";
    }
}

function getFirstImage() {
    var lang = localStorage.lang;
    var aspect = window.screen.availHeight / window.screen.availWidth;
    var pixelRatio = window.devicePixelRatio;

    localStorage.aspect = aspect;

    var image = "images/startImage/" + lang + "_" + getOrientation(aspect) + "_" + getAspect(pixelRatio) + ".png";
    //alert(image);
    return image;

}

//Ajax
function callHome() {
    if (localStorage.lang == "" || localStorage.lang == null) {
        show("#SettingsContainer");
        $("#preloader").addClass("hide");
    }
    else {
        showMainImage();
        //callAjaxHome();
    }
}

function callAjaxHome() {
    localStorage.page = "home";
    $("#wrap-container").removeClass("otherPage").addClass("homePage");

    //alert("Ajax call=Home, Language=" + localStorage.lang + ", Type=Unknown, Date=" + localStorage.date + "");
    jQuery.ajax({
        url: "http://wazzzapp.net/Mobile/GetHome",
        type: "GET",
        dataType: "json",
        data: { date: localStorage.date, lang: localStorage.lang, platform: "ios" },
        withCredentials: false,
        success: function (data, status) {
            clearContainers();
            $("#HomeContainer").html(data["content"]);
            AttachHomeHandlers();
            attachSelects();
            attachSelectChangeHandler()
            show("#HomeContainer");
            $("#preloader").addClass("hide");
            ApplySnapper();
            CloseSnapper();
            AttachExitButton();
        },
        error: function (error) {
            //console.log('error');
            //console.log(error);

            navigator.notification.confirm(Translate(11),
                function (button) {
                callAjaxHome();
                $("#preloader").addClass("hide");
            },
        "WazzzApp Frankfurt",
        "Ok,Cancel");
        }
    });
}

function callAjaxFavourites() {
    var favs = localStorage.favs;
    var date = localStorage.date;
    var lang = localStorage.lang;
    localStorage.page = "favs";
    if (favs != "")
        favs = favs.slice(0, -1);

    if (navigator.geolocation) {
        var options = { enableHighAccuracy: true, timeout: 5000 }; // also try with false.
        navigator.geolocation.getCurrentPosition(function onSuccess(position) {
            var myLat = position.coords.latitude;
            var myLong = position.coords.longitude;
            jQuery.ajax({
                url: "http://www.wazzzapp.net/Mobile/getFavourites",
                type: "GET",
                data: { type: "Day", lang: lang, longi: myLong, lati: myLat, favs: favs, platform: "ios" },
                dataType: "json",
                withCredentials: true,
                success: function (data, status) {
                    clearContainers();
                    $("#FavouritesContainer").html(data["content"]);
                    ApplySnapper();
                    CloseSnapper();
                    AttachRemoveFromFavouritesHandlers();
                    attachClearFavouritesHandler()
                    attachEventHandlers();
                    AttachBackButton();
                    //SocialSharing();
                    $("#preloader").addClass("hide");
                },
                error: function (error) {
                    //console.log(error);
                    navigator.notification.confirm(Translate(11), function (button) {
                        callAjaxFavourites();
                    },
                        "WazzzApp Frankfurt",
                        "Ok,Cancel");
                }
            });
        },
        function (err) {
            navigator.notification.alert(Translate(13), function () { }, "WazzzApp Frankfurt", "Ok");
            jQuery.ajax({
                url: "http://www.wazzzapp.net/Mobile/getFavourites",
                type: "GET",
                data: { type: "Day", lang: lang, longi: "", lati: "", favs: favs, platform: "ios" },
                dataType: "json",
                withCredentials: true,
                success: function (data, status) {
                    clearContainers();
                    $("#FavouritesContainer").html(data["content"]);
                    ApplySnapper();
                    CloseSnapper();
                    AttachRemoveFromFavouritesHandlers();
                    attachClearFavouritesHandler()
                    attachEventHandlers();
                    AttachBackButton();
                    $("#preloader").addClass("hide");
                },
                error: function (error) {
                    navigator.notification.confirm(Translate(11), function (button) {
                        callAjaxFavourites();
                    },
                        "WazzzApp Frankfurt",
                        "Ok,Cancel");
                }
            });
        },
        options
        );
    }
    else {
        navigator.notification.alert(Translate(14), function () { }, "WazzzApp Frankfurt", "Ok");
        jQuery.ajax({
            url: "http://www.wazzzapp.net/Mobile/getFavourites",
            type: "GET",
            data: { type: "Day", lang: lang, longi: "", lati: "", favs: favs, platform: "ios" },
            dataType: "json",
            withCredentials: true,
            success: function (data, status) {
                clearContainers();
                $("#FavouritesContainer").html(data["content"]);
                ApplySnapper();
                CloseSnapper();
                AttachRemoveFromFavouritesHandlers();
                attachClearFavouritesHandler()
                attachEventHandlers();
                AttachBackButton();
                $("#preloader").addClass("hide");
            },
            error: function (error) {
                navigator.notification.confirm(Translate(11), function (button) {
                    callAjaxFavourites();
                },
                        "WazzzApp Frankfurt",
                        "Ok,Cancel");
            }
        });
    }



    $(".cleanFav").click(function () {
        localStorage.removeItem('favs');
        navigator.notification.alert(Translate(12), function () { }, "WazzzApp Frankfurt", "Ok");
    });

}

function callAjaxEvents(tip) {
    //getUrlVars();
    getLocationAndData(tip);
}

function callFullAjax(tip, myLong, myLat, date, lang) {
    localStorage.page = "page";
    //alert("Ajax call=FullAjax, Language=" + localStorage.lang + ", Type=" + tip + ", Unknown, Date=" + localStorage.date + "");
    jQuery.ajax({
        type: "POST",
        url: "http://www.wazzzapp.net/Mobile/GetCategories",
        crossDomain: true,
        //beforeSend : function() {$.mobile.loading('show')},
        //complete : function() {$.mobile.loading('hide')},
        data: { date: date, type: tip, lang: lang, longi: myLong, lati: myLat, platform: "ios" },
        dataType: 'json',
        success: function (data) {
            clearContainers();
            if (tip == "Day") {
                $("#DayContainer").html(data["content"]);
                show("#DayContainer");
            }
            else {
                $("#NightContainer").html(data["content"]);
                show("#NightContainer");
            }
            attachSelects();
            attachSelectChangeHandler();
            //AttachHomeHandlers();
            ApplyAccordion(".accordion");
            ApplySnapper();
            CloseSnapper();
            AttachShowMoreHandlers();
            attachEventHandlers();
            AttachBackButton();
            AttachAddToFavouritesHandlers();

            //SocialSharing();
            $("#preloader").addClass("hide");

        },
        error: function () {
            //console.log('error');
            //console.log(error);
            navigator.notification.alert(Translate(14), function (button) { 
                callFullAjax(tip, myLong, myLat, date, lang);
            }, "WazzzApp Frankfurt", "Ok");
        }
    });
}

function callShortAjax(tip, date, lang) {
    localStorage.page = "page";
    //alert("Ajax call=ShortAjax, Language=" + localStorage.lang + ", Type=" + tip + ", Unknown, Date=" + localStorage.date + "");
    jQuery.ajax({
        type: "GET",
        url: "http://www.wazzzapp.net/Mobile/GetCategories",
        crossDomain: true,
        //beforeSend : function() {$.mobile.loading('show')},
        //complete : function() {$.mobile.loading('hide')},
        //data: { date:date, type : section, lang:lang},
        data: { date: date, type: tip, lang: lang, platform: "ios" },
        dataType: 'json',
        success: function (data) {
            clearContainers();
            if (tip == "Day") {
                $("#DayContainer").html(data["content"]);
                show("#DayContainer");
            }
            else {
                $("#NightContainer").html(data["content"]);
                show("#NightContainer");
            }
            //AttachHomeHandlers();
            attachSelects();
            attachSelectChangeHandler();
            ApplyAccordion(".accordion");
            ApplySnapper();
            CloseSnapper();
            AttachShowMoreHandlers();
            AttachAddToFavouritesHandlers();
            attachEventHandlers();
            AttachBackButton();
            //SocialSharing();
            $("#preloader").addClass("hide");

        },
        error: function () {
            //console.log('error');
            //console.log(error);

            navigator.notification.alert(Translate(11), function (button) {
                callShortAjax(tip, date, lang);
            }, "WazzzApp Frankfurt", "Ok");
        }
    });
    //alertError();
}

//Helper functions

function ApplyAccordion(div) {
    $(div).trigger("create", { defaults: true });
}

function show(container) {
    $("#DayContainer").addClass("hide").removeClass("container");
    $("#NightContainer").addClass("hide").removeClass("container");
    $("#SettingsContainer").addClass("hide").removeClass("container");
    $("#HomeContainer").addClass("hide").removeClass("container");
    $("#FavouritesContainer").addClass("hide").removeClass("container");
    $("#mainImage").addClass("hide").removeClass("container");

    $(container).removeClass("hide").addClass("container m0 p0");
    if (container == "#SettingsContainer")
        AttachSettingsHandlers();
    //if (container == "#DayContainer" || container == "#NightContainer")
    //    AttachDayNightHandlers();

    //ApplySnapper();
    CloseSnapper();
    //$("#preloader").addClass("hide");
}

function getLocationAndData(tip) {
    var date = localStorage.date;
    var lang = localStorage.lang;

    //alert(navigator.geolocation == );
    if (navigator.geolocation) {
        //alert("inside navigator");
        var options = { enableHighAccuracy: true, timeout: 5000 }; // also try with false.
        navigator.geolocation.getCurrentPosition(function onSuccess(position) {
            var myLat = position.coords.latitude;
            var myLong = position.coords.longitude;
            //alert("success," + myLat, +myLong);
            callFullAjax(tip, myLong, myLat, date, lang);
        },
        function (err) {
            navigator.notification.alert(Translate(13), function () { }, "WazzzApp Frankfurt", "Ok");
            callShortAjax(tip, date, lang);
        },
        options
        );
    }
    else {
        navigator.notification.alert(Translate(14), function () { }, "WazzzApp Frankfurt", "Ok");
        callShortAjax(tip, date, lang);
    }
}

function CloseSnapper() {
    var snapper = new Snap({
        element: document.getElementById('content')
    });
    snapper.close();
}

function OpenSnapper() {
    var snapper = new Snap({
        element: document.getElementById('content')
    });

    if (snapper.state().state == "left") {
        snapper.close();
    } else {
        snapper.open('left');
    }

    return false;
}

function ApplySnapper() {

    var snapper = new Snap({
        element: document.getElementById('content')
    });


    $('.flat-menu').on("vclick", function () {
        snapper.open('left');
        return false;
    });


    $('.sidebar-header').on("vclick", function () {
        snapper.close();
        return false;
    });

    $('.deploy-sidebar,  .close-icon').on("vclick", function () {
        if (snapper.state().state == "left") {
            snapper.close();
        } else {
            snapper.open('left');
        }
        return false;
    });
}

function fadePreloader() {
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
}

function SocialSharing() {
    SocialSharing.prototype.available = function (callback) {
        cordova.exec(function (avail) {
            callback(avail ? true : false);
        }, null, "SocialSharing", "available", []);
    };

    SocialSharing.prototype.share = function (message, subject, image, url, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SocialSharing", "share", [message, subject, image, url]);
    };

    SocialSharing.prototype.shareViaWhatsApp = function (message, image, url, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SocialSharing", "shareViaWhatsApp", [message, null, image, url]);
    };

    SocialSharing.prototype.canShareVia = function (via, message, subject, image, url, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SocialSharing", "canShareVia", [message, subject, image, url, via]);
    };

    SocialSharing.install = function () {
        if (!window.plugins) {
            window.plugins = {};
        }

        window.plugins.socialsharing = new SocialSharing();
        return window.plugins.socialsharing;
    };
    cordova.addConstructor(SocialSharing.install);
}

function hideShowArrows() {
    //plus
    if ($("#mydate").val() == (startDate.getDate() + 1 + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear())) {
        $("#dateMinus").css('visibility', 'visible');
    }

    if ($("#mydate").val() == (startDate.getDate() + 3 + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear())) {
        $("#datePlus").css('visibility', 'hidden');
    }

    //minus
    $("#datePlus").css('visibility', 'visible');

    if ($("#mydate").val() == (startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear())) {
        $("#dateMinus").css('visibility', 'hidden');
    }
}

function checkIfInLocalStorage(favID) {
    var favs = localStorage.favs;
    var favsLength = favs.split(';').length - 1;
    var exist = false;

    for (var i = 0; i < favsLength; i++) {

        if (favID == favs.split(";")[i]) {
            exist = true;
        }
    }

    return exist;
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function attachSelectChangeHandler() {
    $("#select-choice-0").change(function () {
        var selectedDate = $(this).find(":selected").val();
        localStorage.date = selectedDate;
    });

    $("#select-choice-0-section-Day").change(function () {
        var selectedDate = $(this).find(":selected").val();
        localStorage.date = selectedDate;

        $("#preloader").removeClass("hide");
        callAjaxEvents("Day");
    });

    $("#select-choice-0-section-Night").change(function () {
        var selectedDate = $(this).find(":selected").val();
        localStorage.date = selectedDate;

        $("#preloader").removeClass("hide");
        callAjaxEvents("Night");
    });
}

function attachClearFavouritesHandler() {
    $(".clear-fav").on("vclick", function () {
        localStorage.favs = "";
        callAjaxFavourites();
    })
}

function attachEventHandlers() {
    $('.translateOnGoogle').on('vclick', function () {
        url = $(this).attr("rel");
        window.open(url, '_system', 'location=yes');
    });
}

