//setup part{
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width=innerWidth;
    canvas.height=innerHeight;

    //all particle atraction point
    let aap=[];
    //y-cordinate of point avarge
    let ya=0;
    //x-cordinate of point avarge
    let xa=0;
    //point distance
    let pd=[];
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

    //axis line coordinate
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
    })

//particle number
let pn=100;
//attraction particle number
let atpn=20;
//repailtion particle number
let rpn=80;
let bx=500;
let by=0;
let bxa=[];
let bya=[];
    //create border particel
    for(let i=0;i<500;i++){
        let d=(Math.pow(2*(bx+by+Math.sqrt(2)*250),2)-4*4*100*bx-210000);
        if(d<0){
            d=d*-1;
        }
        bxa[i]=((bx+by+Math.sqrt(2)*250)/4)+(Math.sqrt(d)/8);
        bx=bxa[i];
        let yb=Math.pow(500,2)-Math.pow(bx,2);
        if(yb<0){
            yb=yb*-1;
            bya[i]=-Math.sqrt(yb);
            by=bya[i];
        }
        bya[i]=Math.sqrt(yb);
        by=bya[i];
    }
    console.log(bxa);
    //create random x and y coordinate for points
    for(let i=0;i<pn/4;i++){
    x[i]=(Math.round(Math.floor(Math.random(-400,400)*350)));
    y[i]=(Math.round(Math.floor(Math.random(-400,400)*350)));
    }
    for(let t=pn/4;t<pn/2;t++){
    x[t]=(Math.round(Math.floor(Math.random(-400,400)*-350)));
    y[t]=(Math.round(Math.floor(Math.random(-400,400)*350)));
    }
    for(let k=pn/2;k<pn/2+pn/4;k++){
    x[k]=(Math.round(Math.floor(Math.random(-400,400)*-350)));
    y[k]=(Math.round(Math.floor(Math.random(-400,400)*-350)));
    }
    for(let o=pn/2+pn/4;o<4*pn/4;o++){
    x[o]=(Math.round(Math.floor(Math.random(-400,400)*350)));
    y[o]=(Math.round(Math.floor(Math.random(-400,400)*-350)));
    }

//all particle number
let apn=pn;

//function to define direction
function direction(){
        for(let i=0;i<apn;i++){
            pd.push(distance(x[i],y[i],0,0));
            xa=x.reduce((a,b)=>a+b,0)/x.length;
            ya=y.reduce((a,b)=>a+b,0)/y.length;
        }
        aap.push(Math.round(xa),Math.round(ya));
}

