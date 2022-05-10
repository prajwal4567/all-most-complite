const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width=innerWidth;
canvas.height=innerHeight;

let xxs=0;
let xxe=canvas.width;
let xys=canvas.height/2;
let xye=canvas.height/2;
let yxs=canvas.width/2;
let yxe=canvas.width/2;
let yys=0;
let yye=canvas.height;
let centerx=canvas.width/2;
let centery=canvas.height/2;

addEventListener("mousedown",moveline=()=>{
    let mx=event.clientX;
    let my=event.clientY;    
    xxs=xxs+(centerx-mx);    
    xxe=xxe+(centerx-mx);    
    xys=xys+(centerx-my);    
    xye=xye+(centerx-my);    
    yxs=yxs+(centerx-mx);    
    yxe=yxe+(centerx-mx);    
    yys=yys+(centerx-my);    
    yye=yye+(centerx-my); 
    a=[xxs,xxe,xys,xye,yxs,yxe,yys,yye];
    console.log(a);
    ctx.beginPath();
    ctx.moveTo(xxs,xys);
    ctx.lineTo(xxe,xye);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(yxs,yys);
    ctx.lineTo(yxe,yye);
    ctx.stroke();
});