//background - movimiento 
const img = new Image();

let backgroundCanvas;
let ctx;
let mainCanvas;
let mainCtx;

img.src = "/ProyectoVideoJuegoRUSH/assets/img/background-1.png"

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
  

  //Cargar Imagenes 
const vida120 = new Image()
vida120.src = '/ProyectoVideoJuegoRUSH/assets/img/healthbar120.jpg'
const vida100 = new Image()
vida100.src = '/ProyectoVideoJuegoRUSH/assets/img/healthbar100.jpg'
const vida80 = new Image()
vida80.src = '/ProyectoVideoJuegoRUSH/assets/img/healthbar80.jpg'
const vida60 = new Image()
vida60.src = '/ProyectoVideoJuegoRUSH/assets/img/healthbar60.jpg'
const vida40 = new Image()
vida40.src = '/ProyectoVideoJuegoRUSH/assets/img/healthbar40.jpg'
const vida20 = new Image()
vida20.src = '/ProyectoVideoJuegoRUSH/assets/img/healthbar20.jpg'

const imgZombie1 = new Image()
imgZombie1.src = '/ProyectoVideoJuegoRUSH/assets/img/ZombieWalk.png'

const imgZombie2 = new Image()
imgZombie2.src = '/ProyectoVideoJuegoRUSH/assets/img/ZombieWalk3.png'

const imgSurvival1 = new Image()
imgSurvival1.src='/ProyectoVideoJuegoRUSH/assets/img/survivor-shoot_handgun.png'

const imgBala1 = new Image()
imgBala1.src = '/ProyectoVideoJuegoRUSH/assets/img/bullet.png'

//Empieza Juego

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
    constructor(x,y,direccion){
    this.x = x;
    this.y = y;
    this.direccion = direccion
    }
crearZombies(){
    this.y= this.y + (this.direccion)
    mainCtx.drawImage(imgZombie1, this.x, this.y, 60, 60)
   
}

crearZombiesB(){
    this.y= this.y + (this.direccion)
    mainCtx.drawImage(imgZombie2, this.x, this.y, 60, 60)
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
                disparar.x <= z.x + 50 && 
                disparar.x >= z.x && 
                disparar.y <= z.y + 50 )
            {
                zombies.splice(indexz, 1)
                disparos.splice(indexdisparar, 1)
                survivor.kill++
            }
        })   
  
        });

       
        mainCtx.fillText(`${survivor.kill} kills`, 200, 40)
        mainCtx.font = "25px Arial"

        //crear zombies de frente
        zombies.forEach((zombie, indexzombie)=>{
            zombie.crearZombiesB()
            if(survivor.y + 50 >= zombie.y && 
                survivor.x <= zombie.x + 50 && 
                survivor.x +50 >= zombie.x && 
                survivor.y <= zombie.y + 50 )
            {
                survivor.vida-= 20
                zombies.splice(indexzombie,1)
                console.log(survivor.vida)
            }
        })
        //crear zombies de atras y quitar vidas 
        horda1.forEach((zombie1, indexzombie1)=>{
            zombie1.crearZombies()
            if(survivor.y + 50 >= zombie1.y && 
                survivor.x <= zombie1.x + 50 && 
                survivor.x +50 >= zombie1.x && 
                survivor.y <= zombie1.y + 50 )
            {
                survivor.vida-= 20
                horda1.splice(indexzombie1,1)
                console.log(survivor.vida)
            }
        })
        horda2.forEach((zombie2, indexzombie2)=>{
            zombie2.crearZombies()
            if(survivor.y + 50 >= zombie2.y && 
                survivor.x <= zombie2.x + 50 && 
                survivor.x +50 >= zombie2.x && 
                survivor.y <= zombie2.y + 50 )
            {
                survivor.vida-= 20
                horda2.splice(indexzombie2,1)
                console.log(survivor.vida)
            }
        })
        horda3.forEach((zombie3, indexzombie3)=>{ 
            zombie3.crearZombies()
            if(survivor.y + 50 >= zombie3.y && 
                survivor.x <= zombie3.x + 50 && 
                survivor.x +50 >= zombie3.x && 
                survivor.y <= zombie3.y + 50 )
            {
                survivor.vida-=20
                horda3.splice(indexzombie3,1)
                console.log(survivor.vida)
            }
        })
        horda4.forEach((zombie4, indexzombie4)=>{
            zombie4.crearZombies()
            if(survivor.y + 50 >= zombie4.y && 
                survivor.x <= zombie4.x + 50 && 
                survivor.x +50 >= zombie4.x && 
                survivor.y <= zombie4.y + 50 )
            {
                survivor.vida-=20
                horda4.splice(indexzombie4,1)
                console.log(survivor.vida)
            }
        })
        horda5.forEach((zombie5, indexzombie5)=>{
            zombie5.crearZombies()
            if(survivor.y + 50 >= zombie5.y && 
                survivor.x <= zombie5.x + 50 && 
                survivor.x +50 >= zombie5.x && 
                survivor.y <= zombie5.y + 50 )
            {
                survivor.vida-=20
                horda5.splice(indexzombie5,1)
                console.log(survivor.vida)
            }
        })

        healthbar()

    }, 1000 / 60)
}

//Seleccion del Boton Jugar 
let btn = document.getElementById("jugar");
btn.addEventListener("click", () =>{
    
    empezarJuego()
    
    //Personaje - Zombie 
    setInterval(() => {
        let PosicionX = Math.floor(Math.random()*790)
        if(PosicionX < 650 && PosicionX > 150){
        const z = new zombie(PosicionX, -50, +1)
        zombies.push(z)}
    }, 1000);
    
    setInterval(()=>{
        let PosicionX = Math.floor(Math.random()*790)
        if(PosicionX < 650 && PosicionX > 150){
        const zombies1 = new zombie(PosicionX, 650, -.04)
            horda1.push(zombies1)
        const zombies2 = new zombie(PosicionX, 650, -.04)
            horda2.push(zombies2)
        const zombies3 = new zombie(PosicionX, 650, -.04)
            horda3.push(zombies3)
        const zombies4 = new zombie(PosicionX, 650, -.04)
            horda4.push(zombies4)  
        const zombies5 = new zombie(PosicionX, 650, -.04)   
            horda5.push(zombies5)
        const zombies6 = new zombie(PosicionX, 650, -.04)   
            horda5.push(zombies6)   
        }
    }, 1000)

    

    btn.classList.add("none")
})




function healthbar(){
    if(survivor.vida === 120){
        mainCtx.drawImage(vida120,500, 40, 310, 60 )
    }
     if(survivor.vida === 100){
        mainCtx.drawImage(vida100,500, 40, 310, 60 )
    }
     if(survivor.vida === 80){
        mainCtx.drawImage(vida80,500, 40, 310 , 60 )
    }
     if(survivor.vida === 60){
        mainCtx.drawImage(vida60,500, 40, 310, 60 )
    }
     if(survivor.vida === 40){
        mainCtx.drawImage(vida40,500, 40, 310 , 60 )
    }
     if(survivor.vida === 20){
        mainCtx.drawImage(vida20,500, 40, 310, 60 )
    }
}

