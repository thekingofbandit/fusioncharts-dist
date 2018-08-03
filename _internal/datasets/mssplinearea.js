import AreaDataset from'./area';import{toRaphaelColor,stubFN,preDefStr,UNDEF}from'../lib/lib';import _calculateMaxMin from'./spline.helper';import{addDep}from'../dependency-manager';import{getSplinePath}from'../misc/msspline-path';import mssplineareaAnimation from'../animation-rules/mssplinearea-animation';var BLANKSTRING='',SETROLLOVERATTR=preDefStr.setRolloverAttrStr,SETROLLOUTATTR=preDefStr.setRolloutAttrStr,MAX_MITER_LINEJOIN=2;addDep({name:'mssplineareaAnimation',type:'animationRule',extension:mssplineareaAnimation});class MSSplineAreaDataset extends AreaDataset{constructor(){super(),this.drawCommonElements=stubFN}getType(){return'dataset'}configureAttributes(a){super.configureAttributes&&super.configureAttributes(a),_calculateMaxMin.call(this)}getDataLimits(){return{max:this.config.maxValue,min:this.config.minValue}}drawPlots(){var a,b,c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B=this,C=B.config,D=B.getFromEnv('chart'),E=D.config,F=B.getFromEnv('xAxis'),G=null,H=[],I=[],J=B.components.data,K=E.connectnulldata,L=E.minimizetendency,M=C.plotbordercolor,N=C.plotborderalpha,O=C.plotBorderDashStyle,P=C.plotborderthickness,Q=B.getContainer(),R=[],S=B.getGraphicalElement('splineElement'),T=C.fillColor,U=B.components.removeDataArr||[],V=U.length,W=Q&&Q.shadowGroup,X=C.shadow,Y=B.getState('visible'),Z={},$=!E.drawfullareaborder,_=B.getGraphicalElement('connector'),aa=B.getFromEnv('animationManager'),ba=C._oldStartIndex,ca=C._oldEndIndex,da=B.config.JSONData,ea=da.renderas||D.config.defaultDatasetType,fa=/area/ig.test(ea);for(C.imagesLoaded=0,J||(J=B.components.data),a=F.getTicksLen(),z=C.scrollMinVal,A=C.scrollMaxVal,z>ba&&B.flushOnScroll(ba,z>ca?ca:z),A<ca&&B.flushOnScroll(A<ba?ba:A,ca),C._oldStartIndex=z,C._oldEndIndex=A,b=z;b<A;b++)(j=J[b],!!j)&&(h=j&&j.config,m=h.setValue,Z=h.anchorProps,u=Z.shadow,k=j.graphics.element,l=j.graphics.hotElement,w=j.graphics.image,null===m?(k&&k.hide(),l&&l.hide(),w&&w.hide(),!K&&(G=null)):(e=h._Py,d=h._Px,!1===Y&&(e=h._Pby),I.push({x:d,y:e,lastXPos:f,lastYPos:G}),f=d,G=e,p=Z.anchorAlpha,q=Z.radius,t=q&&p,o=h.hoverEffects,s=k?Y&&t?'updating':'disappearing':'appearing',Z.imageUrl?B.drawAnchorImage(j):(r=Object.assign({},h.props.element.attr),('disappearing'===s||!Y)&&(r=UNDEF),k=j.graphics.element=aa.setAnimation({el:k||'path',attr:r,container:Q.plotGroup,component:B,label:'anchor'}),w&&w.hide(),k&&k.show().shadow(u,Q.anchorShadowGroup).data('anchorRadius',Z.radius).data('anchorHoverRadius',o.anchorRadius).data('eventArgs',h.eventArgs),o.enabled&&k&&k.data('anchorRadius',Z.radius).data('anchorHoverRadius',o.anchorRadius).data('hoverEnabled',o.enabled).data(SETROLLOVERATTR,o.attrs.setRolloverAttr).data(SETROLLOUTATTR,o.attrs.setRolloutAttr))));for(c=a,g=getSplinePath(I,h&&h._Pby,L,fa,c),R=g.closedPath,R=R.join(),x={path:R,stroke:toRaphaelColor({color:M,alpha:N}),"stroke-width":$?0:P,fill:toRaphaelColor(T),"stroke-linecap":'round',"stroke-linejoin":P>MAX_MITER_LINEJOIN?'round':'miter',"stroke-dasharray":O},B.getState('visible')||(x=UNDEF),n=aa.setAnimation({el:S||'path',attr:x,container:Q.commonElemsGroup,component:B,label:'line'}),!n&&S&&B.removeGraphicalElement(S),S||B.addGraphicalElement('splineElement',n),R!==BLANKSTRING&&B.getState('visible')?n.show().shadow(X,W):n&&n.hide(),$&&(y={path:H,stroke:toRaphaelColor({color:M,alpha:N}),"stroke-width":P,"stroke-linecap":'round',"stroke-linejoin":P>MAX_MITER_LINEJOIN?'round':'miter',"stroke-dasharray":O,name:'connector'},v=aa.setAnimation({el:_||'path',attr:y,container:Q.areaGroup,state:_?B.getState('visible')?'updating':'disappearing':'appearing',component:B,label:'line'}),!_&&B.addGraphicalElement('connector',v)),b=0;b<V;b++)B._removeDataVisuals(U.shift())}getName(){return'splinearea'}}export default MSSplineAreaDataset;