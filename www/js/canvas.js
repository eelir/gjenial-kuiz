function editCanvas(category, score)
{

var img = new Image;

var strQuizName = "Kush i njeh veturat vetëm nga dritat?";
var intQuizScore = score;
var bgImageUrl = "";
//var usrImage = "user.jpg";
//var usrName = "Suejb Memeti"
//var usrPlaceholder = "user_placeholder.png"; // zevendeso me imazh te userit
//function myCanvas() {

//var imgArray =[];

if (category == 0)
{
  bgImageUrl = "./img/c_sport.png";
  strQuizName = "Kuizi i sportit";
}
else if (category == 1){
  strQuizName = "Kuizi i automobilizëm";
  bgImageUrl = "./img/c_auto.png";
}
else {
  strQuizName = "Kuizi i artit";
  bgImageUrl = "./img/c_art.png";
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

img.src = bgImageUrl;



img.onload = function()
{

  ctx.drawImage(img,0,0, 960, 645);


  ctx.font = "180px Arial";
  var tmpLeng = ctx.measureText(intQuizScore).width;
  console.log(tmpLeng);
  ctx.fillText(intQuizScore,270+(460-tmpLeng)/2,450);

  // ctx.font = "38px Arial";
  // ctx.fillStyle = 'white';
  // ctx.fillText(usrName,10,610);

  ctx.font = "48px Arial";
  ctx.fillStyle = 'black';
  wrapText(ctx,strQuizName,10,210,940,48);

  // var imgPLC = new Image;
  // imgPLC.src = usrPlaceholder;
  // imgPLC.setAtX = 5;
  // imgPLC.setAtY = 270;
  // imgPLC.onload = function()
  // {
  //   ctx.drawImage(this,this.setAtX,this.setAtY, 150,150);
  //
  // }


  //setStars(intQuizScore);

  // for(i = 0; i < 5; i++){
  //
  //       var imageObj = new Image();
  //       imageObj.src = imgArray[i];
  //       // console.log(imgArray);
  //       imageObj.setAtX = 700+i*50;
  //       imageObj.setAtY = 570;
  //       imageObj.onload = function() {
  //       ctx.drawImage(this,this.setAtX, this.setAtY);
  //   };
  // }

}



function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        var line1 = '';
        var line2 = '';
        var numberOfLines = 0;
        var isTrue = true;
        var fontSize = 48;


        while (isTrue)
        {
          for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);

            var testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {


              if (numberOfLines==0)
              {line1 = line;
              }

              line = words[n] + ' ';

              numberOfLines++;

            }
            else {
              line = testLine;

            }
            line2=line;

          }


          if (numberOfLines>1)
          {

            fontSize=fontSize-4;
            context.font = fontSize+"px Arial";

            words = text.split(' ');
            line = '';
            line1 = '';
            line2 = '';
            testLine = '';
            numberOfLines = 0;
            isTrue=true;
            if (fontSize<12)
              isTrue=false;

          }
          else {
            isTrue=false;
          }

        }

        var tmp2 = context.measureText(line2).width;
        var tmp=context.measureText(line1).width;
        context.fillText(line1, x+(maxWidth-tmp)/2, y);
        context.fillText(line2, x+(maxWidth-tmp2)/2, y+lineHeight);
      }
/*

      function setStars(scoreVal){


      if (scoreVal==100)
      {
        imgArray = ['ylli1.png','ylli1.png','ylli1.png','ylli1.png','ylli1.png'];
      }
      else if (scoreVal>=90)
      {
        imgArray = ['ylli1.png','ylli1.png','ylli1.png','ylli1.png','ylli2.png'];
      }
      else if (scoreVal>=80)
      {
        imgArray = ['ylli1.png','ylli1.png','ylli1.png','ylli1.png','ylli3.png'];
      }
      else if (scoreVal>=70)
      {
        imgArray = ['ylli1.png','ylli1.png','ylli1.png','ylli2.png','ylli3.png'];
      }
      else if (scoreVal>=60)
      {
        imgArray = ['ylli1.png','ylli1.png','ylli1.png','ylli3.png','ylli3.png'];
      }
      else if (scoreVal>=50)
      {
        imgArray = ['ylli1.png','ylli1.png','ylli2.png','ylli3.png','ylli3.png'];
      }
      else if (scoreVal>=40)
      {
        imgArray = ['ylli1.png','ylli1.png','ylli3.png','ylli3.png','ylli3.png'];
      }
      else if (scoreVal>=30)
      {
        imgArray = ['ylli1.png','ylli2.png','ylli3.png','ylli3.png','ylli3.png'];
      }
      else if (scoreVal>=20)
      {
        imgArray = ['ylli1.png','ylli3.png','ylli3.png','ylli3.png','ylli3.png'];
      }
      else if (scoreVal>=1)
      {
        imgArray = ['ylli2.png','ylli3.png','ylli3.png','ylli3.png','ylli3.png'];
      }
      else if (scoreVal==0)
      {
        imgArray = ['ylli3.png','ylli3.png','ylli3.png','ylli3.png','ylli3.png'];
      }}
*/



//}
}
