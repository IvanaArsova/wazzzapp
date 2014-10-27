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
];


function LoadScripts() {
    ApplySnapper();
    var now = new Date();
    localStorage.date = now.getDate() + "/" + (now.getMonth() + 1).toString() + "/" + now.getFullYear();
    localStorage.favs = localStorage.favs == null ? "" : localStorage.favs;
    //localStorage.favs = "";
    //alert(localStorage.favs);
    //localStorage.lang = localStorage.favs == null ? localStorage.favs : "";
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

    jQuery.event.add(window, "load", resize);
    jQuery.event.add(window, "resize", resize);
    
    translateApplication();
}

function resize() {
    alert("orientation changed");
    var h = jQuery(window).height();
    var w = jQuery(window).width();
    jQuery("body").css({ "width": w, "height": h });
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
        if (confirm("Are you sure you want to add this item to favourites")) {
            if (typeof (Storage) !== "undefined") {
                var favID = $(this).attr("id").split('_')[0];
                if (!checkIfInLocalStorage(favID)) {
                    var items = localStorage.favs;
                    items = items + favID + ';';
                    localStorage.favs = items;
                    //alert("Added to Favourites");
                }
                else {
                    alert("Already in Favourites");
                }
            }
            else {
                alert("Sorry! No Local Storage support..");
            }
        }
    });
}

function AttachRemoveFromFavouritesHandlers() {
    $(".removeFromFavourites").on("vclick", function () {
        if (confirm("Are you sure you want to remove this item to favourites")) {
            if (typeof (Storage) !== "undefined") {
                var favID = $(this).attr("id").split('_')[0];

                var items = ";" + localStorage.favs;
                items = items.replace(";" + favID + ";", ";");
                localStorage.favs = items.substring(1, items.length);
                $("#" + favID + "_" + $(this).attr("id").split('_')[1]).addClass("hide");
            }
            else {
                alert("Sorry! No Local Storage support..");
            }
        }
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
    alert(image);
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
            data: { date: localStorage.date, lang: localStorage.lang },
            withCredentials: false,
            success: function (data, status) {
                $("#HomeContainer").html(data["content"]);
                AttachHomeHandlers();
                attachSelects();
                attachSelectChangeHandler()
                show("#HomeContainer");
                $("#preloader").addClass("hide");
                ApplySnapper();
                CloseSnapper();
            },
            error: function (error) {
                //console.log('error');
                //console.log(error);
                if (confirm('No internet connection found. Please enable internet and Continiue.'))
                    callAjaxHome();
                else callAjaxHome();
                $("#preloader").addClass("hide");
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

    jQuery.ajax({
        url: "http://www.wazzzapp.net/Mobile/getFavourites",
        type: "GET",
        data: { type: "Day", lang: lang, longi: "", lati: "", favs:favs },
        dataType: "json",
        withCredentials: true,
        success: function (data, status) {
            //$("#wrap-container").removeClass("homePage").addClass("otherPage");
            $("#FavouritesContainer").html(data["content"]);
            ApplySnapper();
            CloseSnapper();
            AttachRemoveFromFavouritesHandlers();
            attachClearFavouritesHandler()
            SocialSharing();
            $("#preloader").addClass("hide");
        },
        error: function (error) {
            //console.log(error);
            if (confirm('No internet connection found. Please enable internet and Continiue.'))
                callAjaxFavourites();
            else callAjaxFavourites();
        }
    });

    $(".cleanFav").click(function () {
        localStorage.removeItem('favs');
        alert("cleared");
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
        type       : "POST",
        url: "http://www.wazzzapp.net/Mobile/GetCategories",
        crossDomain: true,
        //beforeSend : function() {$.mobile.loading('show')},
        //complete : function() {$.mobile.loading('hide')},
        data: { date:date, type : tip, lang:lang, longi:myLong, lati:myLat},
        dataType:'json',
        success: function (data) {
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
            AttachAddToFavouritesHandlers();
            
            SocialSharing();
            $("#preloader").addClass("hide");
            
        },
        error: function () {
            //console.log('error');
            //console.log(error);
            if (confirm('No internet connection found. Please enable internet and Continiue.'))
                callFullAjax(tip, myLong, myLat, date, lang);
            else callFullAjax(tip, myLong, myLat, date, lang);
        }
    });
}

function callShortAjax(tip, date, lang) {
    localStorage.page = "page";
    //alert("Ajax call=ShortAjax, Language=" + localStorage.lang + ", Type=" + tip + ", Unknown, Date=" + localStorage.date + "");
    jQuery.ajax({
        type       : "GET",
        url: "http://www.wazzzapp.net/Mobile/GetCategories",
        crossDomain: true,
        //beforeSend : function() {$.mobile.loading('show')},
        //complete : function() {$.mobile.loading('hide')},
        //data: { date:date, type : section, lang:lang},
        data: { date: date, type: tip, lang: lang },
        dataType:'json',
        success: function(data) {
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
            
            SocialSharing();
            $("#preloader").addClass("hide");
            
        },
        error : function() {
            //console.log('error');
            //console.log(error);
            if (confirm('No internet connection found. Please enable internet and Continiue.'))
                callShortAjax(tip, date, lang);
            else callShortAjax(tip, date, lang);
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
    if ( navigator.geolocation )
    {
        //alert("inside navigator");
        var options = { enableHighAccuracy: true, timeout:5000 }; // also try with false.
        navigator.geolocation.getCurrentPosition(function onSuccess(position) {
            var myLat = position.coords.latitude;
            var myLong = position.coords.longitude;
            //alert("success," + myLat, +myLong);
            callFullAjax(tip, myLong, myLat, date, lang);
        },
        function (err) {
            alert("Can't find you geolocation.");
            callShortAjax(tip, date, lang);
        },
        options
        );
    }
    else
    {
        alert("Browser doesn't support geolocation.");
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

    $('.sidebar-header').on("vclick",function () {
        snapper.close();
        return false;
    });

    $('.deploy-sidebar,  .close-icon').on( "vclick", function () {
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

        if (favID == favs.split(";")[i])
        {
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

$('.translateOnGoogle').on('vclick', function () {
    url = $(this).attr("rel");
    loadURL(url);
});

function loadURL(url) {
    navigator.app.loadUrl(url, { openExternal: true });
    return false;
}

