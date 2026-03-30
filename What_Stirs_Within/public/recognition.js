document.addEventListener('DOMContentLoaded', HUADCUMN, false)


document.getElementById("myParagraph").innerHTML = "Iniciando miParafo";
document.getElementById("resultado").innerHTML = "Iniciando resultado";
document.getElementById("voz-a-texto").innerHTML = "Iniciando voz-a-texto";

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var loco_jorge;

//var colors = [ 'blue' , 'hello' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral'];
//var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';

var phrases = [
'I love you',
'I need you'

];

function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}

function HUADCUMN() {

  var phrase = phrases[randomPhrase()];
  // To ensure case consistency while checking with the returned output text
  phrase = phrase.toLowerCase();

  var comando1 = 'Rebelate';
  // To ensure case consistency while checking with the returned output text
  comando1 = comando1.toLowerCase();


  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';

// Huadcümn means emotion in Mapuzungun language.


    var recuperar = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recuperar.grammars = speechRecognitionList;
    recuperar.lang = 'en-US';
    recuperar.interimResults = false;
    recuperar.maxAlternatives = 1;
    // Continuous captured vs single result each time recognition is started.
    // recuperar.continuous = true;




  //recuperar.start();

  document.body.onclick = function() {
     // Avoid "recognition has already started" when user clicks repeatedly.
     try {
       recuperar.stop()
     } catch (e) {}
     try {
       recuperar.start()
     } catch (e) {
       console.error('Recognition start error -> ', e)
     }
    // randomPhrase();
    console.log('Tamos Ready Freddy.');
  }

  recuperar.onresult = function(event) {

    // Handle a list.
    const imaginario = event.results;
    // Transcript the speech into an array.
    const onto = imaginario[imaginario.length-1][0].transcript;


    var speechResult = event.results[0][0].transcript.toLowerCase();
    console.log(speechResult);

    //diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
    if(speechResult === comando1) {
      console.log('biennnnnnnnnnnnnnnnnn');
      //resultPara.textContent = 'I heard the correct phrase!';
    //  resultPara.style.background = 'lime';
    } else {
      //resultPara.textContent = 'That didn\'t sound right.';
      //resultPara.style.background = 'red';
      console.log('malllllllllllllllll');
    }

////////////////////////////////////////////////////////////////
detSent('searching')


var llamada = "http://localhost:3000"
  fetch(`${llamada}/emotion?text=${encodeURIComponent(onto)}`)
    .then((response) => response.json())
    .then((result) => {
      if (result.score > 0) {

        detSent('positive')

      document.getElementById("myParagraph").innerHTML = "BUENA ONDA";
      document.getElementById("resultado").innerHTML = result.score;
      document.getElementById('v_general').value= result.score*10;
      document.getElementById('jorge_slider1').value= result.score*10;

      document.getElementById('t_emocion').value= 1;

       var evt = new CustomEvent("change");
      document.getElementById('t_emocion').dispatchEvent(evt);
      
      
      
      document.getElementById('v_general').dispatchEvent(evt);
      document.getElementById('box2').value= result.score*10;
      document.getElementById("voz-a-texto").innerHTML = onto;

    


      } else if (result.score < 0) {

        detSent('negative')
        document.getElementById("myParagraph").innerHTML = "Negative Semantic prediction";
        document.getElementById("resultado").innerHTML = result.score;
        document.getElementById('v_general').value= result.score*10;

        document.getElementById('t_emocion').value= 0;

        var evt = new CustomEvent("change");
         document.getElementById('t_emocion').dispatchEvent(evt);

        document.getElementById('v_general').dispatchEvent(evt);
        document.getElementById('box2').value= result.score*10;
         document.getElementById("voz-a-texto").innerHTML = onto;

      } else {

        detSent('neutral')
        document.getElementById("myParagraph").innerHTML = "Neutral Semantic prediction";
        document.getElementById("resultado").innerHTML = result.score;
        document.getElementById('v_general').value= result.score*10;
        var evt = new CustomEvent("change");
        document.getElementById('v_general').dispatchEvent(evt);
        document.getElementById('box2').value= result.score*10;
         document.getElementById("voz-a-texto").innerHTML = onto;

        
         if(onto == 'hello') {

           document.getElementById("myParagraph").innerHTML = " Hello!!";
           var loco_jorge=10;
           document.getElementById("jorge_test").innerHTML = loco_jorge;
           //recuperar.stop();

         }
         
         if(onto == 'music') {

           document.getElementById("myParagraph").innerHTML = " Here we go!!";
           var loco_jorge=1;
           document.getElementById("jorge_test").innerHTML = loco_jorge;
           document.getElementById('f_portadora').value= loco_jorge;
            var evt = new CustomEvent("change");
        document.getElementById('f_portadora').dispatchEvent(evt);
        document.getElementById('box1').value= result.score*10;
        
           //recuperar.stop();
         }
         
          if(onto == 'shut down') {

         document.getElementById("myParagraph").innerHTML = "Bye bye, chao!!!!";
           var loco_jorge=0;
           document.getElementById("jorge_test").innerHTML = loco_jorge;
           document.getElementById('f_portadora').value= loco_jorge;
            var evt = new CustomEvent("change");
        document.getElementById('f_portadora').dispatchEvent(evt);
        document.getElementById('box1').value= result.score*10;
           //recuperar.stop();
         }
         
         
         else if (onto == 'red') {
           document.getElementById("myParagraph").innerHTML = "YYYYYYYYYY";
         }

         else {}

      }
    })


    .catch((e) => {
      console.error('Request error -> ', e)
      recuperar.abort()
    })





   

/////////////////////////////////////////////////////////////

recuperar.onerror = function(event) {
  console.error('Recognition error -> ', event.error)
  detSent('error')
}

recuperar.onspeechend = function() {
  recuperar.stop();
}

recuperar.onaudiostart = function() {
  detSent('listening')
}

recuperar.onend = function() {
  detSent('idle')
  document.getElementById("myParagraph").innerHTML = "Tap the screen and share how you feel";
  //document.getElementById("resultado").innerHTML = result.score;

}

function detSent(type) {
  //const emojiElem = document.querySelector('.emoji img')
  //emojiElem.classList = type

}
    console.log('Confidence: ' + onto);

////////////////////////////////////////////////////

    }

//////////////////////////////////////////////////////////
}

