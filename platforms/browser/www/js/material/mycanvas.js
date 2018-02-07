//canvas related variables
var _img            = null,
_quizName           = "",
_quizResult         = 0,
_quizBackground     = '',
_quizUserImage      = '',
_quizUserName       = "",
_quizUserPlaceHolder= '', // zevendeso me imazh te userit
_quizImageArray     = [],
_quizImagePath      = "",
_quizCanvasid       = "",
_quizCanvas         = null,
_$quizCanvas         = null,
_quizCanvasContext  = null;
// end canvas related variables

function initCanvas(quizName, backgroundImageUrl, userImage, userName, userPlaceHolder, imagesPath, canvasId){
    _quizName = quizName;
    _quizBackground = backgroundImageUrl;
    _quizUserImage = userImage;
    _quizUserName = userName;
    _quizUserPlaceHolder = userPlaceHolder;
    _quizImagePath = imagesPath;
    _quizCanvasid = canvasId;

    _quizCanvas = document.getElementById(_quizCanvasid);
    _$quizCanvas = $("#"+_quizCanvasid);
    if(_img == null) {
        _img = new Image;
        _quizCanvasContext = _quizCanvas.getContext("2d");

        _img.src = _quizBackground;
    }
    // console.log("parent width = ", _$quizCanvas.parent().parent().width());
    if(_$quizCanvas.parent().parent().width() > 0)
        _$quizCanvas.css("width", _$quizCanvas.parent().parent().width());
    else
        _$quizCanvas.css("width", $('.quiz-box').width());
}

function drawCanvas(quizResult)
{
    _quizResult = quizResult;

    _quizCanvasContext.drawImage(_img,0,0, 960, 645);


    _quizCanvasContext.font = "180px Roboto";
    var tmpLeng = _quizCanvasContext.measureText(_quizResult+"%").width;
    // console.log(tmpLeng);
    _quizCanvasContext.fillText(_quizResult+"%",270+(460-tmpLeng)/2,450);

    _quizCanvasContext.font = "38px Roboto";
    _quizCanvasContext.fillStyle = 'white';
    _quizCanvasContext.fillText(_quizUserName,10,610);

    _quizCanvasContext.font = "48px Roboto";
    _quizCanvasContext.fillStyle = 'black';
    wrapText(_quizCanvasContext,_quizName,10,210,940,48);

    var imgPLC = new Image;
    imgPLC.setAtX = 0;
    imgPLC.setAtY = 320;
    imgPLC.onload = function()
    {
        // _quizCanvasContext.drawImage(this,this.setAtX,this.setAtY);
        _quizCanvasContext.drawImage(this,this.setAtX,this.setAtY, 150, 150);
    }
    
    if(_quizUserImage == '')
        imgPLC.src = _quizImagePath + "/" + _quizUserPlaceHolder;
    else {
        imgPLC.crossOrigin="Anonymous";
        imgPLC.src = _quizUserImage;
    }



    setStars(_quizResult);

    for(i = 0; i < 5; i++){
        var imageObj = new Image();
        imageObj.src = _quizImagePath+"/"+_quizImageArray[i];
        // console.log(_quizImageArray);
        imageObj.setAtX = 700+i*50;
        imageObj.setAtY = 570;
        imageObj.onload = function() {
            _quizCanvasContext.drawImage(this,this.setAtX, this.setAtY);
        };
    }

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
            context.font = fontSize+"px Roboto";

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

function setStars(scoreVal) {
    if (scoreVal==100)
    {
        _quizImageArray = ['ylli1.png','ylli1.png','ylli1.png','ylli1.png','ylli1.png'];
    }
    else if (scoreVal>=90)
    {
        _quizImageArray = ['ylli1.png','ylli1.png','ylli1.png','ylli1.png','ylli2.png'];
    }
    else if (scoreVal>=80)
    {
        _quizImageArray = ['ylli1.png','ylli1.png','ylli1.png','ylli1.png','ylli3.png'];
    }
    else if (scoreVal>=70)
    {
        _quizImageArray = ['ylli1.png','ylli1.png','ylli1.png','ylli2.png','ylli3.png'];
    }
    else if (scoreVal>=60)
    {
        _quizImageArray = ['ylli1.png','ylli1.png','ylli1.png','ylli3.png','ylli3.png'];
    }
    else if (scoreVal>=50)
    {
        _quizImageArray = ['ylli1.png','ylli1.png','ylli2.png','ylli3.png','ylli3.png'];
    }
    else if (scoreVal>=40)
    {
        _quizImageArray = ['ylli1.png','ylli1.png','ylli3.png','ylli3.png','ylli3.png'];
    }
    else if (scoreVal>=30)
    {
        _quizImageArray = ['ylli1.png','ylli2.png','ylli3.png','ylli3.png','ylli3.png'];
    }
    else if (scoreVal>=20)
    {
        _quizImageArray = ['ylli1.png','ylli3.png','ylli3.png','ylli3.png','ylli3.png'];
    }
    else if (scoreVal>=1)
    {
        _quizImageArray = ['ylli2.png','ylli3.png','ylli3.png','ylli3.png','ylli3.png'];
    }
    else if (scoreVal==0)
    {
        _quizImageArray = ['ylli3.png','ylli3.png','ylli3.png','ylli3.png','ylli3.png'];
    }
}
