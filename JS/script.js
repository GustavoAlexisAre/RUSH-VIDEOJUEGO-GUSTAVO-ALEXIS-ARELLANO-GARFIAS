//tiempo
let tiempo = 0;
let velocidadA = (+2);
let velocidadB = (-.09);
//seleccion de botones y canvas para desaparecerlos al game over

let canvas = document.querySelector(".canvas");
let btn1 = document.querySelector(".botones");
let gameOver = document.querySelector(".gameOver")
let win = document.querySelector(".win")



//background - movimiento 

const img = new Image();

let backgroundCanvas;
let ctx;
let mainCanvas;
let mainCtx;

img.src = "../assets/img/background-1.png"

img.onload = function(){
backgroundCanvas = document.getElementById("background");
ctx = backgroundCanvas.getContext("2d");

mainCanvas = document.getElementById("cuadroJuego");
mainCtx = mainCanvas.getContext('2d');

updateBackgroundCanvas()
}

const backgroundImage = {
    img: img,
    x: 0,
    y:0,
    speed: 1,
  
    move: function() {
      this.y += this.speed;
      this.y %= backgroundCanvas.height;
    },
  
    draw: function() {
      ctx.drawImage(this.img, 0, this.y);
      if (this.speed < 0) {
        ctx.drawImage(this.img, 0, this.y + this.img.height);
      } else {
        ctx.drawImage(this.img, 0, this.y - backgroundCanvas.height);
      }
    },
  };

  function updateBackgroundCanvas() {
    backgroundImage.move();
    backgroundImage.draw();
  }
  

  function renderMainCanvas() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  }
  

//audio 
const backgroundSound =new Audio('../assets/audio/565185__x3nus__ww2-1945-action-loop.wav')
const shoot1 = new Audio("../assets/audio/368733__leszek-szary__shoot-2.wav")
const dead = new Audio("../assets/audio/resident-evil-game-over.mp3")
const helicopter = new Audio("../assets/audio/high-quality-helicopter-sound-effects.mp3")
const victory = new Audio("../assets/audio/STREET FIGHTER V _ Guile Theme (long version).mp3")
const winSound = new Audio("../assets/audio/You Win (Street Fighter) - Sound Effect.mp3")

//Cargar Imagenes 

//healthbar

const vida120 = new Image()
vida120.src = '../assets/img/healthbar120.jpg'
const vida100 = new Image()
vida100.src = '../assets/img/healthbar100.jpg'
const vida80 = new Image()
vida80.src = '../assets/img/healthbar80.jpg'
const vida60 = new Image()
vida60.src = '../assets/img/healthbar60.jpg'
const vida40 = new Image()
vida40.src = '../assets/img/healthbar40.jpg'
const vida20 = new Image()
vida20.src = '../assets/img/healthbar20.jpg'

//zombies

const imgZombie1 = new Image()
imgZombie1.src = '../assets/img/ZombieWalk.png'
const imgZombie3 = new Image()
imgZombie3.src = '../assets/img/ZombieWalk2.png'
const imgZombie4 = new Image()
imgZombie4.src = '../assets/img/ZombieWalk4.png'
const imgZombie5 = new Image()
imgZombie5.src = '../assets/img/ZombieWalk5.png'
const imgZombie6 = new Image()
imgZombie6.src = '../assets/img/ZombieWalk6.png'
const imgZombie2 = new Image()
imgZombie2.src = '../assets/img/ZombieWalk3.png'

//survivor

const imgSurvival1 = new Image()
imgSurvival1.src='../assets/img/survivor-shoot_handgun.png'

//bala

const imgBala1 = new Image()
imgBala1.src = '../assets/img/bullet.png'


//firts aid kit
const kit = new Image()
kit.src = '../assets/img/first_aid_kit_PNG135.png'


//Empieza Juego

//Array Zombies Img
const imgzombies = [imgZombie2, imgZombie4, imgZombie5]
const imgzombiesb = [imgZombie1, imgZombie3, imgZombie6]

//Disparos array
const disparos = []


//zombies array
const zombies = []

//horda array 
const horda1 = []
const horda2 = []
const horda3 = []
const horda4 = []
const horda5 = []
const horda6 = []

//kit vida array 
const kits = []

//Clase - Survivor
class Survivor{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h; 
        this.velocidad = 20;
        this.kill = 0;
        this.vida = 120;
        
    }

    //Metodos
   crearSurvivor(){
    mainCtx.drawImage(imgSurvival1, this.x, this.y, this.w, this.h)
        
   }

   disparar(){
    const disparar = new disparo(this.x + 60, this.y)
    disparos.push(disparar)
    shoot1.play()
    shoot1.volume = 0.2

   }
   adelante(){
    if(this.y > 10){
    this.y-= this.velocidad;
    }
   }
   atras(){
    if(this.y< 530){
    this.y+= this.velocidad;
    }
   }
   izquierda(){
    if(this.x > 152)
    this.x-= this.velocidad;
   }
   derecha(){
    if(this.x < 650){
    this.x+= this.velocidad;
    }
   }
}

