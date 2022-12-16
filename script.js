window.onload = function(){
  let buttonPlay = document.getElementById("button");
  let  audio = new Audio("img/gr.mp3");
  audio.crossOrigin = "anonymous";
  audio.volume = 1;  
  let context =  new (AudioContext || webkitAudioContext)();
  let analyser = context.createAnalyser();
  let canvas = document.getElementById("MyCanvas");
  let ctx = canvas.getContext("2d");      
  analyser.fftSize = 512;
 
  let audioSourceNode = context.createMediaElementSource(audio);

  audioSourceNode.connect(analyser);
  analyser.connect(context.destination);
  let bufferLength = analyser.frequencyBinCount;
 

  let dataArray = new Uint8Array(bufferLength);

  let WIDTH = canvas.width;
  let HEIGHT = canvas.height ;

  let barWidth = (WIDTH / bufferLength);
  let barHeight = HEIGHT;
  
  let x;
  function renderFrame() {
      if(isRendering === true){
          analyser.getByteFrequencyData(dataArray);
          x = 0;
         
          ctx.clearRect(0, 0, WIDTH, HEIGHT);

          for (let i = 0; i < bufferLength; i++) {
          
            barHeight = dataArray[i] / 10;
            
            ctx.fillStyle = "black";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
            x += barWidth + 3;
            if(i === 75){
            
              ctx.fillStyle = "rgba(0,0,0,0)";
              ctx.fillRect(x, HEIGHT - barHeight, barWidth * 10 , barHeight);
              ctx.font = "20px Montserrat";
              ctx.fillStyle = "white";
              ctx.fillText("88.9", 425,37.5);
              x += barWidth + 80
            }
          }
          requestAnimationFrame(renderFrame);
      }
      else{
          ctx.clearRect(0, 0, WIDTH, HEIGHT);
      }
  }
buttonPlay.addEventListener("click", function (e) {   
buttonPlay.classList.toggle("_active");
let buttonPlayImg = document.querySelector(".music-header__button picture  source");
      if (buttonPlay.classList.contains("_active")) {
         
          audio.play();
          context.resume();
          isRendering = true;
          renderFrame()
         
          buttonPlayImg.setAttribute("srcset", "img/icon-pause.webp");
      } else {
          audio.pause();
          isRendering = false;
          buttonPlayImg.setAttribute("srcset", "img/icon-play.webp");
      }
});  
     
};