
function LoadFavoritesScripts () {	

    $("#status").fadeIn();
    $("#test").hide();

    $(document).ready(function(){
        $("#status").fadeOut(); // will first fade out the loading animation
        $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
	
		
        $(".cleanFav").click(function(){
            localStorage.removeItem('favs')
            alert("cleared");
        });
    });

    var favs = localStorage.getItem("favs");

    var date=localStorage.getItem("date");
    var lang = localStorage.getItem("lang");
    jQuery.ajax({
        url: "http://www.wazzzapp.net/Mobile/getFavourites?lang="+lang+"&favs="+favs,
        type: "GET",
        dataType: "json",
        withCredentials: true,
        success: function (data, status) 
        {
    
            var content = data.content;
            var htmlData="";
            console.log('success');
            console.log(data);
		
		
            $("#favs").html(data.content);
	
            $("#status").fadeOut(); // will first fade out the loading animation
            $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
		
		
		
		
            $('.remove').click(function()
            {
                var favs;
                var leng;
                leng = (localStorage.getItem("favs", favs).split(";").length)-1;
                //alert(leng);
                var exist=1;
				
                var items = localStorage.getItem("favs", favs);
                localStorage.removeItem('favs');
				
                var newItems="";
                for(var i=0; i<leng; i++)
                {
					
                    if($(this).attr("id") != items.split(";")[i])
                    {
                        newItems = newItems + items.split(";")[i] + ";";
                    }
					
					
                }
				
                alert("Favourite removed");
                localStorage.setItem("favs", newItems);
                window.location.href = "favs.html";
            });
		
		
            function SocialSharing() {
            }

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
        },
        error: function (error) 
        {
            console.log('error');
            console.log(error);
        }
    });

}

function LoadIndexScripts () {	  
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
	
    var startDate = new Date();	
    var now = new Date();


		
    $("#mydate").val(now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear());
    localStorage.setItem("date", $("#mydate").val());
	

    $("#datePlus").click(function(){
        now.setDate(now.getDate()+1);
        $("#mydate").val(now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear());
        localStorage.setItem("date", $("#mydate").val());
		
        if($("#mydate").val() == (startDate.getDate()+1 + "/" + (startDate.getMonth()+1) + "/" + startDate.getFullYear()))
        {
            $("#dateMinus").css('visibility','visible');
        }
		
        if($("#mydate").val() == (startDate.getDate()+3 + "/" + (startDate.getMonth()+1) + "/" + startDate.getFullYear()))
        {
            $("#datePlus").css('visibility','hidden');
        }
    });
	
    $("#dateMinus").click(function(){
        now.setDate(now.getDate()-1);
        $("#mydate").val(now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear());
        localStorage.setItem("date", $("#mydate").val());
		
        $("#datePlus").css('visibility','visible');
		
        if($("#mydate").val() == (startDate.getDate() + "/" + (startDate.getMonth()+1) + "/" + startDate.getFullYear()))
        {
            $("#dateMinus").css('visibility','hidden');
        }
    });

    if(localStorage.getItem("lang") == null)
    {
        window.location.href = "lang.html";
    }
}
 
function LoadLanguageScripts () {
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
		
			
    $(".lang").click(function(){
        localStorage.setItem("lang", $(this).html());
			
        window.location.href = "index.html";
    });
}

