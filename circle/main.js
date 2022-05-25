//setup part{
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width=innerWidth;
    canvas.height=innerHeight;

    //line store
    let lis=0;
    //line store array
    let lisa=[];
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
    x.sort(function(a,b){return a-b});
    y.sort(function(a,b){return a-b});
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
        for(let i=0;i<apn;i++){
            pd.push(distance(x[i],y[i],0,0));
            pda=pd.reduce((a,b)=>a+b,0)/pd.length;
            xa=x.reduce((a,b)=>a+b,0)/x.length;
            ya=y.reduce((a,b)=>a+b,0)/y.length;
        }
        aap.push(xa,ya);
    }

//}

//magnatude part{
    
    
    
    //function to create attaraction point
    function attaractionpoint(a){
        function lineFromPoints(P, Q)
        {
            var a = Q[1] - P[1]
            var b = P[0] - Q[0]
            var c = a*(P[0]) + b*(P[1])
        
            if (b < 0){
                return  a+"x - " + b + "y = " + c 
            }else{
                return  a+"x + " + b + "y = " + c
            }
        }
        for(let i=0;i<apn;i++){
            p=[x[i],y[i]];
            ps.push(p);  
        } 
        for(let i=0;i<apn;i++){
            lis=lineFromPoints(ps[i], aap);
            lisa.push(lis);
        } 
        console.log(lisa);
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