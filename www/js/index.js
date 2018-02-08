/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      var isOverlap = true; //true: overlap, false: split
      var isTest = true;

      /*
      window.admob.initAdmob("ca-app-pub-7536052581576496/1281742378","ca-app-pub-7536052581576496/5803920249");//, isOverlap, isTest);

      var admobParam= new  window.admob.Params();
       //admobParam.extra={'keyword':"admob phonegame"};
       //admobParam.isForChild=true;
       admobParam.isTesting=true;
       alert("1");


       window.admob.showBanner(admob.BannerSize.BANNER,admob.Position.TOP_CENTER,admobParam);
       */
       console.log("Entering initAds!");
       // Set AdMobAds options:
       initAds();

       console.log("initAds passed!");
       // display a banner at startup
       admob.createBannerView();
       console.log("createBannerView passed!");
       // request an interstitial
       admob.requestInterstitialAd();
       console.log("requestInterstitialAd passed!");
      var hiScores = window.localStorage.getItem("hiScores");
      is_sound = window.localStorage.getItem("sound");
      is_vibrate = window.localStorage.getItem("vibrate");
      if (hiScores == null)
      {
        window.localStorage.setItem("hiScores", "[0,0,0]");
        hiScores = "[0,0,0]";
      }
      var array = JSON.parse(hiScores);

      if (is_sound == null)
      {
       window.localStorage.setItem("sound", 1);
       is_sound = 1;
      }
      else if (is_sound == 0)
      {
          $("#sou-ico").attr("src","./img/sound_off.png");
      }

      if (is_vibrate == null)
      {
       window.localStorage.setItem("vibrate", 1);
       is_vibrate = 1;
      }
      else if (is_vibrate == 0){
        $("#vib-ico").attr("src","./img/vibrate_off.png");
      }
      setHighScores(array);




       //alert(t);
      console.log(hiScores);
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

      /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        //RunQuiz();

        console.log('Received Event: ' + id);*/
    }
};

function setHighScores(hiscore)
{
  $("#cat-1").html(hiscore[0]);
  $("#cat-2").html(hiscore[1]);
  $("#cat-3").html(hiscore[2]);
}
