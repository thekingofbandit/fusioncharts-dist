import ScaleContinuous,{deInterpolateLinear,copyScale}from'./continuous';import ticks,{tickIncrement}from'../utils/array/ticks';import interpolateNumber from'../utils/interpolators/number';class ScaleLinear extends ScaleContinuous{constructor(){super(deInterpolateLinear,interpolateNumber)}ticks(a=7){const b=this.getDomain();return ticks(b[0],b[b.length-1],a)}nice(a=7){var b=Math.ceil,c=Math.floor;let d,e=this.getDomain(),f=0,g=e.length-1,h=e[f],i=e[g];return i<h&&(d=h,h=i,i=d,d=f,f=g,g=d),d=tickIncrement(h,i,a),0<d?(h=c(h/d)*d,i=b(i/d)*d,d=tickIncrement(h,i,a)):0>d&&(h=b(h*d)/d,i=c(i*d)/d,d=tickIncrement(h,i,a)),0<d?(e[f]=c(h/d)*d,e[g]=b(i/d)*d,this.setDomain(e)):0>d&&(e[f]=b(h*d)/d,e[g]=c(i*d)/d,this.setDomain(e)),this}copy(){return copyScale(this,new ScaleLinear)}}export default ScaleLinear;