//Clase - Disparo

class disparo{
    constructor(x, y){
    this.x = x 
    this.y = y 
    this.velocidad = 20;

    }
    //Metodos
crearDisparo(){
    mainCtx.drawImage(imgBala1, this.x, this.y, 20, 30)
    this.y-= this.velocidad
    if(this.y > 640){
        disparos.shift()
    }
}
}

//Clase - Zombie
class zombie{
    constructor(x,y,direccion,img1){
    this.x = x;
    this.y = y;
    this.direccion = direccion
    this.img1 = img1
    }
crearZombies(){
    this.y= this.y + (this.direccion)
    mainCtx.drawImage(this.img1, this.x, this.y, 60, 60)
   
}

crearZombiesB(){
    this.y= this.y + (this.direccion)
    mainCtx.drawImage(this.img1, this.x, this.y, 60, 60)
}
}

class kitVida{
    constructor(x,y,direccion){
        this.x = x;
        this.y = y;
        this.direccion = direccion
        this.img1 = kit
        }
    crearKitVida(){
        this.y= this.y + (this.direccion)
        mainCtx.drawImage(this.img1, this.x, this.y, 50, 50)
       
    }
    
}

 //Personaje - Survivor
 const survivor = new Survivor(393, 530, 100, 75)

//Teclas - Push
document.addEventListener("keydown", (evento)=>{
    switch(evento.key){
        case "d":
        case "D":
        case "ArrowRight":
            survivor.derecha()
            break;
        case "a":
        case "A":
        case "ArrowLeft":
            survivor.izquierda()
            break;
        case "w":
        case "W":
        case "ArrowUp":
            survivor.adelante()
            break;
        case "s":
        case "S":
        case "ArrowDown":
            survivor.atras()
            break;
        case " ":
            survivor.disparar()
            break;
    }
})

//Funcion Empezar Juego
function empezarJuego(){
    setInterval(()=> {
       requestAnimationFrame(updateBackgroundCanvas);
        mainCtx.clearRect(0, 0, 840, 650)
         
        
        //crear Survivor 
        survivor.crearSurvivor()

        

        //crear disparos
        disparos.forEach((disparar,indexdisparar) => {
            disparar.crearDisparo()

        zombies.forEach((z,indexz) => {
            if(disparar.y + 30 >= z.y && 
                disparar.x <= z.x + 60 && 
                disparar.x >= z.x && 
                disparar.y <= z.y + 60 )
            {
                zombies.splice(indexz, 1)
                disparos.splice(indexdisparar, 1)
                survivor.kill++
            }
        })   
  
        });

       
        mainCtx.fillText(`${survivor.kill} kills`, 190, 90)
        mainCtx.font = "25px Arial"
        mainCtx.fillStyle = 'white';

        //crear zombies de frente
        zombies.forEach((zombie, indexzombie)=>{
            zombie.crearZombiesB()
            if(survivor.y + 75 >= zombie.y && 
                survivor.x <= zombie.x + 50 && 
                survivor.x + 100 >= zombie.x && 
                survivor.y <= zombie.y + 50 )
            {
                survivor.vida-= 20
                zombies.splice(indexzombie,1)
                
            }
        })
        //crear zombies de atras y quitar vidas 
        horda1.forEach((zombie1, indexzombie1)=>{
            zombie1.crearZombies()
            if(survivor.y + 75 >= zombie1.y && 
                survivor.x <= zombie1.x + 50 && 
                survivor.x + 100 >= zombie1.x && 
                survivor.y <= zombie1.y + 50 )
            {
                survivor.vida-= 5
                horda1.splice(indexzombie1,1)
                
            }
        })
        horda2.forEach((zombie2, indexzombie2)=>{
            zombie2.crearZombies()
            if(survivor.y + 75 >= zombie2.y && 
                survivor.x <= zombie2.x + 50 && 
                survivor.x + 100 >= zombie2.x && 
                survivor.y <= zombie2.y + 50 )
            {
                survivor.vida-= 5
                horda2.splice(indexzombie2,1)
                
            }
        })
        horda3.forEach((zombie3, indexzombie3)=>{ 
            zombie3.crearZombies()
            if(survivor.y + 75 >= zombie3.y && 
                survivor.x <= zombie3.x + 50 && 
                survivor.x + 100 >= zombie3.x && 
                survivor.y <= zombie3.y + 50 )
            {
                survivor.vida-=5
                horda3.splice(indexzombie3,1)
                
            }
        })
        horda4.forEach((zombie4, indexzombie4)=>{
            zombie4.crearZombies()
            if(survivor.y + 75 >= zombie4.y && 
                survivor.x <= zombie4.x + 50 && 
                survivor.x + 100 >= zombie4.x && 
                survivor.y <= zombie4.y + 50 )
            {
                survivor.vida-=5
                horda4.splice(indexzombie4,1)
                
            }
        })
        horda5.forEach((zombie5, indexzombie5)=>{
            zombie5.crearZombies()
            if(survivor.y + 75 >= zombie5.y && 
                survivor.x <= zombie5.x + 50 && 
                survivor.x + 100 >= zombie5.x && 
                survivor.y <= zombie5.y + 50 )
            {
                survivor.vida-=5
                horda5.splice(indexzombie5,1)
               
            }
        })

        kits.forEach((vidaKit, indexvidakill) =>
        {
            vidaKit.crearKitVida()
            if(survivor.y + 75 >= vidaKit.y && 
                survivor.x <= vidaKit.x + 50 && 
                survivor.x +100 >= vidaKit.x && 
                survivor.y <= vidaKit.y + 50){
                    survivor.vida+=20
                    kits.splice(indexvidakill, 1)
                    if(survivor.vida > 120){
                        survivor.vida = 120
                    }
            
                }
        })

        healthbar()
        backgroundSound.play()
        backgroundSound.volume = 0.1
        
        //Pantalla perder 
        if(survivor.vida <= 0){
            canvas.classList.add("none")
            btn1.classList.add("none")
            gameOver.classList.remove("none")
            backgroundSound.pause()
            dead.play()
            dead.volume = 0.3
        }

        //pantalla ganar 
        if(survivor.kill === 5){
            canvas.classList.add("none")
            btn1.classList.add("none")
            win.classList.remove("none")
            backgroundSound.pause()
            survivor.vida += 10^100000000
            helicopter.play()
            helicopter.volume = 0.1
            victory.play()
            victory.volume = 0.1
            winSound.play()
            winSound.volume = 0.4
            if(tiempo > 3700){
            winSound.pause()
            }
            
            
        }

        tiempo++
    }, 1000 / 60)
    

}

