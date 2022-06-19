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

function getCoordinateAfterRepailtion(x1,y1,x2,y2,othx,othy,type){
    if(distance(x1,y1,x2,y2)<100 && distance(x1,y1,x2,y2)>0){
        let ox=x1;
        let oy=y1;
        let cx=x2;
        let cy=y2;
        let d=Math.sqrt(Math.pow(x1,2)+Math.pow(y1,2));
        if(d<0){
            d=d*-1;
        }
        let a=-1+100/d;
        x1=(cx+(x1*(a+1)));
        y1=(cy+(y1*(a+1)));
        if(type=='r'){
            if(distance(x2,y2,x1,y1)>distance(x2,y2,othx,othy) && distance(x2,y2,x1,y1)!=distance(x2,y2,othx,othy)){
                let rx=x1-ox;
                let ry=y1-oy;
                let k=othx-ox;
                let m=othy-oy;
                let A=rx*rx+ry*ry;
                let B=-2*(k*rx+m*ry);
                let C=k*k+m*m-10000;
                let b=(-k+m*(ry/rx))/(rx-((ry*ry)/rx));
                let nix=ox+(rx*b);
                let niy=oy+(ry*b);
                if(distance(othx,othy,nix,niy)<100 && distance(othx,othy,x1,y1)>0 && distance(othx,othy,x2,y2)>0){
                    let d=Math.sqrt((B*B)+(-4*A*C));
                    if(d<0){
                        d=d*-1;
                    }
                    let a=(-B-d)/(2*A);
                    x1=ox+(rx*a);
                    y1=oy+(ry*a);
                }else{
                    let arr=[x1,y1];
                    return arr;
                }
                let arr=[x1,y1];
                return arr;
            }else{
                let arr=[x1,y1];
                return arr;
            }
        }
        if(type=='a'){
            if(distance(x2,y2,x1,y1)>distance(x2,y2,othx,othy) && distance(x2,y2,x1,y1)!=distance(x2,y2,othx,othy)){
                let rx=x1-ox;
                let ry=y1-oy;
                let k=othx-ox;
                let m=othy-oy;
                let b=(-k+m*(ry/rx))/(rx-((ry*ry)/rx));
                let nix=ox+(rx*b);
                let niy=oy+(ry*b);
                if(distance(othx,othy,nix,niy)<100 && distance(othx,othy,x1,y1)>0 && distance(othx,othy,x2,y2)>0){
                    let d=Math.sqrt(Math.pow(othx,2)+Math.pow(othy,2));
                    if(d<0){
                        d=d*-1;
                    }
                    let a=-1+100/d;
                    othx=(nix+(othx*(a+1)));
                    othy=(niy+(othy*(a+1)));
                }else{
                    let arr=[x1,y1];
                    return arr;
                }
                let arr=[othx,othy];
                return arr;
            }else{
                let arr=[x1,y1];
                return arr;
            }
        }
    }else{
        let arr=[x1,y1];
        return arr;
    }
}

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
let atpn=10;
//repailtion particle number
let rpn=90;
    let items = 20; // say there are 10 points to be plotted.
    let x0 = yxe;
    let y0 = xys;
    let bxa =[];
    let bya =[];
    // Remember top left pixel of computer screen is (0,0) and both axis go positive from left to right and top to bottom.
    
    for(var i = 0; i < items; i++) {
        bxa[i]= x0 + 500 * Math.cos(2 * Math.PI * i / items); // WHAT IS HAPPENING HERE?
        bya[i]= y0 + 500 * Math.sin(2 * Math.PI * i / items); // WHAT IS HAPPENING HERE?

    }
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

let ne=[];
let nw=[];
let se=[];
let sw=[];
let arr=[];
let c=[];
let xb=0;
let yb=0;
let cvi=0;

