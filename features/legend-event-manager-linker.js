import{getMouseCoordinate,touchEnabled}from'../_internal/lib/lib';let fireAssociatedEvent=(a,b)=>{let c=a.sender,d=c.getLinkedItem('owner'),e=c.getFromEnv('chart'),f=d&&d.getEventArgs?d.getEventArgs(c):{},g=getMouseCoordinate(c.getFromEnv('chart-container'),a,e);f.chartX=g.chartX,f.chartY=g.chartY,f.pageX=g.pageX,f.pageY=g.pageY,f.id=e.getId(),f.legendItemId=c.getId(),f.legendItemIndex=c.config.index,e.fireChartInstanceEvent(b,f,a)},manageLedendItemsEvent=a=>{var b;a.addExtEventListener('click',function(a){fireAssociatedEvent(a,'legendItemClicked')},a),touchEnabled&&(a.addEventListener('touchstart',function(a){b=setTimeout(()=>{a.preventDefault(),fireAssociatedEvent(a,'legendItemRollover')},600)}),a.addEventListener('touchend',function(a){a.preventDefault(),clearTimeout(b),fireAssociatedEvent(a,'legendItemRollout')})),a.addEventListener('mouseout',function(a){fireAssociatedEvent(a,'legendItemRollout')}),a.addEventListener('mouseover',function(a){fireAssociatedEvent(a,'legendItemRollover')})},legendEventManagerLinker=a=>{let b;a.addEventListener('instantiated',function(a){b=a.sender,'legendItem'===b.getType()&&manageLedendItemsEvent(b)})};export default{extension:legendEventManagerLinker,name:'legendEventManagerLinker',type:'extension',requiresFusionCharts:!0};