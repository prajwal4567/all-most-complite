//setup part{
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width=innerWidth;
    canvas.height=innerHeight;

    //new x array
    xn=[];
    //new y array
    yn=[];
    //particle position store
    let rps=[];
    //particle position
    let rp=[];
    //attaraction point x
    let cx=[];
    //attaraction point x
    let cy=[];
    //point store
    let ps=[];
    //point
    let p=[];
    //all particle atraction point
    let aap=[];
    //y-cordinate of point avarge
    let ya=0;
    //x-cordinate of point avarge
    let xa=0;
    //point distance avarge
    let pda=0;
    //point distance
    let pd=[];
    //all particle exept one from which distance is massured
    let o=[];
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

    //function to find distance 
    function distance(x1,y1,x2,y2){
        let d=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        return d;
    }
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

//}

//storage part{
    //create random x and y coordinate for points
    let pn=6;
    let atpn=3;
    let rpn=3;
    for(let i=0;i<pn;i++){
    x[i]=(Math.round(Math.floor(Math.random(0,400)*400)));
    y[i]=(Math.round(Math.floor(Math.random(0,400)*400)));
    }
    x.sort(function(a,b){return a-b});
    y.sort(function(a,b){return a-b});
    let apn=pn;
//}

//direction part{
     
    //function to define direction
    function direction(){
        for(let i=0;i<apn;i++){
            pd.push(distance(x[i],y[i],0,0));
            pda=pd.reduce((a,b)=>a+b,0)/pd.length;
            xa=x.reduce((a,b)=>a+b,0)/x.length;
            ya=y.reduce((a,b)=>a+b,0)/y.length;
        }

        aap.push(Math.round(xa),Math.round(ya));
    }

//}

//magnatude part{
    let a=[];
    let b=[];
    let sa=0;
    let sb=0;
    //function to create attaraction point
    function attaractionpoint(){
        for(let i=0;i<apn;i++){
            console.log(a);
            cx=[(aap[0]-sa)/10]
            cy=[(aap[1]-sb)/10]
            ctx.fillStyle='green';
            ctx.fillRect(0,0,canvas.width,canvas.height);
            x[i]=x[i]+cx[0];
            y[i]=y[i]+cy[0];
            point(x[i],y[i]);
            rp=[x[i],y[i]];
            rps.push(rp);
        }
        sa=x.splice(0,6);
        sb=y.splice(0,6);
        a.push(sa);
        b.push(sb);
    }

    //function to create replesion point
    function repletionpoint(){

    }
    
//}
    
function animate(){
    setTimeout(animate,1000);
    direction();
    attaractionpoint();
    repletionpoint();
}
animate();

function point(x,y){
    function animate(){
        requestAnimationFrame(animate);
        //for(let i=apn-(rps.length-1);i>apn*2-(rps.length-1);i--){
        // distance from y axis or x-corrdinate 
        let dy=yxe-(-x);
        // distance from x axis or y-corrdinate 
        let dx=xys-y;
        //the point
        ctx.beginPath();
        ctx.arc(dy,dx,2,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        //console.log(i);
        //}
    }
    animate();
}