//function to define direction
function direction(){
    ne.splice(0,ne.length);
    nw.splice(0,nw.length);
    se.splice(0,se.length);
    sw.splice(0,sw.length);
    aap.splice(0,aap.length);
    for(let i=0;i<apn;i++){
        pd.push(distance(x[i],y[i],0,0));
        if(Math.sign(x[i])===1 && Math.sign(y[i])===1){
            let arr={x:x[i],y:y[i]};
            ne.push(arr);
        }
        if(Math.sign(x[i])===-1 && Math.sign(y[i])===1){
            let arr2={x:x[i],y:y[i]};
            nw.push(arr2);
        }
        if(Math.sign(x[i])===1 && Math.sign(y[i])===-1){
            let arr3={x:x[i],y:y[i]};
            se.push(arr3);
        }
        if(Math.sign(x[i])===-1 && Math.sign(y[i])===-1){
            let arr4={x:x[i],y:y[i]};
            sw.push(arr4);
        }
        xa=0;
        let tpd=apn/4;
        let diff=0;
        let diff2=0;
        let diff3=0;
        let diff4=0;
        if(ne.length>tpd){
            diff=ne.length-tpd;
            xa=xa+((diff/(apn-tpd))*500);
        }
        if(nw.length>tpd){
            diff2=nw.length-tpd;
            xa=xa+((diff2/(apn-tpd))*500);
        }
        if(se.length>tpd){
            diff3=se.length-tpd;
            xa=xa+((diff3/(apn-tpd))*500);
        }
        if(sw.length>tpd){
            diff4=sw.length-tpd;
            xa=xa+((diff4/(apn-tpd))*500);
        }
        c=[diff,diff2,diff3,diff4];
        let cv=Math.max(...c);
        cvi=c.indexOf(cv);
        if(cvi===0){
            for(let v=0;v<ne.length;v++){
                let ta=[];
                let ta2=[];
                ta.push(ne[v].x);
                ta2.push(ne[v].y);
                let axm=ta.reduce((a,b)=>a*b);
                let aym=ta2.reduce((a,b)=>a*b);
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                xb=axm*a;
                yb=aym*a;
                aap.pop();
                aap.push(xb,yb);
                aap.splice(0,aap.length-2);           
            }
        }
        if(cvi===1){
            for(let k=0;k<nw.length;k++){
                let ta=[];
                let ta2=[];
                ta.push(nw[k].x);
                ta2.push(nw[k].y);
                let axm=ta.reduce((a,b)=>a*b);
                let aym=ta2.reduce((a,b)=>a*b);
                if(axm>0){
                    axm=axm*-1;
                }
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                xb=axm*a;
                yb=aym*a;
                aap.pop();
                aap.push(xb,yb);
                aap.splice(0,aap.length-2);
            }
        }
        if(cvi===2){
            for(let c=0;c<se.length;c++){
                let ta=[];
                let ta2=[];
                ta.push(se[c].x);
                ta2.push(se[c].y);
                let axm=ta.reduce((a,b)=>a*b);
                let aym=ta2.reduce((a,b)=>a*b);
                if(aym>0){
                    aym=aym*-1;
                }
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                xb=axm*a;
                yb=aym*a;
                aap.pop();
                aap.push(xb,yb);
                aap.splice(0,aap.length-2);
            }
        }
        if(cvi===3){
            for(let s=0;s<sw.length;s++){
                let ta=[];
                let ta2=[];
                ta.push(sw[s].x);
                ta2.push(sw[s].y);
                let axm=ta.reduce((a,b)=>a*b);
                let aym=ta2.reduce((a,b)=>a*b);
                if(axm>0){
                    axm=axm*-1;
                }
                if(aym>0){
                    aym=aym*-1;
                }
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                xb=axm*a;
                yb=aym*a;
                aap.pop();
                aap.push(xb,yb);
                aap.splice(0,aap.length-2);
            }
        }
    }
}
let ca=0;
//function to create attaraction point
function allpoint(){
    let othax=[];
    let othay=[];
    let repx=[];
    let repy=[];
    let hrepx=[];
    let hrepy=[];
    for(let k=0;k<x.length;k++){
        repx.push(x[k]);
        repy.push(y[k]);
    }
    for(let n=0;n<rpn;n++){
        hrepx.push(x[n]);
        hrepy.push(y[n]);
        othax.push(x[n]);
        othay.push(y[n]);
    }
    for(let c=rpn;c<rpn+atpn;c++){
        othax.push(x[c]);
        othay.push(y[c]);
    }
    for(let b=0;b<items;b++){
        othax.push(bxa[b]);
        othay.push(bya[b]);
    }
    let rx=[];
    let i=0;
    let n=0;
    let k=0;
    let g=[];
    let b=[];
    let ybn=[];
    let s=[];
    let o=[];
    let ij=0;
    let ag=[];
    let abn=[];
    let aybn=[];
    let as=[];
    let ao=[];
    let aij=0;
    let type='';
    function animate(){
        i+=1;
        if(i>-1){
            ybn=[othax[i],othay[i]];
            b.push(ybn);
            s.push(distance(repx[n],repy[n],ybn[0],ybn[1]));
            o.push(s[i]);
            g=o.sort(function(a, b){return b-a});
            for(let z=0;z<s.length-1;z++){
                ij=s.indexOf(g[z]);
            }
            aybn=[repx[n],repy[n]];
            abn.push(aybn);
            as.push(distance(hrepx[k],hrepy[k],aybn[0],aybn[1]));
            ao.push(as[i]);
            ag=o.sort(function(a, b){return b-a});
            for(let z=0;z<s.length-1;z++){
                aij=s.indexOf(ag[z]);
            }
            if(rpn<aij){
                type='r';
            }
            if(rpn>aij){
                type='a';
            }
            rx=getCoordinateAfterRepailtion(repx[aij],repy[aij],hrepx[k],hrepy[k],othax[ij],othay[ij],type);
            x[aij]=rx[0];
            y[aij]=rx[1];
            if(i===apn+items-1){
                b.splice(0,b.length-1);
                s.splice(0,s.length-1);
                o.splice(0,o.length-1);
                n=n+1;
                i=0;
            }
            if(n>=apn-1){
                k=k+1;
                n=0;
            }
            if(k<rpn-1){
                setInterval(animate,0);
            }
            if(k>=rpn-1){
                repx.splice(0,x.length-1);
                repy.splice(0,y.length-1);
                hrepx.splice(0,rpn);
                hrepy.splice(0,rpn);
                othax.splice(0,rpn);
                othay.splice(0,rpn);
                ca+=1;
                console.log(ca);
                k=0;
                for(let ai=0;ai<apn;ai++){
                    cx=[(aap[0]-x[ai])/100];
                    cy=[(aap[1]-y[ai])/100];
                    x[ai]=x[ai]+cx[0];
                    y[ai]=y[ai]+cy[0];
                }
                return ;
            }
        }
    }
    ctx.beginPath();
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.closePath();
    for(let i=0;i<items;i++){
        point(bxa[i],bya[i],'b');
    }
    for(let i=0;i<apn;i++){
        if(i<rpn){
        point(x[i],y[i],'r');
        }
        if(i>rpn){
            point(x[i],y[i],'a');
        }
    }
    ctx.beginPath();
    ctx.strokeStyle='purple';
    ctx.arc(yxe,xys,500,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();

    xs=axis(xxs,xys,xxe,xye);
    ys=axis(yxs,yys,yxe,yye);
    animate();
    function point(x,y,type){
        let colo='';
        if(type=='a'){
            colo='orange';
        }
        if(type=='r'){
            colo='blue';
        }
        if(type=='b'){
            colo='dark blue';
        }
        let ax=yxe-(-x);
        let ay=xys-y;
        ctx.beginPath();
        ctx.arc(ax,ay,3,0,2*Math.PI);
        ctx.strokeStyle = colo;
        ctx.stroke();

    }
}
function animate(){
    requestAnimationFrame(animate);
    direction();
    allpoint();
}
animate();