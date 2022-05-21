const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width=innerWidth;
canvas.height=innerHeight;

let mx=0
let my=0
let xxs=0
let xxe=0
let xys=0
let xye=0
let yxs=0
let yxe=0
let yys=0
let yye=0

    function line(sx,sy,ex,ey){
        ctx.beginPath();
        ctx.moveTo(sx,sy);
        ctx.lineTo(ex,ey);
        ctx.stroke();
    }
    
    ctx.line(0, 0, canvas.width, canvas.height);

    addEventListener("mousedown",moveline=()=>{
        mx=event.clientX;
        my=event.clientY;
        xxs=0;    
        xxe=canvas.width;    
        xys=my;    
        xye=my;    
        yxs=mx;   
        yxe=mx;    
        yys=0; 
        yye=canvas.height;  
        let x=line(xxs,xys,xxe,xye);
        let y=line(yxs,yys,yxe,yye);                  
        let xa=[x];
        let ya=[y];
        console.log(xa);
    })