//Seleccion del Boton Jugar 
let btn = document.getElementById("jugar");
btn.addEventListener("click", () =>{
    
    empezarJuego() 
    backgroundSound.play()
    backgroundSound.volume = 0.1
    
    //Personaje - Zombie 
    setInterval(() => {
        let PosicionX = Math.floor(Math.random()*790)
        let zombieAleatorioA = Math.floor(Math.random()*imgzombies.length)
        let zombieDown = imgzombies[zombieAleatorioA]
        if(PosicionX < 650 && PosicionX > 150){
        const z = new zombie(PosicionX, -50, velocidadA, zombieDown)
        zombies.push(z)}
    }, 1000);
    
    setInterval(()=>{
        let PosicionX = Math.floor(Math.random()*790)
        let zombieAleatorioB = Math.floor(Math.random()*imgzombiesb.length)
        let zombieUp = imgzombiesb[zombieAleatorioB]
        if(PosicionX < 650 && PosicionX > 150){
        const zombies1 = new zombie(PosicionX, 650, velocidadB, zombieUp)
            horda1.push(zombies1)
        const zombies2 = new zombie(PosicionX, 650, velocidadB, zombieUp)
            horda2.push(zombies2)
        const zombies3 = new zombie(PosicionX, 650, velocidadB, zombieUp)
            horda3.push(zombies3)
        const zombies4 = new zombie(PosicionX, 650, velocidadB, zombieUp)
            horda4.push(zombies4)  
        const zombies5 = new zombie(PosicionX, 650, velocidadB, zombieUp)   
            horda5.push(zombies5)
        const zombies6 = new zombie(PosicionX, 650, velocidadB, zombieUp)   
            horda5.push(zombies6)   
        }
    }, 1000)
    
    //healtKit
    setInterval(()=> {
        let PosicionX = Math.floor(Math.random()*790)
        if(PosicionX < 650 && PosicionX > 150){
            const vidaKit = new kitVida(PosicionX, -50, +1)
            kits.push(vidaKit)
           }

    }, 6000)

    
    

    btn.classList.add("none")
})
//Seleccion Dificultad
let level = document.querySelector(".nivel")
level.addEventListener("click", () => {
    switch (level.innerText) {
        case "Facil":
            level.innerText = "Intermedio"
            velocidadA = (+3)
            velocidadB = (-.11)
            break;
        case "Intermedio":
            level.innerText = "Dificil"
            velocidadA = (+4)
            velocidadB = (-.15)
            break;
        default: 
            level.innerText = "Facil"
            velocidadA = (+2)
            velocidadB = (-.04)
            break;
    }
})
// Barra de vida
function healthbar(){
    if(survivor.vida <= 120){
        mainCtx.drawImage(vida120,500, 40, 310, 60 )
    }
     if(survivor.vida <= 100){
        mainCtx.drawImage(vida100,500, 40, 310, 60 )
    }
     if(survivor.vida <= 80){
        mainCtx.drawImage(vida80,500, 40, 310 , 60 )
    }
     if(survivor.vida <= 60){
        mainCtx.drawImage(vida60,500, 40, 310, 60 )
    }
     if(survivor.vida <= 40){
        mainCtx.drawImage(vida40,500, 40, 310 , 60 )
    }
     if(survivor.vida <= 20){
        mainCtx.drawImage(vida20,500, 40, 310, 60 )
    }
}