//function to create attaraction point
function allpoint(){
        function getCoordinateAfterRepailtion(x1,y1,x2,y2){
            if((distance(x1,y1,x2,y2))<11){
                let cx=x2;
                let cy=y2;
                let d=Math.sqrt(Math.pow(x1,2)+Math.pow(y1,2));
                if(d<0){
                    d=d*-1
                }
                let a=-1+100/d;
                x1=(cx+(x1*(a+1)));
                y1=(cy+(y1*(a+1)));
                let arr=[x1,y1];
                return arr;
            }else{
                let arr=[x1,y1];
                return arr;
            }
        }
        for(let i=0;i<apn;i++){
            cx=[(aap[0]-x[i])/10]
            cy=[(aap[1]-y[i])/10]
            if(pd[i]<500){
            x[i]=x[i]+cx[0];
            y[i]=y[i]+cy[0];
            ctx.beginPath();
            ctx.fillStyle='green';
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.closePath();
            }else if(pd[i]>500){
                x[i]=x[i]+(500-x[i]);
                y[i]=x[i]+(500-x[i]);
            }
        }
        for(let i=0;i<apn;i++){
            let n=0;
            if(i!=apn-1){
                n=0;
            }else if(i=apn-1){
                n=1;
            }
            for(let v=0;v<rpn;v++){
                if(i===v)continue;
                let rx=getCoordinateAfterRepailtion(x[i],y[i],x[v],y[v]);
                x[i]=rx[0];
                y[i]=rx[1];
            }
        }
        animate();
        ctx.beginPath();
        ctx.arc(yxe-(-x[0]),xys-y[0],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[1]),xys-y[1],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[2]),xys-y[2],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[3]),xys-y[3],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[4]),xys-y[4],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[5]),xys-y[5],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[6]),xys-y[6],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[7]),xys-y[7],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[8]),xys-y[8],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[9]),xys-y[9],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[10]),xys-y[10],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[11]),xys-y[11],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[12]),xys-y[12],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[13]),xys-y[13],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[14]),xys-y[14],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[15]),xys-y[15],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[16]),xys-y[16],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[17]),xys-y[17],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[18]),xys-y[18],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[19]),xys-y[19],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[20]),xys-y[20],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[21]),xys-y[21],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[22]),xys-y[22],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[23]),xys-y[23],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[24]),xys-y[24],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[25]),xys-y[25],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[26]),xys-y[26],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[27]),xys-y[27],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[28]),xys-y[28],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[29]),xys-y[29],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[30]),xys-y[30],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[31]),xys-y[31],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[32]),xys-y[32],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[33]),xys-y[33],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[34]),xys-y[34],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[35]),xys-y[35],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[36]),xys-y[36],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[37]),xys-y[37],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[38]),xys-y[38],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[39]),xys-y[39],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[40]),xys-y[40],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[41]),xys-y[41],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[42]),xys-y[42],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[43]),xys-y[43],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[44]),xys-y[44],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[45]),xys-y[45],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[46]),xys-y[46],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[47]),xys-y[47],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[48]),xys-y[48],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[49]),xys-y[49],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[50]),xys-y[50],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[51]),xys-y[51],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[52]),xys-y[52],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[53]),xys-y[53],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[54]),xys-y[54],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[55]),xys-y[55],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[56]),xys-y[56],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[57]),xys-y[57],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[58]),xys-y[58],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[59]),xys-y[59],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[60]),xys-y[60],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[61]),xys-y[61],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[62]),xys-y[62],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[63]),xys-y[63],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[64]),xys-y[64],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[65]),xys-y[65],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[66]),xys-y[66],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[67]),xys-y[67],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[68]),xys-y[68],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[69]),xys-y[69],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[70]),xys-y[70],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[71]),xys-y[71],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[72]),xys-y[72],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[73]),xys-y[73],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[74]),xys-y[74],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[75]),xys-y[75],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[76]),xys-y[76],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[77]),xys-y[77],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[78]),xys-y[78],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[79]),xys-y[79],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[80]),xys-y[80],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[81]),xys-y[81],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[82]),xys-y[82],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[83]),xys-y[83],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[84]),xys-y[84],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[85]),xys-y[85],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[86]),xys-y[86],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[87]),xys-y[87],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[88]),xys-y[88],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[89]),xys-y[89],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[90]),xys-y[90],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[91]),xys-y[91],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[92]),xys-y[92],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[93]),xys-y[93],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[94]),xys-y[94],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[95]),xys-y[95],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[96]),xys-y[96],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[97]),xys-y[97],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[98]),xys-y[98],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-x[99]),xys-y[99],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe,xys,500,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        xs=axis(xxs,xys,xxe,xye);
        ys=axis(yxs,yys,yxe,yye);
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[0]),xys-bya[0],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[1]),xys-bya[1],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[2]),xys-bya[2],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[3]),xys-bya[3],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[4]),xys-bya[4],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[5]),xys-bya[5],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[6]),xys-bya[6],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[7]),xys-bya[7],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[8]),xys-bya[8],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[9]),xys-bya[9],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[10]),xys-bya[10],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[11]),xys-bya[11],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[12]),xys-bya[12],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[13]),xys-bya[13],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[14]),xys-bya[14],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[15]),xys-bya[15],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[16]),xys-bya[16],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[17]),xys-bya[17],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[18]),xys-bya[18],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[19]),xys-bya[19],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(yxe-(-bxa[20]),xys-bya[20],3,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
}

function animate(){
    addEventListener("mousedown",moveline=()=>{
    direction();
    allpoint();
    })
}
animate();