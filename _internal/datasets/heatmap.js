import ComponentInterface from'../../core/component-interface';import{pluckNumber,pluck,parseUnsafeString,parseTooltext,getValidValue,getDashStyle,getDefinedColor,BLANK,BLANKSTRING,setLineHeight,preDefStr,toRaphaelColor,isIE,hasTouch,TOUCH_THRESHOLD_PIXELS,CLICK_THRESHOLD_PIXELS}from'../lib/lib';import{convertColor,getLightColor,getColumnColor}from'../lib/lib-graphics';import{addDep}from'../dependency-manager';import heatmapAnimation from'../animation-rules/heatmap-animation';import{priorityList}from'../schedular';let UNDEF,HUNDREDSTRING='100',PLOTGRADIENTCOLOR='plotGradientColor',PLOTBORDERCOLOR='plotBorderColor',COLOR_FFFFFF='FFFFFF',SHOWSHADOW='showShadow',MOUSEOVER='mouseOver',MOUSEOUT='mouseOut',NORMAL='normal',PXSTRING='px',pStr=preDefStr.pStr,sStr=preDefStr.sStr,COMMA=',',BOLDSTARTTAG='<b>',BOLDENDTAG='</b>',BREAKSTRING='<br />',visibleStr='visible',miterStr=preDefStr.miterStr,hiddenStr=preDefStr.hiddenStr,showHoverEffectStr=preDefStr.showHoverEffectStr,POSITION_START=preDefStr.POSITION_START,POSITION_TOP=preDefStr.POSITION_TOP,POSITION_END=preDefStr.POSITION_END,POSITION_BOTTOM=preDefStr.POSITION_BOTTOM,SETROLLOVERATTR='setRolloverAttr',SETROLLOUTATTR='setRolloutAttr',EVENTARGS='eventArgs',POINTER='pointer',tlLabelStr='tlLabel',blLabelStr='blLabel',trLabelStr='trLabel',brLabelStr='brLabel',ROLLOVER='DataPlotRollOver',ROLLOUT='DataPlotRollOut',DEFAULT_CURSOR=preDefStr.DEFAULT,defined=function(e){return e!==UNDEF&&null!==e},createGroup=function(e,t,o){var a=o.getFromEnv('animationManager');return a.setAnimation({el:'group',attr:e,container:t,component:o,label:'group'})},TRACKER_FILL='rgba(192,192,192,'+(isIE?.002:1e-6)+')',HTP=hasTouch?TOUCH_THRESHOLD_PIXELS:CLICK_THRESHOLD_PIXELS,pInt=function(e,t){return parseInt(e,t||10)},NONE='none',_rolloverResponseSetter=function(e,t,o,a,i){var l=t.graphics,r=e.getFromEnv('animationManager'),n=l&&l.element,s=n&&n.getData();!0!==s.draged&&(r.setAnimationState(MOUSEOVER),n&&0!==s.showHoverEffect&&r.setAnimation({el:n,attr:n.getData().setRolloverAttr,component:i}),!a&&n&&e.plotEventHandler(n,o,ROLLOVER))},_rolloutResponseSetter=function(e,t,o,a,i){var l=t.graphics,r=e.getFromEnv('animationManager'),n=l&&l.element,s=n&&n.getData();!0!==s.draged&&(r.setAnimationState(MOUSEOUT),n&&0!==s.showHoverEffect&&r.setAnimation({el:n,attr:n.getData().setRolloutAttr,component:i}),!a&&n&&e.plotEventHandler(n,o,ROLLOUT))},mathMax=Math.max,mathMin=Math.min,mathAbs=Math.abs;addDep({name:'heatmapAnimation',type:'animationRule',extension:heatmapAnimation});class HeatMapDataset extends ComponentInterface{constructor(){super(),this.components={},this.graphics={},this.dataSetArray=[]}getType(){return'dataset'}getName(){return'heatMap'}configureAttributes(e){var t=Math.max;if(!e)return!1;this.trimData(e),this.config.JSONData=e;var o,a,l,n,s,g,h,p,d,b,m,v,f,u,x,y,L,E,C=this,w=C.getFromEnv('chart'),S=C.getFromEnv('chartConfig'),F=S.style,A=C.config,k=A.JSONData,P=k.data,T=P&&P.length,D=C.getFromEnv('chart-attrib'),V=C.getFromEnv('color-manager'),O=C.index||C.positionIndex,_=A.plotColor=V.getPlotColor(O),R=pluckNumber(k.dashed,D.plotborderdashed),I=C.components.data,B=C.components.plotGrid=[],G=C.getFromEnv('number-formatter'),j=w.isBar,N=w.config.is3D,M=-Infinity,H=+Infinity,z=C.getFromEnv('totalRows'),W=C.getFromEnv('totalColumns');for(v=0;v<z;v++)for(B.push([]),f=0;f<W;f++)B[v].push([]);for(C.setState('visible',1===pluckNumber(C.getState('visible'),C.config.JSONData.visible,!+C.config.JSONData.initiallyhidden,1)),o=A.showplotborder=pluckNumber(D.showplotborder,N?0:1),A.plotDashLen=a=pluckNumber(D.plotborderdashlen,5),A.plotDashGap=l=pluckNumber(D.plotborderdashgap,4),A.plotfillAngle=pluckNumber(360-D.plotfillangle,j?180:90),A.plotFillAlpha=s=pluck(k.alpha,D.plotfillalpha,HUNDREDSTRING),A.plotColor=_=pluck(k.color,_),A.isRoundEdges=n=pluckNumber(D.useroundedges,0),A.plotRadius=pluckNumber(D.useRoundEdges,A.isRoundEdges?1:0),A.plotFillRatio=pluck(k.ratio,D.plotfillratio),A.plotgradientcolor=getDefinedColor(D.plotgradientcolor,V.getColor(PLOTGRADIENTCOLOR)),A.plotBorderAlpha=o?pluck(D.plotborderalpha,s,HUNDREDSTRING):0,A.plotBorderColor=pluck(D.plotbordercolor,N?COLOR_FFFFFF:V.getColor(PLOTBORDERCOLOR)),A.plotBorderThickness=pluckNumber(D.plotborderthickness,1),A.plotBorderDashStyle=R?getDashStyle(a,l):NONE,A.showValues=pluckNumber(k.showvalues,D.showvalues,1),A.valuePadding=pluckNumber(D.valuepadding,2),A.enableAnimation=b=pluckNumber(D.animation,D.defaultanimation,1),A.animation=!!b&&{duration:1e3*pluckNumber(D.animationduration,1)},A.transposeAnimation=pluckNumber(D.transposeanimation,b),A.transposeAnimDuration=1e3*pluckNumber(D.transposeanimduration,.2),A.showShadow=n||N?pluckNumber(D.showshadow,1):pluckNumber(D.showshadow,V.getColor(SHOWSHADOW)),A.showHoverEffect=pluckNumber(D.plothovereffect,D.showhovereffect,UNDEF),A.showTooltip=pluckNumber(D.showtooltip,1),A.definedGroupPadding=t(pluckNumber(D.plotspacepercent),0),A.plotSpacePercent=t(pluckNumber(D.plotspacepercent,20)%100,0),A.maxColWidth=pluckNumber(j?D.maxbarheight:D.maxcolwidth,50),A.plotPaddingPercent=pluckNumber(D.plotpaddingpercent),A.rotateValues=pluckNumber(D.rotatevalues)?270:0,A.placeValuesInside=pluckNumber(D.placevaluesinside,0),A.defaultPadding={left:.5,right:.5,top:.5,bottom:.5},u=F.inCanfontFamily,x=pInt(F.inCanfontSize,10),y=F.inCancolor,L=NORMAL,E=NORMAL,A.tlLabelStyle={fontFamily:pluck(D.tlfont,u),fontSize:pluckNumber(D.tlfontsize,x)+PXSTRING,color:convertColor(pluck(D.tlfontcolor,y),100),fontWeight:L,fontStyle:E},setLineHeight(A.tlLabelStyle),A.trLabelStyle={fontFamily:pluck(D.trfont,u),fontSize:pluckNumber(D.trfontsize,x)+PXSTRING,color:convertColor(pluck(D.trfontcolor,y),100),fontWeight:L,fontStyle:E},A.brLabelStyle={fontFamily:pluck(D.brfont,u),fontSize:pluckNumber(D.brfontsize,x)+PXSTRING,color:convertColor(pluck(D.brfontcolor,y),100),fontWeight:L,fontStyle:E},A.blLabelStyle={fontFamily:pluck(D.blfont,u),fontSize:pluckNumber(D.blfontsize,x)+PXSTRING,color:convertColor(pluck(D.blfontcolor,y),100),fontWeight:L,fontStyle:E},A.use3DLighting=pluckNumber(D.use3dlighting,1),A.parentYAxis=pluck(k.parentyaxis&&k.parentyaxis.toLowerCase(),pStr)===sStr?1:0,I||(I=C.components.data=[]),m=0;m<T;m++)g=P&&P[m],p=I[m],d=p&&p.config,p||(p=I[m]={graphics:{}}),p.config||(d=I[m].config={}),d.setValue=h=G.getCleanValue(g.value),M=t(M,h),H=Math.min(H,h);A.maxValue=M,A.minValue=H,C._setConfigure(),C.setState('dirty',!0)}_setConfigure(){var e,t,o,a,l,r,n,s,g,c,h,p,d,b,m,v,f,u,x,y,L,E,C,w,S,F,A,k,P,T,D,V,O,_,R,I,B,G,j,N,M,H,z=this,W=z.getFromEnv('chart'),J=z.config,Y=z.config.JSONData,U=Y.data,X=U&&U.length,q=z.getFromEnv('chart-attrib'),K=z.getFromEnv('color-manager'),Q=z.index||z.positionIndex,Z=J.showplotborder,$=J.plotColor=K.getPlotColor(Q),ee=pluckNumber(q.showtooltip,1),te=parseUnsafeString(q.yaxisname),oe=parseUnsafeString(q.xaxisname),ae=parseUnsafeString(pluck(q.tooltipsepchar,': ')),ie=pluckNumber(q.useplotgradientcolor,1),le=J.plotDashLen,re=J.plotDashGap,ne=J.plotBorderThickness,se=J.isRoundEdges,ge=J.showHoverEffect,ce=J.plotfillAngle,he=J.plotFillAlpha,pe=J.plotFillRatio,de=J.plotBorderAlpha,be=J.plotBorderColor,me=z.getFromEnv('chartColorRange'),ve=z.getFromEnv('xAxis'),fe=z.getFromEnv('yAxis'),ue=J.mapByPercent=pluckNumber(me.mapbypercent,0),xe=J.mapByCategory=pluckNumber(q.mapbycategory,0),ye=me&&pluckNumber(me.gradient),Le=z.components.data,Ee=z.getFromEnv('number-formatter'),Ce=W.isBar,we=W.config.is3D,Se=J.parentYAxis,Fe=J.maxValue,Ae=J.minValue,ke=getValidValue(q.tltype,BLANK),Pe=getValidValue(q.trtype,BLANK),Te=getValidValue(q.bltype,BLANK),De=getValidValue(q.brtype,BLANK),Ve=BLANK,Oe=BLANK,_e=BLANK,Re=BLANK,Ie=W.getFromEnv('colorManager');if(k=Fe-Ae,J.eventAttached||(z.addExtEventListener('legendUpdate',function(t,e){if('legend'===e.component)e.legendItem.hasState('hidden')?z.show(e.legendItem,t):z.hide(e.legendItem,t);else for(B=e.maxMinArray,G=B.length,A=0;A<G;A++)z.updatePlot(B[A].min,B[A].max)},Ie),J.eventAttached=!0),(!ye||xe)&&(J.colorMap=[],me.color))for(A=0;A<me.color.length;A++)J.colorMap[A]={config:me.color[A],dataSet:z},J.colorMap[A].config.visible=!0;for(A=0;A<X;A++){if(n=U&&U[A],g=Le[A],c=g&&g.config,s=c.setValue,c.showValue=pluckNumber(n.showvalue,J.showValues),c.setLink=pluck(n.link),c.toolTipValue=j=Ee.dataLabels(s,Se),c.setDisplayValue=F=parseUnsafeString(n.displayvalue),c.displayValue=pluck(F,j),N=pluckNumber(n.dashed),M=pluckNumber(n.dashlen,le),H=re=pluckNumber(n.dashgap,re),c.plotBorderDashStyle=1===N?getDashStyle(M,H):0===N?NONE:J.plotBorderDashStyle,c.percentValue=ue?_=n.value&&Math.round(1e4*((n.value-Ae)/k))/100:UNDEF,c.value=I=xe?n.colorrangelabel||n.categoryid:ue?_:c.setValue,P=Ie.getColor(I),g.legendItemIndex=P.seriesIndex,c.legendItemId=P.legendItemId,P&&!P.code&&(P.code='ffffff'),c.plotFillAlpha=he=pluckNumber(n.alpha,P&&P.oriAlpha,J.plotFillAlpha),$=pluck(n.color,P&&P.code),0>s&&!se&&(ce=Ce?180-ce:360-ce),c.colorArr=getColumnColor($+COMMA+J.plotgradientcolor,he.toString(),pe,ce,se,be,de.toString(),Ce?1:0,!!we),P&&P.outOfRange){c.visible=!1,c.displayValue=BLANKSTRING;continue}c.visible=!0,c.color=convertColor($,c.plotFillAlpha),0!==ge&&(d=pluck(n.hovercolor,Y.hovercolor,q.plotfillhovercolor,q.columnhovercolor,$),b=pluck(n.hoveralpha,Y.hoveralpha,q.plotfillhoveralpha,q.columnhoveralpha,'25'),m=pluck(n.hovergradientcolor,Y.hovergradientcolor,q.plothovergradientcolor,!ie&&BLANKSTRING),!m&&(m=BLANKSTRING),v=pluck(n.hoverratio,Y.hoverratio,q.plothoverratio,pe),f=pluckNumber(360-n.hoverangle,360-Y.hoverangle,360-q.plothoverangle,ce),u=pluck(n.borderhovercolor,Y.borderhovercolor,q.plotborderhovercolor,be),x=pluck(n.borderhoveralpha,Y.borderhoveralpha,q.plotborderhoveralpha,de,he),y=pluckNumber(n.borderhoverthickness,Y.borderhoverthickness,q.plotborderhoverthickness,ne),L=pluckNumber(n.borderhoverdashed,Y.borderhoverdashed,q.plotborderhoverdashed),E=pluckNumber(n.borderhoverdashgap,Y.borderhoverdashgap,q.plotborderhoverdashgap,le),C=pluckNumber(n.borderhoverdashlen,Y.borderhoverdashlen,q.plotborderhoverdashlen,re),w=L?getDashStyle(C,E):J.plotBorderDashStyle,1==ge&&d===$&&(d=getLightColor(d,70)),S=getColumnColor(d,b,v,f,se,u,x.toString(),Ce?1:0,!!we),c.setRolloutAttr={fill:toRaphaelColor(c.color),stroke:Z&&toRaphaelColor(c.colorArr[1])||TRACKER_FILL,"stroke-width":ne,"stroke-dasharray":r||[]},c.setRolloverAttr={fill:toRaphaelColor(S[0]),stroke:Z&&toRaphaelColor(S[1])||TRACKER_FILL,"stroke-width":y,"stroke-dasharray":w}),ue&&(_=Ee.percentValue(_)),c.setValue=s=Ee.getCleanValue(n.value),c.toolTipValue=Ee.dataLabels(s,Se),e=c.toolTipValue,o=getValidValue(parseUnsafeString(pluck(n.tooltext,Y.plottooltext,q.plottooltext))),c.tlLabel=T=parseUnsafeString(pluck(n.tllabel,n.ltlabel)),c.trLabel=D=parseUnsafeString(pluck(n.trlabel,n.rtlabel)),c.blLabel=V=parseUnsafeString(pluck(n.bllabel,n.lblabel)),c.brLabel=O=parseUnsafeString(pluck(n.brlabel,n.rblabel)),F=getValidValue(parseUnsafeString(n.displayvalue)),R=xe?F:pluck(n.displayvalue,e),c.displayValue=pluck(F,_,c.toolTipValue),ke!==BLANK&&(Ve=BOLDSTARTTAG+ke+ae+BOLDENDTAG),Pe!==BLANK&&(Oe=BOLDSTARTTAG+Pe+ae+BOLDENDTAG),Te!==BLANK&&(_e=BOLDSTARTTAG+Te+ae+BOLDENDTAG),De!==BLANK&&(Re=BOLDSTARTTAG+De+ae+BOLDENDTAG),h=ve.getCategoryFromId(U[A].columnid.toLowerCase()),p=fe.getCategoryFromId(U[A].rowid.toLowerCase()),ee?(null===e?l=!1:o===UNDEF?l=(ue?'<b>Value'+ae+BOLDENDTAG+e+BREAKSTRING+BOLDSTARTTAG+'Percentage'+ae+BOLDENDTAG+_:R)+(T===BLANK?BLANK:BREAKSTRING+(Ve+T))+(D===BLANK?BLANK:BREAKSTRING+Oe+D)+(V===BLANK?BLANK:BREAKSTRING+_e+V)+(O===BLANK?BLANK:BREAKSTRING+Re+O):(a=[1,2,5,6,7,14,93,94,95,96,97,98,112,113,114,115,116,117],t={formattedValue:e,value:n.value,yaxisName:te,xaxisName:oe,displayValue:F,percentValue:ue?_:BLANK,tlLabel:T,trLabel:D,blLabel:V,brLabel:O,rowLabel:p.tickObj&&p.tickObj.label,columnLabel:h.tickObj&&h.tickObj.label,percentDataValue:ue?_:BLANK,trtype:Pe,tltype:ke,brType:De,blType:Te,colorRangeLabel:c.colorRangeLabel},l=parseTooltext(o,a,t,n,q,t)),c.toolText=l,c.setTooltext=l):c.toolText=!1}}hide(e){var t,o,a,l,r,n=this,s=n.components.data,g=n.getFromEnv('chart'),c=n.getFromEnv('animationManager'),h=g.getChildren('colorRange')[0];for(l=e.config.datasetObj.code,t=0,o=s.length;t<o;t++)Object.keys(s[t]).length&&(r=h.getColorObj(s[t].config.value).code,a=s[t].config,l===r&&(s[t].graphics.element&&c.setAnimation({el:s[t].graphics.element,attr:{"fill-opacity":0,"stroke-width":0},component:n}),s[t].graphics.hotElement&&s[t].graphics.hotElement.hide(),s[t].graphics.valEle&&s[t].graphics.valEle.hide(),s[t].graphics.tlLabel&&s[t].graphics.tlLabel.hide(),s[t].graphics.trLabel&&s[t].graphics.trLabel.hide(),s[t].graphics.blLabel&&s[t].graphics.blLabel.hide(),s[t].graphics.brLabel&&s[t].graphics.brLabel.hide(),a.visible=!1,s[t].visible=!1));e.setLegendState('hidden')}show(e){var t,o,a,l,r,n,s,g=this,c=g.components.data,h=g.config,p=g.getFromEnv('chart'),d=g.getFromEnv('animationManager'),b=p.getChildren('colorRange')[0];for(n=e.config.datasetObj.code,l=0,r=c.length;l<r;l++)Object.keys(c[l]).length&&(t=c[l].config,o=t.plotFillAlpha/100,a=b.getColorObj(c[l].config.value),s=!a.outOfRange&&a.code,n===s&&(c[l].graphics.element&&d.setAnimation({el:c[l].graphics.element,attr:{visibility:visibleStr},component:g}),c[l].graphics.element&&d.setAnimation({el:c[l].graphics.element,component:g,attr:{"fill-opacity":o,"stroke-width":h.plotBorderThickness}}),c[l].graphics.hotElement&&c[l].graphics.hotElement.show(),c[l].graphics.valEle&&c[l].graphics.valEle.show(),c[l].graphics.tlLabel&&c[l].graphics.tlLabel.show(),c[l].graphics.trLabel&&c[l].graphics.trLabel.show(),c[l].graphics.blLabel&&c[l].graphics.blLabel.show(),c[l].graphics.brLabel&&c[l].graphics.brLabel.show(),t.visible=!0,c[l].visible=!0));e&&e.removeLegendState('hidden')}updatePlot(){var e,t,o,a,l,r=this,n=arguments[0],s=arguments[1],g=r.config,c=r.getFromEnv('animationManager'),h=r.components.data;for(o=0,a=h.length;o<a;o++)Object.keys(h[o]).length&&(e=h[o].config,t=e.plotFillAlpha/100,l=h[o].config.value,l<n||l>s?e.visible&&(h[o].graphics.element&&c.setAnimation({el:h[o].graphics.element,attr:{"fill-opacity":0,"stroke-width":0},component:r}),h[o].graphics.hotElement&&h[o].graphics.hotElement.hide(),h[o].graphics.valEle&&h[o].graphics.valEle.hide(),h[o].graphics.tlLabel&&h[o].graphics.tlLabel.hide(),h[o].graphics.trLabel&&h[o].graphics.trLabel.hide(),h[o].graphics.blLabel&&h[o].graphics.blLabel.hide(),h[o].graphics.brLabel&&h[o].graphics.brLabel.hide(),e.visible=!1,h[o].visible=!1):!e.visible&&(h[o].graphics.element&&c.setAnimation({el:h[o].graphics.element,attr:{"fill-opacity":t,"stroke-width":g.plotBorderThickness},callback:function(){this.show()},component:r}),h[o].graphics.hotElement&&h[o].graphics.hotElement.show(),h[o].graphics.valEle&&h[o].graphics.valEle.show(),h[o].graphics.tlLabel&&h[o].graphics.tlLabel.show(),h[o].graphics.trLabel&&h[o].graphics.trLabel.show(),h[o].graphics.blLabel&&h[o].graphics.blLabel.show(),h[o].graphics.brLabel&&h[o].graphics.brLabel.show(),e.visible=!0,h[o].visible=!0))}_checkPointObj(e,t,o,a){var i,l,r,n,s,g=this,c=g.components.plotGrid,h=g.getFromEnv('chartConfig'),p=h.viewPortConfig,d=p.x,b=p.scaleX,m=h.plotborderthickness,v=h.showplotborder;if(i=c[t]&&c[t][e],m=v?m:0,l=m/2,l=0==l%2?l+1:Math.round(l),i&&i.config&&i.config.visible&&(r=o-(i._xPos-d*b)+l,n=a-i._yPos+l,s=0<=r&&r<=i._width+m&&0<=n&&n<=i._height+m,s))return{pointIndex:i._index,hovered:s,pointObj:i}}_getHoveredPlot(e,t){var o,a,i,l,r=this,n=r.getFromEnv('chartConfig'),s=r.getFromEnv('xAxis'),g=r.getFromEnv('yAxis'),c=n.canvasHeight/r.getFromEnv('totalRows');return e+=s.getTranslation(),t+=g.getTranslation(),a=g.getValue(t+c/2),l=Math.floor(a),o=s.getValue(e),i=Math.round(o),0<i-o?.5<a-l?r._checkPointObj(i,l,e,t)||r._checkPointObj(i-1,l,e,t):r._checkPointObj(i,l-1,e,t)||r._checkPointObj(i,l,e,t):.5<a-l?r._checkPointObj(i+1,l,e,t)||r._checkPointObj(i,l,e,t):r._checkPointObj(i,l-1,e,t)||r._checkPointObj(i+1,l,e,t)||r._checkPointObj(i,l,e,t)}parsePlotAttributes(e,t){var o,a,l,r,n,s,g,c,h,p,d,b,m,v,f,u,x=this,y=x.config.JSONData,L=x.config,E=y.data,C=t,i=x.getState('visible'),w=x.getFromEnv('chart'),S=x.getFromEnv('xAxis'),F=x.getFromEnv('yAxis'),A=x.getFromEnv('chartConfig'),k=A.showtooltip,P=x.components.data,T=F.getAxisBase(),D=F.yBasePos=F.getPixel(T),V=0,O=L.plotBorderThickness,_=L.plotRadius,R=w.getFromEnv('legend')&&w.getFromEnv('legend').config.isActive,I=x.components.plotGrid;e&&Object.keys(e).length&&(m=A.canvasWidth/x.getFromEnv('totalColumns'),n=A.canvasHeight/x.getFromEnv('totalRows'),u=e.trackerConfig={},p=e&&e.config,c=p.setValue,v=S.getCategoryFromId(E[C].columnid.toLowerCase()),f=F.getCategoryFromId(E[C].rowid.toLowerCase()),(0===v.index||v.index)&&(0===f.index||f.index)&&(L.mapByCategory||null!==c)&&(g=p.setLink,d=p.colorArr,!e.graphics&&(P[C].graphics={}),h=p.displayValue,a=S.getPixel(v.index)-m/2,l=F.getPixel(f.index)-n/2,r=m,s=p.toolText,s&&(p.finalTooltext=s),u.eventArgs={index:C,link:g,value:p.percentValue||c,displayValue:h,columnId:v.tickObj.id,rowId:f.tickObj.id,tlLabel:p.tlLabel,trLabel:p.trLabel,blLabel:p.blLabel,brLabel:p.brLabel,toolText:s?s:'',id:BLANKSTRING,datasetIndex:R?e.datasetIndex:UNDEF,datasetName:R?e.datasetName:UNDEF,visible:i},D=l,V=n,o={x:a,y:D,width:r,height:V||1,r:_,fill:p.color,stroke:toRaphaelColor(d[1]),"stroke-width":O,"stroke-dasharray":b,"fill-opacity":p.plotFillAlpha/100,"stroke-linejoin":miterStr,visibility:p.visible?visibleStr:hiddenStr,cursor:g?POINTER:BLANKSTRING},e._xPos=a,e._yPos=l,e._height=n,e._width=r,e._index=C,I[f.index][v.index]=e,e.graphics.element?(o={x:a,y:l,width:r,height:n||1},o.fill=p.color,o.stroke=toRaphaelColor(d[1]),o['fill-opacity']=p.visible?p.plotFillAlpha/100:0,o['stroke-width']=p.visible?O:0,o['stroke-dasharray']=b,o['stroke-linejoin']=miterStr,o.visibility=p.visible?visibleStr:hiddenStr,o.cursor=g?POINTER:BLANKSTRING):(o['fill-opacity']=p.plotFillAlpha/100,o['stroke-width']=O),(g||k)&&(n<HTP&&(l-=(HTP-n)/2,n=HTP),u.attr={x:a,y:l,width:r,height:n,r:_,cursor:g?POINTER:BLANKSTRING,stroke:TRACKER_FILL,"stroke-width":O,fill:TRACKER_FILL,visibility:p.visible?visibleStr:hiddenStr}),p.props={element:{attr:o}}))}allocatePosition(){var e,t,o,a=this,l=a.config.JSONData,r=l.data,n=a.components.data;for(e=r&&r.length,t=0;t<e;t++)o=n[t],a.parsePlotAttributes(o,t)}drawPlots(){var e,t,o,a,l,r,n,s,g,c,h,p,d=this,b=d.config.JSONData,m=d.config,v=b.data,f=d.getFromEnv('animationManager'),u=d.getState('visible'),x=d.getFromEnv('xAxis'),y=d.getFromEnv('yAxis'),L=d.getFromEnv('chartConfig'),E=d.components.data,C=m.showShadow,w=d.getContainer('plotGroup'),S=d.getContainer('shadowGroup'),F=[],A=d.components.removeDataArr||[],k=A.length,P=m.showHoverEffect;for(e=v&&v.length,t=0;t<e;t++)if(a=E[t],p=a.trackerConfig,n=a&&a.config,!!a.graphics){if(s=a.graphics.element?u?'updating':'hiding':'appearing',r=n.setValue,g=x.getCategoryFromId(v[t].columnid.toLowerCase()),c=y.getCategoryFromId(v[t].rowid.toLowerCase()),0!==g.index&&!g.index||0!==c.index&&!c.index){a.graphics.element=a.graphics.element&&f.setAnimation({el:a.graphics.element,component:d});continue}if(g.tickObj&&c.tickObj&&n.value!==BLANKSTRING||!a.graphics||(a.graphics.element=a.graphics.element&&f.setAnimation({el:a.graphics.element,component:d})),!m.mapByCategory&&null===r&&a.graphics){a.graphics.element&&a.graphics.element.hide(),a.graphics.hotElement&&a.graphics.hotElement.hide();continue}h=g.index.toString()+c.index.toString(),F.push(h),a.graphics.element?(l=a.graphics.element,n.elemCreated=!1,f.setAnimation({el:l,state:s,attr:n.props.element.attr,component:d})):(l=a.graphics.element=f.setAnimation({el:'rect',component:d,attr:n.props.element.attr,label:'rect',container:w}),n.elemCreated=!0),l.shadow({opacity:C},S).data('BBox',o),L.enablemousetracking&&l.data(EVENTARGS,p.eventArgs).data(showHoverEffectStr,P).data(SETROLLOVERATTR,n.setRolloverAttr||{}).data(SETROLLOUTATTR,n.setRolloutAttr||{})}d.drawn?d.drawLabel():d.addJob('labelJob',d.drawLabel.bind(d),priorityList.label),d.drawn=!0,k&&d.removeDataElems()}drawLabel(){var e,t,o,a,l,r,n,s,g,c,h,p,d,b,m,v,f,u,x,y,L,E,C,w,S,F,A,k,P,T,D,V,O,_,R,I=this,B=I.getFromEnv('chartConfig'),G=I.getFromEnv('smartLabel'),j=I.getFromEnv('animationManager'),N=B.dataLabelStyle,M=I.config,H=I.config.JSONData,z=H.data||[],W=z.length,J=I.components,Y=J.data,U=I.getContainer('labelGroup'),X=I.graphics.tlLabelContainer,q=I.graphics.blLabelContainer,K=I.graphics.trLabelContainer,Q=I.graphics.brLabelContainer;for(j.setAnimation({el:U,attr:{opacity:1},component:I,label:'text'}),X||(X=I.graphics.tlLabelContainer=createGroup({name:tlLabelStr},U,I)),q||(q=I.graphics.blLabelContainer=createGroup({name:blLabelStr},U,I)),K||(K=I.graphics.trLabelContainer=createGroup({name:trLabelStr},U,I)),Q||(Q=I.graphics.brLabelContainer=createGroup({name:brLabelStr},U,I)),c=M.tlLabelStyle,h=M.trLabelStyle,p=M.blLabelStyle,d=M.brLabelStyle,b={fontFamily:c.fontFamily,fontSize:c.fontSize,lineHeight:c.lineHeight,fontWeight:c.fontWeight,fontStyle:c.fontStyle},m={fontFamily:h.fontFamily,fontSize:h.fontSize,lineHeight:h.lineHeight,fontWeight:h.fontWeight,fontStyle:h.fontStyle},v={fontFamily:p.fontFamily,fontSize:p.fontSize,lineHeight:p.lineHeight,fontWeight:p.fontWeight,fontStyle:p.fontStyle},f={fontFamily:d.fontFamily,fontSize:d.fontSize,lineHeight:d.lineHeight,fontWeight:d.fontWeight,fontStyle:d.fontStyle},G.useEllipsesOnOverflow(B.useEllipsesWhenOverflow),G.setStyle(N),X.css(b),q.css(v),K.css(m),Q.css(f),t=0;t<W;t++)if((e=Y[t],e!==UNDEF)&&(a=e.graphics,!!a)){if(_=e&&e.config,R=_.setValue,!M.mapByCategory&&null===R){I.removeLabels(e);continue}o=_.displayValue,u=e.graphics.element,x=e._width,y=e._height,L=e._xPos,E=e._yPos,G.setStyle(N),C=G.getSmartText(o,x,y,!1),o=C.text,defined(o)&&o!==BLANK&&_.showValue?(l=E+.5*y,r=L+.5*x,g={text:o,title:C.tooltext||BLANKSTRING,visibility:_.visible?visibleStr:hiddenStr,fill:N.color,direction:_.textDirection,x:r,y:l,"text-bound":[N.backgroundColor,N.borderColor,N.borderThickness,N.borderPadding,N.borderRadius,N.borderDash]},u?e.graphics.valEle=j.setAnimation({el:e.graphics.valEle||'text',container:U,component:I,label:'text',attr:g}):e.graphics.valEle&&(e.graphics.valEle=j.setAnimation({el:e.graphics.valEle,component:I})),w=_.tlLabel,S=_.trLabel,F=_.blLabel,A=_.brLabel,k=defined(w)&&w!==BLANK,P=defined(S)&&S!==BLANK,T=defined(F)&&F!==BLANK,D=defined(A)&&A!==BLANK,V=x*(k&&P?.5:.9),O=.5*(y-(C&&C.height||0)),n=E+4,k?(G.setStyle(c),C=G.getSmartText(w,V,O,!1),o=C.text,s=L,g={text:o,title:C.tooltext||BLANKSTRING,visibility:_.visible?visibleStr:hiddenStr,fill:c.color,"text-anchor":POSITION_START,"vertical-align":POSITION_TOP,direction:_.textDirection,x:s+4,y:n,"text-bound":[c.backgroundColor,c.borderColor,c.borderThickness,c.borderPadding,c.borderRadius,c.borderDash]},e.graphics.tlLabel=j.setAnimation({el:e.graphics.tlLabel||'text',component:I,attr:Object.assign(g,b),container:X})):e.graphics.tlLabel&&(e.graphics.tlLabel=j.setAnimation({el:e.graphics.tlLabel,component:I})),P?(G.setStyle(h),C=G.getSmartText(S,V,O,!1),o=C.text,s=L+x,g={text:o,title:C.tooltext||BLANKSTRING,visibility:_.visible?visibleStr:hiddenStr,fill:h.color,"text-anchor":POSITION_END,"vertical-align":POSITION_TOP,direction:_.textDirection,x:s-4,y:n,"text-bound":[h.backgroundColor,h.borderColor,h.borderThickness,h.borderPadding,h.borderRadius,h.borderDash]},e.graphics.trLabel=j.setAnimation({el:e.graphics.trLabel||'text',attr:Object.assign(g,m),container:K,component:I})):e.graphics.trLabel&&(e.graphics.trLabel=j.setAnimation({el:e.graphics.trLabel,component:I})),n=E+y-4,T?(G.setStyle(p),C=G.getSmartText(F,V,O,!1),o=C.text,s=L,g={text:o,title:C.tooltext||BLANKSTRING,visibility:_.visible?visibleStr:hiddenStr,fill:p.color,"text-anchor":POSITION_START,"vertical-align":POSITION_BOTTOM,direction:_.textDirection,x:s+4,y:n,"text-bound":[p.backgroundColor,p.borderColor,p.borderThickness,p.borderPadding,p.borderRadius,p.borderDash]},e.graphics.blLabel=j.setAnimation({el:e.graphics.blLabel||'text',component:I,container:q,attr:Object.assign(g,v)})):e.graphics.blLabel&&(e.graphics.blLabel=j.setAnimation({el:e.graphics.blLabel,component:I})),D?(G.setStyle(p),C=G.getSmartText(A,V,O,!1),o=C.text,s=L+x-4,g={text:o,title:C.tooltext||BLANKSTRING,visibility:_.visible?visibleStr:hiddenStr,fill:d.color,"text-anchor":POSITION_END,"vertical-align":POSITION_BOTTOM,direction:_.textDirection,x:s,y:n,"text-bound":[d.backgroundColor,d.borderColor,d.borderThickness,d.borderPadding,d.borderRadius,d.borderDash]},e.graphics.brLabel=j.setAnimation({el:e.graphics.brLabel||'text',attr:Object.assign(g,f),container:Q,component:I})):e.graphics.brLabel&&(e.graphics.brLabel=j.setAnimation({el:e.graphics.brLabel,component:I}))):I.removeLabels(e)}I.labelDrawn=!0}removeLabels(e){let t=this,o=t.getFromEnv('animationManager');e.graphics.valEle&&(e.graphics.valEle=o.setAnimation({el:e.graphics.valEle,component:t})),e.graphics.tlLabel&&(e.graphics.tlLabel=o.setAnimation({el:e.graphics.tlLabel,component:t})),e.graphics.trLabel&&(e.graphics.trLabel=o.setAnimation({el:e.graphics.trLabel,component:t})),e.graphics.blLabel&&(e.graphics.blLabel=o.setAnimation({el:e.graphics.blLabel,component:t})),e.graphics.brLabel&&(e.graphics.brLabel=o.setAnimation({el:e.graphics.brLabel,component:t}))}removeDataElems(){var e,t,o,a,l=this,r=l.getFromEnv('animationManager'),n=l.components,s=n.removeDataArr,g=n.pool||(n.pool={element:[],hotElement:[],label:[]}),c=s.length;for(a=0;a<c;a++)if(e=s[0],s.splice(0,1),e&&e.graphics){for(t in o=e.graphics,o)o[t]&&(o[t]=r.setAnimation({el:o[t],component:l}));e.graphics.element&&(g.element=g.element.concat(e.graphics.element)),e.graphics.hotElement&&(g.hotElement=g.hotElement.concat(e.graphics.hotElement)),e.graphics.label&&(g.label=g.label.concat(e.graphics.label))}n.pool=g}getAxisValuePadding(){return this.config.defaultPadding}getDataLimits(){var e,t,o,a=this,l=a.components.data,r=a.config,n=l.length,s=-Infinity,g=+Infinity;for(e=0;e<n;e++)l[e]&&Object.keys(l[e]).length&&(t=l[e].config,o=t.setValue,o!==UNDEF&&null!==o&&(s=mathMax(s,o),g=mathMin(g,o)));return r.maxValue=s,r.minValue=g,{max:r.maxValue,min:r.minValue}}trimData(e){if(!this.config.JSONData)return;let t,o,a=this,i=a.config,l=i&&i.context,r=l&&l.prevCatlen,n=a.getFromEnv('xAxis'),s=n.getTicksLen(),g=r-s,c=i.JSONData,h=c.data&&c.data.length,p=e.data&&e.data.length||0,d=h-p;g>d?(t=g,o=s):(t=d,o=p),0<t&&this.removeData(o,t,!1)}draw(){var e=this,t=e.config,o=e.getFromEnv('xAxis'),a=o.getPixel(0),i=o.getPixel(1),l=e.getFromEnv('groupMaxWidth'),r=t.drawn;l||(l=mathAbs(i-a),e.addToEnv('groupMaxWidth',l)),r||e.createContainer(),o.getState('scrolling')||e.createCoordinates(),e.drawPlots()}createContainer(){var e,t,o=this,a=o.getType(),i=o.groupName,l=o.getFromEnv('chart'),r=o.getLinkedParent(),n=i||o.dsGroup||a;r.getChildContainer(n+'VcanvasGroup')||(n='default'),e=r.getChildContainer(n+'VcanvasGroup'),t=r.getChildContainer(n+'ShadowVcanvasGroup'),o.getContainer('shadowGroup')||o.addContainer('shadowGroup',createGroup({name:'shadow-group'},t,o)),o.getContainer('errorShadowGroup')||o.addContainer('errorShadowGroup',createGroup({name:'error-shadow-group'},t,o)),o.getContainer('commonElemsGroup')||o.addContainer('commonElemsGroup',createGroup({name:'common-elems-group'},e,o)),o.getContainer('plotGroup')||o.addContainer('plotGroup',createGroup({name:'plot-group'},e,o)),o.getContainer('errorPlotGroup')||o.addContainer('errorPlotGroup',createGroup({name:'error-plot-group'},e,o)),l.hasAnchor&&o.getContainer('errorPlotGroup').insertBefore(o.getContainer('plotGroup')),o.getContainer('labelGroup')||o.addContainer('labelGroup',createGroup({name:'label-group',class:'fusioncharts-datalabels'},r.getChildContainer('vcanvasLabelGroup'),o))}createCoordinates(){var e,t,o,a,l,r,n,s=this,g=s.components,c=g.data,h=s.getFromEnv('chart'),p=h.isBar,d=s.getFromEnv('yAxis'),b=s.getFromEnv('xAxis'),m=d.getAxisBase(),v=d.getPixel(m),f=b.config.isVertical,u=h.config.xDepth||0,x=h.config.yDepth||0,y=c.length,L=s.components,E=s.getLinkedParent(),C=E.getstackConf&&E.getstackConf(),w=L.data;for(p||(u=-u),p&&(x=-x),a=0;a<y;a++)(e=w[a],t=e&&e.config,e!==UNDEF)&&(o=t._b,l=b.getPixel(C&&C[a].x||t._x)+u,r=d.getPixel(t._y)+x,n=(o?d.getPixel(o):v)+x,f?(t._Px=r,t._Py=l,t._Pby=l,t._Pbx=n):(t._Px=l,t._Py=r,t._Pby=n,t._Pbx=l),s.getLineShift&&(t._Py+=s.getLineShift('y')))}_decideTooltipType(t,o){var e=this,a=e.getLinkedParent(),i=e.getFromEnv('chart'),l=i.config.drawTrendRegion,r=e.components,n=e.getFromEnv('toolTipController'),s=r.data,g=s[t],c=g&&(g.config.finalTooltext||g.config.toolText),h=g&&(g.graphics.element||e.graphics.sharedAnchor.element),p=e.config.currentToolTip,d=o.originalEvent;l&&h?e.config.currentToolTip=a._drawTooltip(t,e.config.index,d,p):c&&!l&&(p?n.draw(d,c,p):p=e.config.currentToolTip=n.draw(d,c))}_firePlotEvent(t,o,a){var e,i,l=this,r=l.getFromEnv('chart'),n=l.components,s=l.getFromEnv('toolTipController'),g=n.data,c=g[o],h=c.graphics.element,p=l.config.currentToolTip;h&&(e=c.config,i=e.setLink,'mouseover'===t?(l._decideTooltipType(o,a),_rolloverResponseSetter(r,c,a,UNDEF,l),i&&(h.node.style.cursor=POINTER)):'mouseout'===t?(s.hide(p),_rolloutResponseSetter(r,c,a,UNDEF,l),i&&(h.node.style.cursor=DEFAULT_CURSOR)):'click'===t?r.plotEventHandler(h,a):'mousemove'===t?l._decideTooltipType(o,a):void 0)}removeData(e,t,o){var a,l,r,n=this,s=n.getFromEnv('chart'),g=n.components,c=g.data,h=g.removeDataArr||(g.removeDataArr=[]),p=n.config,d=n.maxminFlag;for(t===UNDEF&&(t=1),e=e||0,e+t!==c.length&&s.isRealTime?(0===e||e===UNDEF)&&(n.endPosition=!1):n.endPosition=!0,g.removeDataArr=h=h.concat(c.splice(e,t)),r=h.length,a=r-1;0<=a;a--){if(!h[a]){h.splice(a,1);continue}if(l=h[a].config,(l.setValue===p.maxValue||l.setValue===p.minValue)&&(d=n.maxminFlag=!0),l._x-=t,d)break}n.removeDataLen=r,n.resetCatPos&&n.resetCatPos(),d&&n.getDataLimits&&n.getDataLimits(),o&&n.asyncDraw()}}export default HeatMapDataset;