//setup part{
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width=innerWidth;
    canvas.height=innerHeight;

    //all particle exept one from which distance is massured
    let o=[]
    //array to store y-corrdinate of points
    let y=[];
    //array to store x-corrdinate of points
    let x=[];
    //mouse x 
    let mx=0;
    //mouse y 
    let my=0;
    //x axis start x-corrdinate
    let xxs=0;
    //x axis end x-corrdinate 
    let xxe=0;
    //x axis start y-corrdinate
    let xys=0;
    //x axis end y-corrdinate 
    let xye=0;
    //y axis start x-corrdinate
    let yxs=0;
    //y axis end x-corrdinate 
    let yxe=0;
    //y axis start y-corrdinate
    let yys=0;
    //y axis end y-corrdinate 
    let yye=0;
    //veriable to store all x-axis 
    let xs=0;
    //veriable to store all y-axis 
    let ys=0;

    //create axis with no property 
    function axis(sx,sy,ex,ey){
            ctx.beginPath();
            ctx.moveTo(sx,sy);
            ctx.lineTo(ex,ey);
            ctx.stroke();
        }   

    // add axes and add property 
    addEventListener("mousedown",moveline=()=>{
        ctx.fillStyle='green';
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

    //function to create point 
    function point(x,y){
        function animate(){
            requestAnimationFrame(animate);
            // distance from y axis or x-corrdinate 
            let dy=yxe-(-x);
            // distance from x axis or y-corrdinate 
            let dx=xys-y;
            //the point
            ctx.beginPath();
            ctx.arc(dy,dx,5,0,2*Math.PI);
            ctx.stroke()
        }
        animate();
    }

    //function to find distance 
    function distance(x1,y1,x2,y2){
        let d=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        return d;
    }

//}

//storage part{
    //create random x and y coordinate for points
    for(let i=0;i<6;i++){
    x[i]=(Math.floor(Math.random(0,1400)*1400));
    y[i]=(Math.floor(Math.random(0,400)*400));
    }
    //array to store repailtion point
    let rp=[point(x[0],y[0]),point(x[1],y[1]),point(x[2],y[2])];
    //array to store attraction point
    let ap=[point(x[3],y[3]),point(x[4],y[4]),point(x[5],y[5])];
    //array to store all point
    let a=[ap,rp];
    //repeltion point number 
    let rpn=a[1].length
    //attaraction point number
    let atpn=a[0].length
    //all point number 
    let apn=atpn+rpn;
//}

//direction part{
     
    //function to define direction
    function direction(a){
        for(let i=0;i<6;i++){
            if(i=0){
                let x0=x[0]
                x.splice(0,1);
                console.log(x);
                x.splice(0,0,x0)
            }
        }
    }

//}

//magnatude part{
    
    
    
    //function to create attaraction point
    function attaractionpoint(a){
    }
    
    //function to create replesion point
    function repletionpoint(a){
    }
    
//}
direction(a);
attaractionpoint(a);
repletionpoint(a);
rp=[point(x[0],y[0]),point(x[1],y[1]),point(x[2],y[2])];
ap=[point(x[3],y[3]),point(x[4],y[4]),point(x[5],y[5])];