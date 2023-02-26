window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');  //used for drawing
    //console.log(ctx);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    

    class Particle{
        constructor(effect, x, y, color){
            this.effect = effect;
            this.x = Math.random()*this.effect.width; //refrences the width of the effect
            this.y = Math.random()*this.effect.height; //refrences the height of the effect
            this.originX = Math.floor(x); 
            this.originY = Math.floor(y);
            this.color = color;
            this.size = this.effect.gap;
            this.vx = 0; //velocity
            this.vy = 0; //velocity
            this.ease = 0.3; //ease

            this.friction = 0.98; //friction
            this.dx= 0; //distance
            this.dy= 0; //distance
            this.distance = 0; //distance
            this.force = 0;
            this.angle = 0;
        }

        draw(context){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);//specifies the size of the particle
        }

        update(){
            this.dx = this.effect.mouse.x - this.x; //distance between mouse and particle x
            this.dy = this.effect.mouse.y - this.y; //distance between mouse and particle y
            this.distance = (this.dx*this.dx + this.dy*this.dy); //distance between mouse and particle
            this.force = -this.effect.mouse.radius/this.distance; //force between mouse and particle

            if(this.distance < this.effect.mouse.radius){
                this.angle = Math.atan2(this.dy, this.dx); //gets the angle between mouse and particle
                
                this.vx += this.force*Math.cos(this.angle); //gets the x velocity

                this.vy += this.force*Math.sin(this.angle); //gets the y velocity
            }

            this.x += (this.vx*=this.friction)+(this.originX-this.x)*this.ease; //updates the x position
            this.y += (this.vy*=this.friction)+ (this.originY-this.y)*this.ease; //updates the y position
        }
        warp(){
            this.x = Math.random()*this.effect.width; //refrences the width of the effect
            this.y = Math.random()*this.effect.height; //refrences the height of the effect
            this.ease = 0.05;
        }
    }

    class Effect{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image1');
            this.centerX = this.width*0.5;
            this.centerY = this.height*0.5;
            this.x = this.centerX - this.image.width*0.5;
            this.y = this.centerY - this.image.height*0.5;
            this.gap = 3; //size of pixels
            this.mouse = {
                radius: 3000,
                x: undefined,
                y: undefined
            }
            window.addEventListener('mousemove', event => { //listens for mouse movement
                this.mouse.x = event.x;
                this.mouse.y = event.y;
                //console.log(this.mouse.x, this.mouse.y); //prints out the mouse x and y coordinates
            });
            
        }
        init(context){
            context.drawImage(this.image, this.x, this.y);
            const pixels = context.getImageData(0,0,this.width, this.height).data; //gets the image data from the canvas
            for(let y = 0; y < this.height; y+=this.gap){
                for(let x = 0; x< this.width; x += this.gap){
                    const index = (y*this.width + x)*4; //gets the index of the pixel
                    const red = pixels[index + 0]; //gets the red value of the pixel
                    const green = pixels[index + 1]; //gets the green value of the pixel
                    const blue = pixels[index + 2]; //gets the blue value of the pixel
                    const alpha = pixels[index + 3];    //gets the alpha value of the pixel
                    const color = 'rgb(' + red + ',' + green + ',' + blue + ')'; //creates a string of the rgb values

                    if(alpha > 0){
                        this.particlesArray.push(new Particle(this, x, y, color)); //creates a new particle for each pixel
                    }

                }
            }

        }
        draw(context){
            this.particlesArray.forEach(particle => particle.draw(context)); //repeats the draw function for each particle
        }

        update(){
            this.particlesArray.forEach(particle => particle.update()); //repeats the update function for each particle
        }
        warp(){
            this.particlesArray.forEach(particle => particle.warp()); //repeats the warp function for each particle
        }


    }

    //const particle1 = new Particle(); // new instance of particle
    //particle1.draw();

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    //console.log(effect.particlesArray) //prints out the particles array on console log
    
    //console.log(effect); //prints out the effect object on console log

    function animate(){// particles are drawn and updated
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the canvas (x, y, width, height
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }

    animate();
    
    //ctx.fillRect(120, 150, 100, 200); //generates black rectangle
    //ctx.drawImage(image1, 0, 0); //generates images at cords 0,0

    //warp button
    const warpButton = document.getElementById('warpButton');
    warpButton.addEventListener('click', function(){
        effect.warp();
    });

});

//particle system