function LoadNightScripts () { 
    $("#status").fadeIn();
    $("#test").hide();

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

    var date = localStorage.getItem("date");
    var lang = localStorage.getItem("lang");

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position) {
        var myLat = position.coords.latitude;
        var myLong = position.coords.longitude;
        //alert(myLat + ", " + myLong);

        jQuery.ajax({
            url: "http://wazzzapp.net/Mobile/GetCategories?date=" + date + "&type=Night&lang=" + lang + "&longi=" + myLong + "&lati=" + myLat,
            type: "GET",
            dataType: "json",
            withCredentials: true,
            success: function (data, status) {

                var content = data.content;
                var htmlData = "";
                console.log('success');
                console.log(data);

                $("#test").html(data.content);
                $('.show-toggle-v5').hide();
                $('.toggle-content-v5').hide();



                $('.show-toggle-v4').hide();
                $('.toggle-content-v4').hide();
                $('.show-toggle-v4').click(function () {
                    $('.show-toggle-v4').hide();
                    $('.hide-toggle-v4').show();
                    $('.toggle-content-v4').fadeOut(100); return false;
                });

                $('.hide-toggle-v4').click(function () {
                    $('.show-toggle-v4').hide();
                    $('.hide-toggle-v4').show();
                    $(this).parent().find('.show-toggle-v4').show();
                    $('.toggle-content-v4').fadeOut(100);
                    $(this).hide();
                    $(this).parent().find('.toggle-content-v4').fadeIn(200); return false;

                });

                $('.show-toggle-v5').click(function () {
                    $('.show-toggle-v5').hide();
                    $('.hide-toggle-v5').show();
                    $('.toggle-content-v5').fadeOut(100); return false;
                });

                $('.hide-toggle-v5').click(function () {
                    $('.show-toggle-v5').hide();
                    $('.hide-toggle-v5').show();
                    $(this).parent().find('.show-toggle-v5').show();
                    $('.toggle-content-v5').fadeOut(100);
                    $(this).hide();
                    $(this).parent().find('.toggle-content-v5').fadeIn(200); return false;

                });

                $(".hide-toggle-v5").attr('style', 'color:white !important');
                $(".show-toggle-v5").attr('style', 'color:white !important; display:none');
                $(".eventHeader").attr('style', 'color:white !important');
                $(".eventDescription").attr('style', 'color:white !important');

                $(".hide-toggle-v4").attr('style', 'color:white !important');
                $(".show-toggle-v4").attr('style', 'color:white !important; display:none');

                $(".Place").attr('style', 'background-color:#4F5577 !important;');
                $(".link").attr('style', 'color:white !important');
                $(".distance").attr('style', 'color:white !important');

                $("#test").show();
                $("#status").fadeOut(); // will first fade out the loading animation
                $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.

                var i = 1;
                $('.hide-toggle-v5').each(function () {

                    var url = "images/ui/" + i + ".png";
                    $(this).css('background-image', 'url('+url+')').css('background-size', '10%');
                    i++;
                });

                var a = 1;
                $('.show-toggle-v5').each(function () {

                    var url = "images/ui/" + a + "d.png";
                    $(this).css('background-image', 'url('+url+')').css('background-size', '10%');
                    a++;
                });

                $('.pick').click(function () {
                    var favs;
                    var leng;
                    if (localStorage.getItem("favs") === null) {
                        favs = $(this).attr("id") + ";";
                        alert("Favourite added");
                        localStorage.setItem("favs", favs);
                    }
                    else {
                        leng = (localStorage.getItem("favs", favs).split(";").length) - 1;
                        //alert(leng);
                        var exist = 1;
                        for (var i = 0; i < leng; i++) {
                            if ($(this).attr("id") == localStorage.getItem("favs", favs).split(";")[i]) {
                                exist++;
                            }
                        }
                        //alert("Existing: " + exist);

                        if (exist == 1) {
                            favs = localStorage.getItem("favs") + $(this).attr("id") + ";";
                            alert("Favourite added");
                            localStorage.setItem("favs", favs);
                        }
                        else {
                            alert("This is already your favourite");
                        }
                    }
                    //alert(localStorage.getItem("favs"));
                });

                function SocialSharing() {
                }

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

            },
            error: function (error) {
                console.log('error');
                console.log(error);
            }
        });
    }



    function onError(error) {

        jQuery.ajax({
            url: "http://wazzzapp.net/Mobile/GetCategories?date=" + date + "&type=Night&lang=" + lang,
            type: "GET",
            dataType: "json",
            withCredentials: true,
            success: function (data, status) {

                var content = data.content;
                var htmlData = "";
                console.log('success');
                console.log(data);

                $("#test").html(data.content);
                $('.show-toggle-v5').hide();
                $('.toggle-content-v5').hide();



                $('.show-toggle-v4').hide();
                $('.toggle-content-v4').hide();
                $('.show-toggle-v4').click(function () {
                    $('.show-toggle-v4').hide();
                    $('.hide-toggle-v4').show();
                    $('.toggle-content-v4').fadeOut(100); return false;
                });

                $('.hide-toggle-v4').click(function () {
                    $('.show-toggle-v4').hide();
                    $('.hide-toggle-v4').show();
                    $(this).parent().find('.show-toggle-v4').show();
                    $('.toggle-content-v4').fadeOut(100);
                    $(this).hide();
                    $(this).parent().find('.toggle-content-v4').fadeIn(200); return false;

                });

                $('.show-toggle-v5').click(function () {
                    $('.show-toggle-v5').hide();
                    $('.hide-toggle-v5').show();
                    $('.toggle-content-v5').fadeOut(100); return false;
                });

                $('.hide-toggle-v5').click(function () {
                    $('.show-toggle-v5').hide();
                    $('.hide-toggle-v5').show();
                    $(this).parent().find('.show-toggle-v5').show();
                    $('.toggle-content-v5').fadeOut(100);
                    $(this).hide();
                    $(this).parent().find('.toggle-content-v5').fadeIn(200); return false;

                });

                $(".hide-toggle-v5").attr('style', 'color:white !important');
                $(".show-toggle-v5").attr('style', 'color:white !important; display:none');
                $(".eventHeader").attr('style', 'color:white !important');
                $(".eventDescription").attr('style', 'color:white !important');

                $(".hide-toggle-v4").attr('style', 'color:white !important');
                $(".show-toggle-v4").attr('style', 'color:white !important; display:none');

                $(".Place").attr('style', 'background-color:#4F5577 !important;');
                $(".link").attr('style', 'color:white !important');
                $(".distance").attr('style', 'color:white !important');

                $("#test").show();
                $("#status").fadeOut(); // will first fade out the loading animation
                $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.

                var i = 1;
                $('.hide-toggle-v5').each(function () {

                    var url = "images/ui/" + i + ".png";
                    $(this).css('background-image', 'url(' + url + ')');
                    i++;
                });

                var a = 1;
                $('.show-toggle-v5').each(function () {

                    var url = "images/ui/" + a + "d.png";
                    $(this).css('background-image', 'url(' + url + ')');
                    a++;
                });

                $('.pick').click(function () {
                    var favs;
                    var leng;
                    if (localStorage.getItem("favs") === null) {
                        favs = $(this).attr("id") + ";";
                        alert("Favourite added");
                        localStorage.setItem("favs", favs);
                    }
                    else {
                        leng = (localStorage.getItem("favs", favs).split(";").length) - 1;
                        //alert(leng);
                        var exist = 1;
                        for (var i = 0; i < leng; i++) {
                            if ($(this).attr("id") == localStorage.getItem("favs", favs).split(";")[i]) {
                                exist++;
                            }
                        }
                        //alert("Existing: " + exist);

                        if (exist == 1) {
                            favs = localStorage.getItem("favs") + $(this).attr("id") + ";";
                            alert("Favourite added");
                            localStorage.setItem("favs", favs);
                        }
                        else {
                            alert("This is already your favourite");
                        }
                    }
                    //alert(localStorage.getItem("favs"));
                });

                function SocialSharing() {
                }

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
            },

            error: function (error) {
                console.log('error');
                console.log(error);
            }
        });


        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }  
}

