import{pluckNumber,pluck,componentFactory,defaultGaugePaletteOptions,getValidValue,chartPaletteStr,pluckFontSize,extend2}from'../../../../fc-core/src/lib';import{_getData,_setData,_getDataForId,_setDataForId}from'../_internal/angular-hlinear-common';import ColorGradient from'../../../../fc-core/src/color-utils/color-bucket';import Gauge from'../_internal/gauge';import scaleFactory from'../../factories/polar-gauge-axis';import datasetFactory from'../../factories/angular-gauge-dataset';var UNDEF,BLANK='',math=Math,mathMin=math.min,mathPI=math.PI,deg2rad=mathPI/180,defined=function(a){return a!==UNDEF&&null!==a};class AngularGauge extends Gauge{static getName(){return'AngularGauge'}constructor(){super(),this.isHorizontal=!0,this.isAxisOpposite=!1,this.isRealTime=!0,this.drawPlotlines=!1,this.drawPlotBands=!1,this.isAxisReverse=!1,this.colorRange=!0,this.defaultPaletteOptions=extend2(extend2({},defaultGaugePaletteOptions),{dialColor:['999999,ffffff,999999','ADB68F,F3F5DD,ADB68F','A2C4C8,EDFBFE,A2C4C8','FDB548,FFF5E8,FDB548','FF7CA0,FFD1DD,FF7CA0'],dialBorderColor:['999999','ADB68F','A2C4C8','FDB548','FF7CA0'],pivotColor:['999999,ffffff,999999','ADB68F,F3F5DD,ADB68F','A2C4C8,EDFBFE,A2C4C8','FDB548,FFF5E8,FDB548','FF7CA0,FFD1DD,FF7CA0'],pivotBorderColor:['999999','ADB68F','A2C4C8','FDB548','FF7CA0']},!1,!0),this.rtParserModify=!0,this._setCategories=function(){},this.registerFactory('dataset',datasetFactory,['axis']),this.registerFactory('axis',scaleFactory,['canvas'])}getName(){return'AngularGauge'}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.friendlyName='Angular Gauge',a.hasLegend=!1,a.defaultDatasetType='angulargauge',a.animationeffect='easeOut',a.skipCanvasDrawing=!0}configureAttributes(a){super.configureAttributes(a);let b=this,c=b.getFromEnv('dataSource'),d=c.colorrange;d&&d.color&&d.color.length?(componentFactory(b,ColorGradient,'colorRange',1,[{colorRange:d,numberFormatter:b.getFromEnv('number-formatter')}]),b.addToEnv('colorRange',b.getChildren('colorRange')[0])):b.deleteFromEnv('colorRange')}_spaceManager(){var a,b,c,d,e,f,g,h,i=Math.abs,j=Math.max,k=this,l=k.config,m=k.getChildren('dataset')[0],n=k.getFromEnv('scale'),o=n.config,p=m.components.data[0],q=k.getFromEnv('dataSource'),r=q.chart,s=m.config,t=s.scaleFactor,u=0,v=0,w=0,x=0,y=0,z=s.pivotRadius,A=l.dataLabels.style.lineHeight,B=l.displayValueCount,C=l.borderWidth,D=l.minChartWidth,E=l.minChartHeight,F=0;l.canvasWidth-2*C<D&&(h=(l.canvasWidth-D)/2),l.canvasHeight-2*C<E&&(g=(l.canvasHeight-E)/2),k._allocateSpace({top:g||C,bottom:g||C,left:h||C,right:h||C}),l.scaleFactor=l.autoScale?t=AngularGauge._getScaleFactor(s.origW,s.origH,l.width,l.height):t=1,A=A.replace(/px/i,BLANK),d=/^\d+\%$/.test(s.gaugeinnerradius)?parseInt(s.gaugeinnerradius,10)/100:.7,e=z=pluckNumber(getValidValue(r.pivotradius)*t,5),s.pivotRadius=e,z=j(z,s.rearExtension*t),p&&p.config&&p.config.rearextension&&(z=j(z,p.config.rearextension*t)),s.compositPivotRadius=z,u=B*A+2+e,s.valueBelowPivot||(v=u,u=0),s.gaugeOuterRadius=pluckNumber(i(getValidValue(r.gaugeouterradius)*t)),s.gaugeInnerRadius=pluckNumber(i(getValidValue(r.gaugeinnerradius)*t),s.gaugeOuterRadius*d),a=.7*l.canvasWidth,b=.7*l.canvasHeight,f=n.placeAxis(mathMin(a,b)),b=.7*l.canvasHeight,k._manageChartMenuBar(b),c=AngularGauge._angularGaugeSpaceManager(s.gaugeStartAngle,s.gaugeEndAngle,l.canvasWidth,l.canvasHeight,s.gaugeOuterRadius,pluckNumber(getValidValue(r.gaugeoriginx)*t-l.canvasLeft),pluckNumber(getValidValue(r.gaugeoriginy)*t-l.canvasTop),z+o.polarPadding,u,v),w=c.radius=pluckNumber(c.radius,c.maxRadius),s.gaugeOriginX=c.centerX+l.canvasLeft,s.gaugeOriginY=c.centerY+l.canvasTop,x=c.centerX,y=c.centerY,F=f.left<f.top?x-f.left>=w-f.left&&y-f.top>=w-f.left?f.left:f.top:x-f.left>=w-f.top&&y-f.top>=w-f.top?f.top:f.left,F+=2*n.config.polarPadding,s.gaugeOuterRadius||(s.gaugeOuterRadius=c.radius-F),s.gaugeInnerRadius===UNDEF&&(s.gaugeInnerRadius=s.gaugeOuterRadius*d),n.setAxisConfig({centerX:s.gaugeOriginX,centerY:s.gaugeOriginY,radius:c.radius||s.gaugeOuterRadius,gaugeOuterRadius:s.gaugeOuterRadius,gaugeInnerRadius:s.gaugeInnerRadius,scaleFactor:t})}allocatePosition(){let a=this,b=a.config,c=a.getChildren('dataset')[0].config;b.gaugeStartX=b.canvasLeft,b.gaugeStartY=b.canvasTop,b.gaugeEndX=b.canvasRight,b.gaugeEndY=b.canvasBottom,b.gaugeCenterX=c.gaugeOriginX,b.gaugeCenterY=c.gaugeOriginY,b.gaugeStartAngle=c.gaugeStartAngle/deg2rad,b.gaugeEndAngle=c.gaugeEndAngle/deg2rad}_feedAxesRawData(){var a,b=this,c=b.getFromEnv('color-manager'),d=b.getFromEnv('dataSource'),e=d.chart,f=b.getFromEnv('number-formatter'),g=chartPaletteStr.chart2D,h=pluckNumber(e.axisontop,e.axisonleft,e.ticksbelowgauge===UNDEF?UNDEF:!e.ticksbelowgauge,b.isAxisOpposite),i=pluckNumber(e.reverseaxis,b.isAxisReverse);return a={isVertical:!b.isHorizontal,isReverse:i,isOpposit:h,outCanfontFamily:pluck(e.outcnvbasefont,e.basefont,'Verdana,sans'),outCanfontSize:pluckFontSize(e.outcnvbasefontsize,e.basefontsize,10),outCancolor:pluck(e.outcnvbasefontcolor,e.basefontcolor,c.getColor(g.baseFontColor)).replace(/^#?([a-f0-9]+)/ig,'#$1'),useEllipsesWhenOverflow:e.useellipseswhenoverflow,divLineColor:pluck(e.vdivlinecolor,c.getColor(g.divLineColor)),divLineAlpha:pluck(e.vdivlinealpha,c.getColor('divLineAlpha')),divLineThickness:pluckNumber(e.vdivlinethickness,1),divLineIsDashed:!!pluckNumber(e.vdivlinedashed,e.vdivlineisdashed,0),divLineDashLen:pluckNumber(e.vdivlinedashlen,4),divLineDashGap:pluckNumber(e.vdivlinedashgap,2),showAlternateGridColor:pluckNumber(e.showalternatevgridcolor,0),alternateGridColor:pluck(e.alternatevgridcolor,c.getColor('altVGridColor')),alternateGridAlpha:pluck(e.alternatevgridalpha,c.getColor('altVGridAlpha')),numDivLines:e.numvdivlines,labelFont:e.labelfont,labelFontSize:e.labelfontsize,labelFontColor:e.labelfontcolor,labelFontAlpha:e.labelalpha,labelFontBold:e.labelfontbold,labelFontItalic:e.labelfontitalic,axisName:e.xaxisname,axisMinValue:f.getCleanValue(e.lowerlimit),axisMaxValue:f.getCleanValue(e.upperlimit),setAdaptiveMin:e.setadaptivemin,adjustDiv:e.adjusttm,labelDisplay:e.labeldisplay,showLabels:e.showlabels,rotateLabels:e.rotatelabels,slantLabel:pluckNumber(e.slantlabels,e.slantlabel),labelStep:pluckNumber(e.labelstep,e.xaxisvaluesstep),showAxisValues:pluckNumber(e.showxaxisvalues,e.showxaxisvalue),showDivLineValues:pluckNumber(e.showvdivlinevalues,e.showvdivlinevalues),showZeroPlane:e.showvzeroplane,zeroPlaneColor:e.vzeroplanecolor,zeroPlaneThickness:e.vzeroplanethickness,zeroPlaneAlpha:e.vzeroplanealpha,showZeroPlaneValue:e.showvzeroplanevalue,trendlineColor:e.trendlinecolor,trendlineToolText:e.trendlinetooltext,trendlineThickness:e.trendlinethickness,trendlineAlpha:e.trendlinealpha,showTrendlinesOnTop:e.showtrendlinesontop,showAxisLine:pluckNumber(e.showxaxisline,e.showaxislines,e.drawAxisLines,0),axisLineThickness:pluckNumber(e.xaxislinethickness,e.axislinethickness,1),axisLineAlpha:pluckNumber(e.xaxislinealpha,e.axislinealpha,100),axisLineColor:pluck(e.xaxislinecolor,e.axislinecolor,'#000000'),majorTMNumber:e.majortmnumber,majorTMColor:e.majortmcolor,majorTMAlpha:e.majortmalpha,majorTMHeight:e.majortmheight,tickValueStep:e.tickvaluestep,showTickMarks:e.showtickmarks,connectTickMarks:e.connecttickmarks,showTickValues:e.showtickvalues,majorTMThickness:e.majortmthickness,reverseScale:e.reversescale,showLimits:e.showlimits,minorTMNumber:e.minortmnumber,minorTMColor:e.minortmcolor,minorTMAlpha:e.minortmalpha,minorTMHeight:pluckNumber(e.minortmheight,e.minortmwidth),minorTMThickness:e.minortmthickness,tickMarkDistance:pluckNumber(e.tickmarkdistance,e.tickmarkgap),tickValueDistance:pluckNumber(e.tickvaluedistance,e.displayvaluedistance),placeTicksInside:e.placeticksinside,placeValuesInside:e.placevaluesinside,upperLimitDisplay:e.upperlimitdisplay,lowerLimitDisplay:e.lowerlimitdisplay,ticksBelowGauge:e.ticksbelowgauge,ticksBelowGraph:e.ticksbelowgraph,trendValueDistance:e.trendvaluedistance},a.trendPoints=d.trendpoints,[a]}static _angularGaugeSpaceManager(a,b,c,d,e,f,g,h,i,j){var k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z=Math.min,A=Math.sin,B=Math.cos,C=Math.PI,D=Math.max,E=defined(e),F=defined(f),G=defined(g),H=2*C,I=C,J=C/2,K=I+J,L={radius:e,centerX:f,centerY:g},M=!1,N=a%H;return 0>N&&(N+=H),h=h||0,h&&h<c/2&&h<d/2&&(M=!0),i>d/2&&(i=d/2),j>d/2&&(j=d/2),p=B(a),q=A(a),r=B(b),s=A(b),l=z(p,r,0),n=D(p,r,0),m=z(q,s,0),o=D(q,s,0),E&&F&&G||(y=b-a,u=N+y,(u>H||0>u)&&(n=1),0<y?((N<J&&u>J||u>H+J)&&(o=1),(N<I&&u>I||u>H+I)&&(l=-1),(N<K&&u>K||u>H+K)&&(m=-1)):((N>J&&u<J||u<-K)&&(o=1),(N>I&&u<I||u<-I)&&(l=-1),(N>K&&u<K||u<-J)&&(m=-1)),F?!E&&(w=c-f,x=-f,k=l?z(w/n,x/l):w/n):(v=n-l,t=c/v,f=-t*l,k=t,M&&(c-f<h?(f=c-h,w=c-f,x=-f,k=l?z(w/n,x/l):w/n):f<h&&(f=h,w=c-f,x=-f,k=l?z(w/n,x/l):w/n)),L.centerX=f),G?!E&&(w=d-g,x=-g,k=z(k,m?z(w/o,x/m):w/o)):(v=o-m,t=d/v,g=-t*m,M&&(d-g<h?(g=d-h,w=d-g,x=-g,k=z(k,m?z(w/o,x/m):w/o)):g<h&&(g=h,w=d-g,x=-g,k=z(k,m?z(w/o,x/m):w/o))),d-g<i?(g=d-i,w=d-g,x=-g,k=z(k,m?z(w/o,x/m):w/o)):g<j&&(g=j,w=d-g,x=-g,k=z(k,m?z(w/o,x/m):w/o)),k=z(k,t),L.centerY=g),L.maxRadius=k,0>=L.maxRadius&&(L.maxRadius=z(c/2,d/2))),L}static _getScaleFactor(a,b,c,d){var e;return b=pluckNumber(b,d),a=pluckNumber(a,c),e=b&&a?a/c==b/d?c/a:Math.min(c/a,d/b):1,e}_getData(a,b){return _getData.call(this,a,b)}_setData(a,b){_setData.call(this,a,b)}_getDataForId(a,b){return _getDataForId.call(this,a,b)}_setDataForId(a,b){_setDataForId.call(this,a,b)}}export default AngularGauge;