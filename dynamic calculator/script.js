let result = document.getElementById('result');

// adding number or operator sa calc screen
function addToResult(value) {
    if (result.value === 'Error' || result.value == 'undefined') { //if may error, clear muna
        result.value = ''; // then add new value
    }
    result.value += value; //lagay yung value sa screen, inaappend niya sa right ng existing number
}

function clearResult() {
    result.value = ''; //reset calc screen, back to 0
}

function deleteDigit() {
    result.value = result.value.slice(0, -1); //nireremove yung last digit/operator sa right ng screen
}

function calculateResult() {
    if (result.value === 'Error' || result.value == 'undefined') { //if may error, clear muna
        result.value = '';
        return;
    }
    try {
        result.value = eval(result.value); //ineevaluate yung expression(string ito na nagrerepresent as script na cinocompute at nirereturn yung sagut) sa screen
    } catch (e) {
        result.value = 'Error'; //pag invalid yung expression, error yung lalabas sa screen
    }
}





//ka emehan lamangs
//most of it ay AI

const button = document.getElementById("boom");
const shardImg = new Image();
shardImg.src = "media/shard.png";
const backgroundMusic = new Audio("media/relapse.mp3");
// backgroundMusic.loop = true;

const flashbangImg = document.createElement("img");
flashbangImg.src = "media/flashbang.png";
flashbangImg.className = "flashbang-img";
flashbangImg.style.display = "none";
document.body.appendChild(flashbangImg);

const slideshowImg = document.createElement("img");
slideshowImg.className = "slideshow-img";
slideshowImg.style.display = "none";
document.body.appendChild(slideshowImg);

const slideshowSources = ["media/cry1.png", "media/cry2.png", "media/cry3.png", "media/cry4.png"];

//flash overlay
const flash = document.createElement("div");
flash.className = "flash";
document.body.appendChild(flash);

//particles canvas
const canvas = document.createElement("canvas");
canvas.id = "particles";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

//particle setup
let particles = [];
function createParticles() {
  particles = [];
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: (Math.random() - 0.5) * 10,
      dy: (Math.random() - 0.5) * 10,
      size: Math.random() * 4 + 2,
      life: 500 + Math.random() * 50
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    // ctx.beginPath();
    // ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    // ctx.fillStyle = "yellow";
    // ctx.fill();
    ctx.drawImage(shardImg, p.x, p.y, p.size * 10, p.size * 10);

    p.x += p.dx;
    p.y += p.dy;
    p.size *= 0.95;
    // p.size *= 0.99;
    p.life--;

    if (p.life <= 0) particles.splice(i, 1);
  });

  if (particles.length > 0) {
    requestAnimationFrame(drawParticles);
  }
}

//flash boom boom
function triggerFlash() {
  flash.style.opacity = "1";
  setTimeout(() => {
    flash.style.transition = "opacity 4s ease";
    flash.style.opacity = "0";
    setTimeout(() => flash.style.transition = "", 1000);
  }, 1000);
}

//web audio API for ringing
function playRinging(duration = 3000) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  document.querySelector("h1").textContent = "Kaya pa, Boss?";
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(8000, audioCtx.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

  setTimeout(() => {
    oscillator.stop();
    audioCtx.close();
  }, duration);
}


button.addEventListener("click", () => {
  //flashbanggg
  flashbangImg.style.display = "block";
  setTimeout(() => {
    flashbangImg.style.display = "none";

    //flash and particles
    triggerFlash();
    createParticles();
    drawParticles();

    //ring time
    playRinging(3000);
    
    //music after ringing
    setTimeout(() => {
        backgroundMusic.play();

        

        //start slideshow
        let index = 0;
        slideshowImg.style.display = "block";
        slideshowImg.src = slideshowSources[index];
        slideshowImg.style.opacity = "1";

        const interval = setInterval(() => {
            slideshowImg.style.opacity = "0";
            setTimeout(() => {
            index++;
            if (index < slideshowSources.length) {
                slideshowImg.src = slideshowSources[index];
                slideshowImg.style.opacity = "1";
            } else {
                clearInterval(interval);
                slideshowImg.style.display = "none";

                backgroundMusic.onended = () => {
                document.querySelector("h1").textContent = "Dynamic Calculator";
                };
            }
            }, 1000);
        }, 5500);

    }, 2500);

  }, 2000);
  backgroundMusic.onended = () => {
  document.querySelector("h1").textContent = "Dynamic Calculator";
  };
});

