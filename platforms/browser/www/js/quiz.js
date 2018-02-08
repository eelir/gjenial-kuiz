var next_page_URL = "",
quizCatID = 0,
total_questions = 0,
question_count = 0,
questions = "",
interval = null,
question_time = 20, //sa sekonda per pyetje
multiplier = 1,
multiplier_index = 0,
firstquestion = 1,
counter = 0, //interval counter
is_alert = 0,
score = 0
toggle_view=1,
is_sound = 1,
is_vibrate = 1;

function RunQuiz(strURL, id)
{
  if (window.navigator.onLine)
  {
  quizCatID = id;

  //$('#loadingModal').modal('show');
  //$('#loadingModal').modal('toggle');

  var jsn = $.getJSON( strURL, function( data ) {


  var items = [];
  questions = data.data;
  multiplier = 1;
  is_alert = 0;
  multiplier_index=0;
  next_page_URL = data.data.next_page_url;
  total_questions = questions.length;
  question_count = questions.length;

  load_Question(0);

});

  jsn.done(function() {
    //alert("Loaded");
    //$('#loadingModal').modal('toggle');

    toggleViews();
  })
  }
  else {
    alert("Nuk keni lidhje në internet. Ju lutem lidhuni për të vazhduar!")
  }
};

function toggleVibrate()
{
  if (is_vibrate == 1)
  {
    is_vibrate = 0;
    $("#vib-ico").attr("src","./img/vibrate_off.png");
     window.localStorage.setItem("vibrate", 0);
  }
  else {
    is_vibrate = 1;
    $("#vib-ico").attr("src","./img/vibrate.png");
    window.localStorage.setItem("vibrate", 1);
  }
}

function toggleSound()
{
  if (is_sound == 1)
  {
    is_sound = 0;
    $("#sou-ico").attr("src","./img/sound_off.png");
     window.localStorage.setItem("sound", 0);
  }
  else {
    is_sound = 1;
    $("#sou-ico").attr("src","./img/sound.png");
    window.localStorage.setItem("sound", 1);
  }
}

function toggleViews()
{
  if (toggle_view == 1)
{
  $("#quiz-box").show();
  $("#navquiz").hide();
  toggle_view = 0;
}
else {
  $("#quiz-box").hide();
  $("#navquiz").show();
  toggle_view = 1;
}

}


// function loadNext()
// {
//   $.getJSON( next_page_URL, function( data ) {
//   var items = [];
//   questions = data.data.data;
//
//   next_page_URL = data.data.next_page_url;
//   total_questions = data.data.total;
//   question_count = questions.length;
//   multiplier = data.data.current_page;
//   $(".stepper-stepMarker").html("x"+multiplier);
//   load_Question(0);
//
// });
// };
function manageMultiplier()
{
  var val = 100-(100/question_time)*counter;
  if (val<60)
    {
      multiplier_index = 0;
      multiplier = 1;
      $(".stepper-stepMarker").html("x"+multiplier);

    }
    else {

      multiplier_index++;
      if (multiplier_index==4)
        {
          multiplier++;
          multiplier_index=0;
          $(".stepper-stepMarker").html("x"+multiplier);
        }
    }
}
function load_Question(index)
{
    manageMultiplier();
    progressbar(100);
    is_alert = 0;
  if (firstquestion == 1)
  {
    firstquestion = 0;
  }
  else {
    score = score + (question_time-counter)*multiplier;
    $("#score").html(score);
  }

  if (index == question_count-1)
  {
    GameOver(2);
  }
  else {
    var question = questions[index];
    var items = "";

    $("#question").html("" + question.question + "");

    var str = question.image;

    var imgscr = str.replace(".", "_sm.");

    var testID = question.test_id;


    $("#question_img").attr("src", "http://gjenial.com/uploads/"+ testID +"/"+imgscr);


    for (i = 0; i < question.answers.length; i++) {
        //$("#question").html("" + questions[i].question + "");
        //console.log(question.answers[i].answer)
        var onClick = "";

        if (question.answers[i].correct == 1)
        {
          onClick = 'onclick="load_Question(' + (index+1) + ')"';
        }
        else {
          onClick = 'onclick="GameOver(1)"';
        }


          //console.log(onClick);
        items = items +  '<div class="col-12"><input class="yes-button hidden radio-label"' +
        ' data-check=false style="display:none;" type="radio" ' +  onClick
        +'name="question-1" id="step-1-'+ (i+1)
        + '"/><label class="button-label btn-block" for="step-1-'+ (i+1)
        + '">' + question.answers[i].answer
        +'</label></div>' ;
      }

      //console.log(items);
        $( "#answers" ).html("" +items+ "");
        Timer(question_time);
  }


  /*$.each( question.answers, function( key, val ) {
    console.log(key);
    items.push( '<div class="col-12"><input class="yes-button hidden radio-label"' +
    ' data-check=false style="display:none;" type="radio" name="question-1" id="step-1-1"/>' +
    +'<label class="button-label btn-block" for="step-1-1"></label></div>' );
  })*/

}
function GameOver(status){
  //alert("Game Over!");
  if (status==1)
  {
    $('#myModal-body').html('  <p>Gabuat përgjigjjen!</p>');
    $('#myModal').modal('show');
  }
  else if (status==2) {
    $('#myModal-body').html('  <p>Perfekt! Nuk gabuat në asnjë përgjigje.</p>');
    $('#myModal').modal('show');
  }

  $("#quiz-box").hide();
  $("#game-over-box").show();
  $("#score-final").html(score);
  clearInterval(interval);
  editCanvas(quizCatID, score);
  storeScore();
  //ResetGame();
}

