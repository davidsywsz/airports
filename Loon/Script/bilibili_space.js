//收藏排行前10，长按通知进入（iOS13以下通知中心不支持）
let url = $request.url;
let regex = /vmid=(\d*)/;
let mid = vmid[1];
let vmid = regex.exec(url);
let mid = vmid[1];
let bili = await $.get(`https://api.bilibili.com/x/space/arc/search?mid=${mid}&ps=10&tid=0&pn=1&keyword=&order=stow`).then((resp) => JSON.parse(resp.body).data[0]);
  $.log(bili);
    let info = "";
    bili['data']['vlist'].forEach((element, index) => {
      index++
      let scheme = `bilibili://av/${element['aid']}`
      info += index + ": " + element['title'] + "\n" + scheme + "\n"
    });
  let title = '';
  let subtitle = '';
  let detail = info;

  $.notify(title, subtitle, detail);
})()
  .catch((err) => $.error(err))
  .finally(() => $.done());

/*********************************** API *************************************/
function API(t="untitled",e=!1){return new class{constructor(t,e){this.name=t,this.debug=e,this.isQX="undefined"!=typeof $task,this.isLoon="undefined"!=typeof $loon,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.isNode="function"==typeof require,this.node=(()=>this.isNode?{request:require("request"),fs:require("fs")}:null)(),this.cache=this.initCache(),this.log(`INITIAL CACHE:\n${JSON.stringify(this.cache)}`),Promise.prototype.delay=function(t){return this.then(function(e){return((t,e)=>new Promise(function(s){setTimeout(s.bind(null,e),t)}))(t,e)})}}get(t){return this.isQX?("string"==typeof t&&(t={url:t,method:"GET"}),$task.fetch(t)):new Promise((e,s)=>{this.isLoon||this.isSurge?$httpClient.get(t,(t,i,o)=>{t?s(t):e({...i,body:o})}):this.node.request(t,(t,i,o)=>{t?s(t):e({...i,status:i.statusCode,body:o})})})}post(t){return this.isQX?("string"==typeof t&&(t={url:t}),t.method="POST",$task.fetch(t)):new Promise((e,s)=>{this.isLoon||this.isSurge?$httpClient.post(t,(t,i,o)=>{t?s(t):e({...i,body:o})}):this.node.request.post(t,(t,i,o)=>{t?s(t):e({...i,status:i.statusCode,body:o})})})}initCache(){if(this.isQX)return JSON.parse($prefs.valueForKey(this.name)||"{}");if(this.isLoon||this.isSurge)return JSON.parse($persistentStore.read(this.name)||"{}");if(this.isNode){const t=`${this.name}.json`;return this.node.fs.existsSync(t)?JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(t,JSON.stringify({}),{flag:"wx"},t=>console.log(t)),{})}}persistCache(){const t=JSON.stringify(this.cache);this.log(`FLUSHING DATA:\n${t}`),this.isQX&&$prefs.setValueForKey(t,this.name),(this.isLoon||this.isSurge)&&$persistentStore.write(t,this.name),this.isNode&&this.node.fs.writeFileSync(`${this.name}.json`,t,{flag:"w"},t=>console.log(t))}write(t,e){this.log(`SET ${e} = ${t}`),this.cache[e]=t,this.persistCache()}read(t){return this.log(`READ ${t} ==> ${this.cache[t]}`),this.cache[t]}delete(t){this.log(`DELETE ${t}`),delete this.cache[t],this.persistCache()}notify(t,e,s,i){const o="string"==typeof i?i:void 0,n=s+(null==o?"":`\n${o}`);this.isQX&&(void 0!==o?$notify(t,e,s,{"open-url":o}):$notify(t,e,s,i)),this.isSurge&&$notification.post(t,e,n),this.isLoon&&$notification.post(t,e,s),this.isNode&&("undefined"==typeof $jsbox?console.log(`${t}\n${e}\n${n}\n\n`):require("push").schedule({title:t,body:e?e+"\n"+s:s}))}log(t){this.debug&&console.log(t)}info(t){console.log(t)}error(t){this.log("ERROR: "+t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){this.log("DONE"),this.isNode||$done(t)}}(t,e)}
/*****************************************************************************/
