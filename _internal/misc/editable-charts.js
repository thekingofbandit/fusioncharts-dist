import Ajax from'../../_internal/misc/ajax.js';import{getDepsByType}from'../../_internal/dependency-manager';import{xssEncode}from'../../_internal/lib/lib';let UNDEF,transcoders=getDepsByType('transcoder');function submitData(){var a,b,c,d,e,f=this,g=new Ajax,h=f.config,i=transcoders.json(),j=transcoders.csv&&transcoders.csv()||'csv',k=transcoders.xml(),l=h.formAction,m=f.getFromEnv('chartInstance'),n=h.submitFormAsAjax;h.formDataFormat===i.format?(a=i.format,f.getJSONData&&(b=JSON.stringify(f.getJSONData())),f.getCollatedData&&(b=JSON.stringify(f.getCollatedData()))):h.formDataFormat&&h.formDataFormat===j.format?(a=j.format,b=f.getCSVString&&f.getCSVString(),(b===UNDEF||''===b)&&(f.getJSONData&&(b=j.fromJSON(f.getJSONData()).data),f.getCollatedData&&(b=j.fromJSON(f.getCollatedData()).data))):(a=k.format,f.getCollatedData&&(b=k.fromJSON(f.getCollatedData()).data),f.getJSONData&&(b=k.fromJSON(f.getJSONData()).data)),f.fireChartInstanceEvent('beforeDataSubmit',{data:b},UNDEF,function(){n?(g.onError=function(a,c,d,e){f.fireChartInstanceEvent('dataSubmitError',{xhrObject:c.xhr,url:e,statusText:a,httpStatus:c.xhr&&c.xhr.status?c.xhr.status:-1,data:b},[m.id,a,c.xhr&&c.xhr.status])},g.onSuccess=function(a,c,d,e){f.fireChartInstanceEvent('dataSubmitted',{xhrObject:g,response:a,url:e,data:b},[m.id,a])},c={},c['str'+a.toUpperCase()]=b,g.open&&g.abort(),g.post(l,c)):(d=window.document.createElement('span'),d.innerHTML='<form style="display:none" action="'+l+'" method="'+h.formMethod+'" target="'+h.formTarget+'"> <input type="hidden" name="strXML" value="'+xssEncode(b)+'"><input type="hidden" name="dataFormat" value="'+a.toUpperCase()+'" /></form>',e=d.removeChild(d.firstChild),window.document.body.appendChild(e),e.submit&&e.submit(),e.parentNode.removeChild(e),d=e=null)},function(){f.fireChartInstanceEvent('dataSubmitCancelled',{data:b})})}export{submitData};