function storeScore()
{
  c1 = parseInt($("#cat-1").html());
  c2 = parseInt($("#cat-2").html());
  c3 = parseInt($("#cat-3").html());
  if (quizCatID == 0 && score > c1)
  {
    c1 = score;
    $("#cat-1").html(score);
  }
  if (quizCatID == 1 && score > c2)
  {
    c2 = score;
    $("#cat-2").html(score);
  }
  if (quizCatID == 2 && score > c3)
  {
    c3 = score;
    $("#cat-3").html(score);
  }

  window.localStorage.setItem("hiScores", "["+c1+","+c2+","+c3+"]");

}

function ResetGame()
{
  toggleViews();
  $("#timer").val(100);
  clearInterval(interval);
  score = 0;
  counter = 0;
  multiplier = 1;
  firstquestion = 1;
  $(".stepper-stepMarker").html("x1");
  $("#score").html(score);
  $("#score-final").html(score);
  $("#game-over-box").hide();

}

function Timer(countTo){
  //console.log(interval);
  if(interval) {
        clearInterval(interval);
    }
  counter = 0;
  interval = setInterval(function() {
    counter++;
    //$("#timer").val(100-(100/countTo)*counter);
    var v = 100-(100/countTo)*counter;
    progressbar(v);
    // Display 'counter' wherever you want to display it.
    if (counter == countTo) {
        // Display a login box
          $('.modal-body').html('  <p>Kaloi koha!</p>');
        $('#myModal').modal('show');
        //alert("Kaloi koha!");
        GameOver(0);
    }
}, 1000);
}



function progressbar(val)
{
  if (val<30)
    {
      $( "#timer" ).removeClass( "bg-warning", 1500, "easeInBack" );
      $( "#timer" ).addClass( "bg-danger", 0, "easeInBack" );

      game_alert(200);
      is_alert = 0;
    }
  else if (val<60)
    {
      $( "#timer" ).removeClass( "bg-success", 1500, "easeInBack" );
      $( "#timer" ).addClass( "bg-warning", 0, "easeInBack" );
      manageMultiplier();
      if (is_alert == 0)
      {
        game_alert(100);
        is_alert = 1;
      }

    }
    else {
      $( "#timer" ).removeClass( "bg-warning", 0, "easeInBack" );
      $( "#timer" ).removeClass( "bg-danger", 0, "easeInBack" );
      $( "#timer" ).addClass( "bg-success", 0, "easeInBack" );

    }




  var str = val+'%';
  $("#timer").css("width", str);
}

function game_alert(duration, type)
{
  if (is_vibrate==1)
  navigator.notification.vibrate(duration);

  if (is_sound==1)
  $("#aler_sound")[0].play();
}

function shareResults()
{
  var canvas = document.getElementById("myCanvas");


        var image = new Image();
        image.src = canvas.toDataURL("image/png");



  window.plugins.socialsharing.share(null, null, image.src, null);

}







function initAds() {
    alert("enter init");
      if (admob) {
        alert("admob ok");
        var adPublisherIds = {
          ios : {
            banner : "ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB",
            interstitial : "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII"
          },
          android : {
            banner : "ca-app-pub-7536052581576496/1281742378",
            interstitial : "ca-app-pub-7536052581576496/5803920249"
          }
        };

        var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

        admob.setOptions({
          publisherId:      admobid.banner,
          interstitialAdId: admobid.interstitial,
          tappxIdiOS:       "/XXXXXXXXX/Pub-XXXX-iOS-IIII",
          tappxIdAndroid:   "/XXXXXXXXX/Pub-XXXX-Android-AAAA",
          tappxShare:       0.5,

        });

        registerAdEvents();

      } else {
        alert('AdMobAds plugin not ready');
      }
    }

    function onAdLoaded(e) {
      if (isAppForeground) {
        if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
          console.log("An interstitial has been loaded and autoshown. If you want to load the interstitial first and show it later, set 'autoShowInterstitial: false' in admob.setOptions() and call 'admob.showInterstitialAd();' here");
        } else if (e.adType === admob.AD_TYPE_BANNER) {
          console.log("New banner received");
        }
      }
    }

    function onPause() {
      if (isAppForeground) {
        admob.destroyBannerView();
        isAppForeground = false;
      }
    }

    function onResume() {
      if (!isAppForeground) {
        setTimeout(admob.createBannerView, 1);
        setTimeout(admob.requestInterstitialAd, 1);
        isAppForeground = true;
      }
    }

    // optional, in case respond to events
    function registerAdEvents() {
      document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
      document.addEventListener(admob.events.onAdFailedToLoad, function (e) {});
      document.addEventListener(admob.events.onAdOpened, function (e) {});
      document.addEventListener(admob.events.onAdClosed, function (e) {});
      document.addEventListener(admob.events.onAdLeftApplication, function (e) {});
      document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) {});

      document.addEventListener("pause", onPause, false);
      document.addEventListener("resume", onResume, false);
    }
