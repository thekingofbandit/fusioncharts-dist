import{pluck,preDefStr,POSITION_RIGHT,pluckFontSize,pluckNumber,getFirstValue,getMouseCoordinate}from'../_internal/lib/lib';import{convertColor}from'../_internal/lib/lib-graphics';import MSCartesian from'./mscartesian';import virtualCanvasFactory from'../_internal/factories/vcanvas';import datasetFactory from'../_internal/factories/candlestick-dataset';import axisFactory from'../_internal/factories/candlestick-axis';import CandleStickDataset from'../_internal/datasets/candlestick/candlestick';import CandleStickBarDataset from'../_internal/datasets/candlestick/candlestickbar';import CandleStickLineDataset from'../_internal/datasets/candlestick/candlestickline';const MOUSEOUT='mouseout',BLANKSTRING='';let altHGridColorStr=preDefStr.altHGridColorStr,altHGridAlphaStr=preDefStr.altHGridAlphaStr,math=Math,mathMax=math.max,mathRound=math.round,POSITION_BOTTOM=preDefStr.POSITION_BOTTOM,divLineAlpha3DStr=preDefStr.divLineAlpha3DStr,defaultFontStr=preDefStr.defaultFontStr,divLineAlphaStr=preDefStr.divLineAlphaStr,altVGridColorStr=preDefStr.altVGridColorStr,altVGridAlphaStr=preDefStr.altVGridAlphaStr,colorStrings=preDefStr.colors,COLOR_000000=colorStrings.c000000,chartPaletteStr={chart2D:{bgColor:'bgColor',bgAlpha:'bgAlpha',bgAngle:'bgAngle',bgRatio:'bgRatio',canvasBgColor:'canvasBgColor',canvasBaseColor:'canvasBaseColor',divLineColor:'divLineColor',legendBgColor:'legendBgColor',legendBorderColor:'legendBorderColor',toolTipbgColor:'toolTipbgColor',toolTipBorderColor:'toolTipBorderColor',baseFontColor:'baseFontColor',anchorBgColor:'anchorBgColor'},chart3D:{bgColor:'bgColor3D',bgAlpha:'bgAlpha3D',bgAngle:'bgAngle3D',bgRatio:'bgRatio3D',canvasBgColor:'canvasBgColor3D',canvasBaseColor:'canvasBaseColor3D',divLineColor:'divLineColor3D',divLineAlpha:divLineAlpha3DStr,legendBgColor:'legendBgColor3D',legendBorderColor:'legendBorderColor3D',toolTipbgColor:'toolTipbgColor3D',toolTipBorderColor:'toolTipBorderColor3D',baseFontColor:'baseFontColor3D',anchorBgColor:'anchorBgColor3D'}},isVolumeChartRequired=function(a){if(!(a&&a.dataset))return 0;let b=a.dataset[0],c=b.data;return!!(Array.isArray(c)&&c.filter(a=>a.volume)||[]).length};class CandleStick extends MSCartesian{constructor(){super(),this.isDual=!0,this.paletteIndex=3,this.canvasborderthickness=1,this.hasInteractiveLegend=!1,this.numOfCanvas=2,this.registerFactory('vCanvas',virtualCanvasFactory,['axis']),this.registerFactory('axis',axisFactory,['canvas']),this.registerFactory('dataset',datasetFactory,['vCanvas'])}getName(){return'candlestick'}static getName(){return'candlestick'}getDSdef(a){return'bar'===a?CandleStickBarDataset:'line'===a?CandleStickLineDataset:CandleStickDataset}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.hasLegend=!0,a.defaultDatasetType='candlestick',a.drawanchors=0,a.enablemousetracking=!0,a.iscandlestick=!0}configureAttributes(a){super.configureAttributes(a)}parseChartAttr(a){super.parseChartAttr(a);let b,c=this,d=c.config,e=c.getFromEnv('chart-attrib'),f=c.getFromEnv('color-manager');d.showVolumeChart=pluckNumber(e.showvolumechart,isVolumeChartRequired(a),1),d.rollOverBandColor=convertColor(pluck(e.rolloverbandcolor,f.getColor(altHGridColorStr)),pluck(e.rolloverbandalpha,f.getColor(altHGridAlphaStr))),d.crosslinecolor=pluck(e.crosslinecolor,e.rolloverbandcolor,f.getColor(altHGridColorStr)),d.drawcrosslineontop=0,d.crosslinealpha=pluckNumber(e.crosslinealpha,e.rolloverbandalpha,f.getColor(altHGridAlphaStr)),d.drawcrossline=1,d.skipClipping=!0,e=c.getFromEnv('chart-attrib'),d.vplotbordercolor=getFirstValue(e.vplotbordercolor,BLANKSTRING),d.vplotborderalpha=getFirstValue(e.vplotborderalpha,BLANKSTRING),d.vplotborderthickness=pluckNumber(e.vplotborderthickness,1),d.showplotborder=pluckNumber(e.showvplotborder,1),b=pluckNumber(e.volumeheightpercent,40),d.volumeHeightPercent=20>b?20:80<b?80:b,d.canvasBorderWidth=pluckNumber(e.canvasborderthickness,1)}_spaceManager(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x=this,y=x.config,z=x.getChildren(),A=y.legendPosition,B=z.xAxis&&z.xAxis[0],C=z.yAxis&&z.yAxis[0],D=z.yAxis&&z.yAxis[1],E=y.hasLegend,F=x.getFromEnv('legend'),G=x.config.showVolumeChart,H=G?y.volumeHeightPercent:0,I=z.canvas[0],J=I.config,K=y.width,L=y.height,M={},N=y.chartBorderWidth,O=J.canvasBorderWidth,P=y.minCanvasHeight,Q=y.minCanvasWidth,R=y.canvasMarginLeft,S=y.canvasMarginRight,T=y.canvasMarginTop,U=y.canvasMarginBottom,V=y.origCanvasTopMargin,W=y.origCanvasBottomMargin,X=y.origCanvasLeftMargin,Y=y.origCanvasRightMargin;x._allocateSpace({top:N,bottom:N,left:N,right:N}),a=.225*y.availableHeight,b=x._manageActionBarSpace&&x._manageActionBarSpace(a)||{},x._allocateSpace(b),m=A===POSITION_RIGHT?.225*y.canvasWidth:.3*y.canvasHeight,!1!==E&&B&&y.showLegend&&x._allocateSpace(F._manageLegendPosition(m)),c=.7*y.canvasWidth,k=C.placeAxis(c),l=G?D.placeAxis(c):{},M.left=mathMax(k.left,l.left||0),M.right=mathMax(k.right,l.right||0),x._allocateSpace(M),Q>K-R-S&&(v=!0,n=y.canvasWidth-Q,w=R+S,R=y.canvasMarginLeft=n*R/w,S=y.canvasMarginRight=n*S/w),r=R>y.canvasLeft?R-y.canvasLeft:0,s=S>K-y.canvasRight?S+y.canvasRight-K:0,x._allocateSpace({left:r,right:s}),v&&(w=X+Y,p=y.canvasWidth,p>Q&&(n=p-Q,r=n*X/w,s=n*Y/w),x._allocateSpace({left:r,right:s})),d=.225*y.canvasHeight,d=A===POSITION_BOTTOM?.6*y.canvasHeight:.6*y.canvasWidth,x._manageChartMenuBar(d),x._allocateSpace({top:y.canvasMarginTop,bottom:y.canvasMarginBottom}),d=.3*y.canvasHeight,f=B.placeAxis(d),B&&x._allocateSpace(f),f.bottom+=6,J.intermediarySpace=f.bottom,G&&x._allocateSpace({bottom:10}),x._allocateSpace({top:O,bottom:2*O,left:O,right:O}),P>L-T-U&&(q=!0,n=y.canvasHeight-P,w=T+U,T=y.canvasMarginTop=n*T/w,U=y.canvasMarginBottom=n*U/w),t=T>y.canvasTop?T-y.canvasTop:0,u=U>L-y.canvasBottom?U+y.canvasBottom-L:0,x._allocateSpace({top:t,bottom:u}),q&&(w=V+W,o=y.canvasHeight,o>P&&(n=o-P,t=n*V/w,u=n*W/w),x._allocateSpace({top:t,bottom:u})),e=y.canvasHeight,J.canvasHeight=mathRound((100-H)/100*e),J.canvasTop=y.canvasTop,J.canvasLeft=y.canvasLeft,J.canvasBottom=J.canvasTop+J.canvasHeight,J.canvasWidth=y.canvasWidth,J.canvasRight=y.canvasRight,j=y.canvasTop+J.canvasHeight+O,J.canvasY=j,I.setDimension({top:J.canvasTop,left:J.canvasLeft,width:J.canvasWidth,height:J.canvasHeight}),G&&(g=z.canvas[1],h=g.config,h.canvasHeight=H/100*e,h.canvasTop=J.canvasBottom+f.bottom+2*O,h.canvasLeft=y.canvasLeft,h.canvasBottom=h.canvasTop+h.canvasHeight+2*O,h.canvasRight=y.canvasRight,h.canvasWidth=y.canvasWidth,i=y.canvasTop+J.canvasHeight+f.bottom+2*O,h.canvasY=i,g.setDimension({top:h.canvasTop,left:h.canvasLeft,width:h.canvasWidth,height:h.canvasHeight}))}_postSpaceManagement(){super._postSpaceManagement()}setAxisDimention(){let a,b=this,c=b.getChildren(),d=b.config.showVolumeChart,e=c.xAxis&&c.xAxis[0],f=c.yAxis&&c.yAxis[0],g=c.yAxis&&c.yAxis[1],h=c.canvas,i=h[0].config,j=i.canvasBorderWidth;e&&e.setAxisDimention({x:i.canvasLeft,y:i.canvasY,opposite:i.canvasTop-j,axisLength:i.canvasWidth}),f&&f.setAxisDimention({x:i.canvasLeft-j,y:i.canvasTop,opposite:i.canvasRight+j,axisLength:i.canvasHeight}),e.setCanvas(i),f.setCanvas(i),d&&(a=h[1].config,g&&g.setAxisDimention({x:i.canvasLeft-j,y:a.canvasTop,opposite:a.canvasRight+j,axisLength:a.canvasHeight}),g&&g.setCanvas(a))}_feedAxesRawData(){var a,b,c,d=this,e=d.getFromEnv('color-manager'),f=d.getFromEnv('dataSource'),g=d.getFromEnv('chart-attrib'),h=[],i=[],j=d.config.is3D,k=j?chartPaletteStr.chart3D:chartPaletteStr.chart2D;return a={isVertical:!1,isReverse:!1,isOpposit:!1,drawTrendLabels:!0,outCanfontFamily:pluck(g.outcnvbasefont,g.basefont,defaultFontStr),outCanfontSize:pluckFontSize(g.outcnvbasefontsize,g.basefontsize,10),outCancolor:pluck(g.outcnvbasefontcolor,g.basefontcolor,e.getColor(k.baseFontColor)).replace(/^#?([a-f0-9]+)/ig,'#$1'),axisNamePadding:g.xaxisnamepadding,axisValuePadding:g.labelpadding,axisNameFont:g.xaxisnamefont,axisNameFontSize:g.xaxisnamefontsize,axisNameFontColor:g.xaxisnamefontcolor,axisNameFontBold:g.xaxisnamefontbold,axisNameFontItalic:g.xaxisnamefontitalic,axisNameBgColor:g.xaxisnamebgcolor,axisNameBorderColor:g.xaxisnamebordercolor,axisNameAlpha:g.xaxisnamealpha,axisNameFontAlpha:g.xaxisnamefontalpha,axisNameBgAlpha:g.xaxisnamebgalpha,axisNameBorderAlpha:g.xaxisnameborderalpha,axisNameBorderPadding:g.xaxisnameborderpadding,axisNameBorderRadius:g.xaxisnameborderradius,axisNameBorderThickness:g.xaxisnameborderthickness,axisNameBorderDashed:g.xaxisnameborderdashed,axisNameBorderDashLen:g.xaxisnameborderdashlen,axisNameBorderDashGap:g.xaxisnameborderdashgap,useEllipsesWhenOverflow:g.useellipseswhenoverflow,divLineColor:pluck(g.vdivlinecolor,g.divlinecolor,e.getColor(k.divLineColor)),divLineAlpha:pluck(g.vdivlinealpha,g.divlinealpha,j?e.getColor(divLineAlpha3DStr):e.getColor(divLineAlphaStr)),divLineThickness:pluckNumber(g.vdivlinethickness,g.divlinethickness,1),divLineIsDashed:!!pluckNumber(g.vdivlinedashed,g.vdivlineisdashed,g.divlinedashed,g.divlineisdashed,0),divLineDashLen:pluckNumber(g.vdivlinedashlen,g.divlinedashlen,4),divLineDashGap:pluckNumber(g.vdivlinedashgap,g.divlinedashgap,2),showAlternateGridColor:pluckNumber(g.showalternatevgridcolor,0),alternateGridColor:pluck(g.alternatevgridcolor,e.getColor(altVGridColorStr)),alternateGridAlpha:pluck(g.alternatevgridalpha,e.getColor(altVGridAlphaStr)),numDivLines:g.numvdivlines,labelFont:g.labelfont,labelFontSize:g.labelfontsize,labelFontColor:g.labelfontcolor,labelFontAlpha:g.labelalpha,labelFontBold:g.labelfontbold,labelFontItalic:g.labelfontitalic,axisName:g.xaxisname,axisMinValue:g.xaxisminvalue,axisMaxValue:g.xaxismaxvalue,setAdaptiveMin:g.setadaptivexmin,adjustDiv:g.adjustvdiv,labelDisplay:g.labeldisplay,showLabels:g.showlabels,rotateLabels:g.rotatelabels,slantLabel:pluckNumber(g.slantlabels,g.slantlabel),labelStep:pluckNumber(g.labelstep,g.xaxisvaluesstep),showAxisValues:pluckNumber(g.showxaxisvalues,g.showxaxisvalue),showLimits:g.showvlimits,showDivLineValues:pluckNumber(g.showvdivlinevalues,g.showvdivlinevalues),showZeroPlane:g.showvzeroplane,zeroPlaneColor:g.vzeroplanecolor,zeroPlaneThickness:g.vzeroplanethickness,zeroPlaneAlpha:g.vzeroplanealpha,showZeroPlaneValue:g.showvzeroplanevalue,trendlineColor:g.trendlinecolor,trendlineToolText:g.trendlinetooltext,trendlineThickness:g.trendlinethickness,trendlineAlpha:g.trendlinealpha,showTrendlinesOnTop:g.showtrendlinesontop,showAxisLine:pluckNumber(g.showxaxisline,g.showaxislines,g.drawAxisLines,0),axisLineThickness:pluckNumber(g.xaxislinethickness,g.axislinethickness,1),axisLineAlpha:pluckNumber(g.xaxislinealpha,g.axislinealpha,100),axisLineColor:pluck(g.xaxislinecolor,g.axislinecolor,COLOR_000000),freezeLimit:!0},a.vtrendlines=f.vtrendlines,i.push(a),b={isVertical:!0,isReverse:!0,isOpposit:!1,drawLabelsOpposit:1,axisNameAlignCanvas:1,outCanfontFamily:pluck(g.outcnvbasefont,g.basefont,defaultFontStr),outCanfontSize:pluckFontSize(g.outcnvbasefontsize,g.basefontsize,10),outCancolor:pluck(g.outcnvbasefontcolor,g.basefontcolor,e.getColor(k.baseFontColor)).replace(/^#?([a-f0-9]+)/ig,'#$1'),axisNamePadding:g.yaxisnamepadding,axisValuePadding:g.yaxisvaluespadding,axisNameFont:g.pyaxisnamefont,axisNameFontSize:g.pyaxisnamefontsize,axisNameFontColor:g.pyaxisnamefontcolor,axisNameFontBold:g.pyaxisnamefontbold,axisNameFontItalic:g.pyaxisnamefontitalic,axisNameBgColor:g.pyaxisnamebgcolor,axisNameBorderColor:g.pyaxisnamebordercolor,axisNameAlpha:g.pyaxisnamealpha,axisNameFontAlpha:g.pyaxisnamefontalpha,axisNameBgAlpha:g.pyaxisnamebgalpha,axisNameBorderAlpha:g.pyaxisnameborderalpha,axisNameBorderPadding:g.pyaxisnameborderpadding,axisNameBorderRadius:g.pyaxisnameborderradius,axisNameBorderThickness:g.pyaxisnameborderthickness,axisNameBorderDashed:g.pyaxisnameborderdashed,axisNameBorderDashLen:g.pyaxisnameborderdashlen,axisNameBorderDashGap:g.pyaxisnameborderdashgap,axisNameWidth:g.yaxisnamewidth,useEllipsesWhenOverflow:g.useellipseswhenoverflow,rotateAxisName:pluckNumber(g.rotateyaxisname,1),axisName:g.pyaxisname,divLineColor:pluck(g.divlinecolor,e.getColor(k.divLineColor)),divLineAlpha:pluck(g.divlinealpha,e.getColor(divLineAlphaStr)),divLineThickness:pluckNumber(g.divlinethickness,1),divLineIsDashed:!!pluckNumber(g.divlinedashed,g.divlineisdashed,1),divLineDashLen:pluckNumber(g.divlinedashlen,4),divLineDashGap:pluckNumber(g.divlinedashgap,2),showAlternateGridColor:pluckNumber(g.showalternatehgridcolor,1),alternateGridColor:pluck(g.alternatehgridcolor,e.getColor(altHGridColorStr)),alternateGridAlpha:pluck(g.alternatehgridalpha,e.getColor(altHGridAlphaStr)),numDivLines:pluckNumber(g.numpdivlines,5),axisMinValue:g.pyaxisminvalue,axisMaxValue:g.pyaxismaxvalue,setAdaptiveMin:pluckNumber(g.setadaptiveymin,1),adjustDiv:g.adjustdiv,labelStep:g.yaxisvaluesstep,showAxisValues:pluckNumber(g.showyaxisvalues,g.showyaxisvalue),showLimits:pluckNumber(g.showyaxislimits,g.showlimits,d.showLimits),showDivLineValues:pluckNumber(g.showdivlinevalues,g.showdivlinevalue),showZeroPlane:g.showzeroplane,zeroPlaneColor:g.zeroplanecolor,zeroPlaneThickness:g.zeroplanethickness,zeroPlaneAlpha:g.zeroplanealpha,showZeroPlaneValue:g.showzeroplanevalue,trendlineColor:g.trendlinecolor,trendlineToolText:g.trendlinetooltext,trendlineThickness:g.trendlinethickness,trendlineAlpha:g.trendlinealpha,showTrendlinesOnTop:g.showtrendlinesontop,showAxisLine:pluckNumber(g.showyaxisline,g.showaxislines,g.drawAxisLines,0),axisLineThickness:pluckNumber(g.yaxislinethickness,g.axislinethickness,1),axisLineAlpha:pluckNumber(g.yaxislinealpha,g.axislinealpha,100),axisLineColor:pluck(g.yaxislinecolor,g.axislinecolor,COLOR_000000)},b.trendlines=f.trendlines,h.push(b),d.config.showVolumeChart&&(c={isVertical:!0,isReverse:!0,isOpposit:!1,axisIndex:1,drawLabelsOpposit:1,axisNameAlignCanvas:1,uniqueClassName:1,outCanfontFamily:pluck(g.outcnvbasefont,g.basefont,defaultFontStr),outCanfontSize:pluckFontSize(g.outcnvbasefontsize,g.basefontsize,10),outCancolor:pluck(g.outcnvbasefontcolor,g.basefontcolor,e.getColor(k.baseFontColor)).replace(/^#?([a-f0-9]+)/ig,'#$1'),axisNamePadding:g.yaxisnamepadding,axisValuePadding:g.yaxisvaluespadding,axisNameFont:g.vyaxisnamefont,axisNameFontSize:g.vyaxisnamefontsize,axisNameFontColor:g.vyaxisnamefontcolor,axisNameFontBold:g.vyaxisnamefontbold,axisNameFontItalic:g.vyaxisnamefontitalic,axisNameBgColor:g.vyaxisnamebgcolor,axisNameBorderColor:g.vyaxisnamebordercolor,axisNameAlpha:g.vyaxisnamealpha,axisNameFontAlpha:g.vyaxisnamefontalpha,axisNameBgAlpha:g.vyaxisnamebgalpha,axisNameBorderAlpha:g.vyaxisnameborderalpha,axisNameBorderPadding:g.vyaxisnameborderpadding,axisNameBorderRadius:g.vyaxisnameborderradius,axisNameBorderThickness:g.vyaxisnameborderthickness,axisNameBorderDashed:g.vyaxisnameborderdashed,axisNameBorderDashLen:g.vyaxisnameborderdashlen,axisNameBorderDashGap:g.vyaxisnameborderdashgap,axisNameWidth:g.yaxisnamewidth,useEllipsesWhenOverflow:g.useellipseswhenoverflow,rotateAxisName:pluckNumber(g.rotateyaxisname,1),axisName:g.vyaxisname,divLineColor:pluck(g.divlinecolor,e.getColor(k.divLineColor)),divLineAlpha:pluck(g.divlinealpha,e.getColor(divLineAlphaStr)),divLineThickness:pluckNumber(g.divlinethickness,1),divLineIsDashed:!!pluckNumber(g.divlinedashed,g.divlineisdashed,1),divLineDashLen:pluckNumber(g.divlinedashlen,4),divLineDashGap:pluckNumber(g.divlinedashgap,2),showAlternateGridColor:pluckNumber(g.showalternatehgridcolor,1),alternateGridColor:pluck(g.alternatehgridcolor,e.getColor(altHGridColorStr)),alternateGridAlpha:pluck(g.alternatehgridalpha,e.getColor(altHGridAlphaStr)),numDivLines:g.numdivlines,axisMinValue:g.vyaxisminvalue,axisMaxValue:g.vyaxismaxvalue,setAdaptiveMin:g.setadaptiveymin,adjustDiv:g.adjustdiv,labelStep:g.yaxisvaluesstep,showAxisValues:pluckNumber(g.showyaxisvalues,g.showyaxisvalue),showLimits:pluckNumber(g.showsecondarylimits,g.showlimits),showDivLineValues:pluckNumber(g.showdivlinevalues,g.showdivlinevalue),showZeroPlane:g.showzeroplane,zeroPlaneColor:g.zeroplanecolor,zeroPlaneThickness:g.zeroplanethickness,zeroPlaneAlpha:g.zeroplanealpha,showZeroPlaneValue:g.showzeroplanevalue,trendlineColor:g.trendlinecolor,trendlineToolText:g.trendlinetooltext,trendlineThickness:g.trendlinethickness,trendlineAlpha:g.trendlinealpha,showTrendlinesOnTop:g.showtrendlinesontop,showAxisLine:pluckNumber(g.showyaxisline,g.showaxislines,g.drawAxisLines,0),axisLineThickness:pluckNumber(g.yaxislinethickness,g.axislinethickness,1),axisLineAlpha:pluckNumber(g.yaxislinealpha,g.axislinealpha,100),axisLineColor:pluck(g.yaxislinecolor,g.axislinecolor,COLOR_000000)},h.push(c)),{xAxisConfigure:i,yAxisConfigure:h}}mouseoutHandler(a,b,c){let d=this,e=d.config.datasetOrder||d.getDatasets(),f=d.getChildren('mouseTracker')[0];e[b]._firePlotEvent(MOUSEOUT,c,a),delete f._lastDatasetIndex,delete f._lastPointIndex}_mouseEvtHandler(a,b){var c,d,e,f,g,h,k,m=this,n=b.mouseTracker,o=a.originalEvent,p=m.getChildren('canvas'),q=p.length,r=o&&getMouseCoordinate(m.getFromEnv('chart-container'),o,m),s=r&&r.chartX||0,t=r&&r.chartY||0,u=!1,v=n._lastDatasetIndex,w=n._lastPointIndex;for(f=0;f<q;f++)for(c=m.getDatasets(),g=c.length;g--&&!u;)d=c[g],d&&d.getState('visible')&&(e=d._getHoveredPlot&&d._getHoveredPlot(s,t),e&&e.hovered&&(u=!0,e.datasetIndex=g,k=n.getMouseEvents(a,e.datasetIndex,e.pointIndex)));if((!u||k&&k.fireOut)&&'undefined'!=typeof v&&c[v]&&c[v]._firePlotEvent&&(k&&!k.events.length?n.mouseoutTimer=setTimeout(function(){m.mouseoutHandler(a,v,w)},20):m.mouseoutHandler(a,v,w)),u)for(h=k.events&&k.events.length,h&&(n._lastDatasetIndex=e.datasetIndex,w=n._lastPointIndex=e.pointIndex),g=0;g<h;g+=1)d&&d._firePlotEvent&&d._firePlotEvent(k.events[g],w,a,e.datasetIndex)}_allocateSpace(a){var b,c,d=this,e=d.getChildren('canvas'),f=e&&e[0].config,g=d.config,h=g.canvasHeight,i=g.canvasWidth,j=g.availableHeight,k=g.availableWidth;c=g.canvasLeft+=a.left||0,b=g.canvasTop+=a.top||0,i=g.canvasWidth=mathMax(i-((a.left||0)+(a.right||0)),0),h=g.canvasHeight=mathMax(h-((a.top||0)+(a.bottom||0)),0),g.availableHeight=mathMax(j-((a.top||0)+(a.bottom||0)),0),g.availableWidth=mathMax(k-((a.left||0)+(a.right||0)),0),g.canvasRight=c+i,g.canvasBottom=b+h,f&&(f.canvasPaddingLeft=mathMax(f.canvasPaddingLeft,a.paddingLeft||0),f.canvasPaddingRight=mathMax(f.canvasPaddingRight,a.paddingRight||0),f.canvasPaddingTop=mathMax(f.canvasPaddingTop,a.paddingTop||0),f.canvasPaddingBottom=mathMax(f.canvasPaddingBottom,a.paddingBottom||0))}_checkInvalidSpecificData(){let a=this.getFromEnv('dataSource'),b=a.dataset,c=b&&b[0]&&b[0].data;if(!b||!c||!Array.isArray(c))return!0}}export default CandleStick;