function LoadDayScripts () {   
    function getData(data) {
        var content = data.content;
        var htmlData = "";
        console.log('success');
        console.log(data);
                
        $("#test").html(data.content);
        $('.show-toggle-v5').hide();
        $('.toggle-content-v5').hide();



        $('.show-toggle-v4').hide();
        $('.toggle-content-v4').hide();
        $('.show-toggle-v4').click(function () {
            $('.show-toggle-v4').hide();
            $('.hide-toggle-v4').show();
            $('.toggle-content-v4').fadeOut(100); return false;
        });
                
                

        $('.hide-toggle-v4').click(function () {
            $('.show-toggle-v4').hide();
            $('.hide-toggle-v4').show();
            $(this).parent().find('.show-toggle-v4').show();
            $('.toggle-content-v4').fadeOut(100);
            $(this).hide();
            $(this).parent().find('.toggle-content-v4').fadeIn(200); return false;

        });
                
                

        $('.show-toggle-v5').click(function () {
            $('.show-toggle-v5').hide();
            $('.hide-toggle-v5').show();
            $('.toggle-content-v5').fadeOut(100); return false;
        });

        $('.hide-toggle-v5').click(function () {
            $('.show-toggle-v5').hide();
            $('.hide-toggle-v5').show();
            $(this).parent().find('.show-toggle-v5').show();
            $('.toggle-content-v5').fadeOut(100);
            $(this).hide();
            $(this).parent().find('.toggle-content-v5').fadeIn(200); return false;

        });
        $(".Place").attr('style', 'background-color:#E2DFC3 !important');
        $("#test").show();
        $("#status").fadeOut(); // will first fade out the loading animation
        $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.

        var i = 1;
        $('.hide-toggle-v5').each(function () {

            var url = "images/ui/" + i + ".png";
            $(this).css('background-image', 'url('+url+')').css('background-size', '10%');
            i++;
        });

        var a = 1;
        $('.show-toggle-v5').each(function () {

            var url = "images/ui/" + a + "d.png";
            $(this).css('background-image', 'url('+url+')').css('background-size', '10%');
            a++;
        });

        $('.pick').click(function () {
            var favs;
            var leng;
            if (localStorage.getItem("favs") === null) {
                favs = $(this).attr("id") + ";";
                alert("Favourite added");
                localStorage.setItem("favs", favs);
            }
            else {
                leng = (localStorage.getItem("favs", favs).split(";").length) - 1;
                //alert(leng);
                var exist = 1;
                for (var i = 0; i < leng; i++) {
                    if ($(this).attr("id") == localStorage.getItem("favs", favs).split(";")[i]) {
                        exist++;
                    }
                }
                //alert("Existing: " + exist);

                if (exist == 1) {
                    favs = localStorage.getItem("favs") + $(this).attr("id") + ";";
                    alert("Favourite added");
                    localStorage.setItem("favs", favs);
                }
                else {
                    alert("This is already your favourite");
                }
            }
            //alert(localStorage.getItem("favs"));
        });
                
        $('.hiddenEvents').hide();
                

        function SocialSharing() {
        }

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

    $("#status").fadeIn();
    $("#test").hide();

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

    var date = localStorage.getItem("date");
    var lang = localStorage.getItem("lang");

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position) {
        var myLat = position.coords.latitude;
        var myLong = position.coords.longitude;
        //alert(myLat + ", " + myLong);

        jQuery.ajax({
            url: "http://wazzzapp.net/Mobile/GetCategories?date=" + date + "&type=Day&lang=" + lang + "&longi=" + myLong + "&lati=" + myLat,
            type: "GET",
            dataType: "json",
            withCredentials: true,
            success: function (data, status) {

                getData(data);

            },
            error: function (error) {
                console.log('error');
                console.log(error);
            }
        });
    }



    function onError(error) {

        jQuery.ajax({
            url: "http://wazzzapp.net/Mobile/GetCategories?date=" + date + "&type=Day&lang=" + lang,
            type: "GET",
            dataType: "json",
            withCredentials: true,
            success: function (data, status) {

                getData(data)
            },

            error: function (error) {
                console.log('error');
                console.log(error);
            }
        });


        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }
}