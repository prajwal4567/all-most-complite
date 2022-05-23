//setup part{
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width=innerWidth;
    canvas.height=innerHeight;

    //mouse x line 8
    let mx=0;
    //mouse y line 10
    let my=0;
    //x axis start x-corrdinate line 12
    let xxs=0;
    //x axis end x-corrdinate line 14
    let xxe=0;
    //x axis start y-corrdinate line 16
    let xys=0;
    //x axis end y-corrdinate line 18
    let xye=0;
    //y axis start x-corrdinate line 20
    let yxs=0;
    //y axis end x-corrdinate line 22
    let yxe=0;
    //y axis start y-corrdinate line 24
    let yys=0;
    //y axis end y-corrdinate line 26
    let yye=0;
    //veriable to store all x-axis line 28
    let xs=0;
    //veriable to store all y-axis line 30
    let ys=0;

    //create axis with no property 22-30 line
    function axis(sx,sy,ex,ey){
            ctx.beginPath();
            ctx.moveTo(sx,sy);
            ctx.lineTo(ex,ey);
            ctx.stroke();
        }   

    // add axes and add property 32-52
    addEventListener("mousedown",moveline=()=>{
        ctx.fillStyle='blue';
        ctx.fillRect(0,0,canvas.width,canvas.height);
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
        xs=axis(xxs,xys,xxe,xye);
        ys=axis(yxs,yys,yxe,yye);
    })

    //function to create point line 59-72
    function point(x,y){
        function animate(){
            requestAnimationFrame(animate);
            // distance from y axis or x-corrdinate line 66
            let dy=yxe-(-x);
            // distance from x axis or y-corrdinate line 68
            let dx=xys-y;
            //the point
            ctx.beginPath();
            ctx.arc(dy,dx,5,0,2*Math.PI);
            ctx.stroke()
        }
        animate();
    }

//}

//storage part{
    //array to store repailtion point
    let rp=[];
    //array to store attraction point
    let ap=[];
    //array to store all point
    let a=[ap,rp];
//}

//direction part{

    //function to define direction 
    function direction(a){

    }

//}

//magnatude part{
    
    //function to find distance line 75-78
    function distance(x1,y1,x2,y2){
        let d=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        return d;
    }
    
    //function to create attaraction point
    function attaractionpoint(a){
    
    }
    
    //function to create replesion point
    function repletionpoint(a){
    
    }
    
//}