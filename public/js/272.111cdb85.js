"use strict";(self["webpackChunkui"]=self["webpackChunkui"]||[]).push([[272],{6272:function(t,e,o){o.r(e),o.d(e,{default:function(){return Qt}});var i=o(4108);const l={id:"portfolios"},a={id:"portfolio-main"},n={id:"portfolios-sub"};function s(t,e,o,s,d,r){const u=(0,i.E1)("SelectedPortfolio"),c=(0,i.E1)("NewPortfolio");return(0,i.Wz)(),(0,i.An)("main",l,[(0,i.QD)("div",a,[(0,i.K2)(u,{MainPortfolioData:d.MainPortfolioData},null,8,["MainPortfolioData"])]),(0,i.QD)("div",n,[(0,i.K2)(c,{onEmitDataAdded:r.funcDataAdded},null,8,["onEmitDataAdded"])])])}const d=t=>((0,i.ED)("data-v-7d36d1a6"),t=t(),(0,i.ii)(),t),r={id:"selected-portfolio"},u=d((()=>(0,i.QD)("p",{id:"portfolio-name"},[(0,i.QD)("span",null,"Portfolio_name")],-1))),c={id:"portfolio-content"},f=d((()=>(0,i.QD)("div",{id:"chart"},null,-1))),h={id:"portfolio-table"},p={id:"tbl-top"},D={id:"table-info"},m={class:"tbl-info"},A=d((()=>(0,i.QD)("span",{class:"label"},"Sum",-1))),g={class:"result"},Q=["value"],v=d((()=>(0,i.QD)("span",{style:{color:"#ffffff","margin-left":"2px","font-size":"13px"}},"(\\)",-1))),S={class:"tbl-info"},P=d((()=>(0,i.QD)("span",{class:"label"},"Valuation(E)",-1))),y={class:"result"},E=["value"],b=d((()=>(0,i.QD)("span",{style:{color:"#ffffff","margin-left":"2px","font-size":"13px"}},"(%)",-1))),R={class:"tbl-modify"},T=d((()=>(0,i.QD)("div",{id:"table"},null,-1)));function C(t,e,o,l,a,n){return(0,i.Wz)(),(0,i.An)("div",r,[u,(0,i.QD)("div",c,[f,(0,i.QD)("div",h,[(0,i.QD)("div",p,[(0,i.QD)("div",D,[(0,i.QD)("div",m,[A,(0,i.QD)("div",g,[(0,i.QD)("input",{id:"portfolio-sum",type:"text",readonly:"",value:10.23.toLocaleString()},null,8,Q),v])]),(0,i.QD)("div",S,[P,(0,i.QD)("div",y,[(0,i.QD)("input",{id:"portfolio-valuation",type:"text",readonly:"",value:10.23.toLocaleString()},null,8,E),b])])]),(0,i.QD)("div",R,[(0,i.QD)("button",{onClick:e[0]||(e[0]=t=>n.openSubPage())},"New / Other")])]),T])])])}function N(t,e,o){let i={Shanghai:o["CNY/KRW"],Hongkong:o["HKD/KRW"],Singapore:o["SGD/KRW"],Us:o["USD/KRW"],Korea:1},l=t.ASSETS.map((o=>i[t.DATAS[o].MARKET]*e[o]*t.DATAS[o].AMOUNT)),a=l.reduce(((t,e)=>t+e),0),n=Object.values(t.CHART_DATA).reduce(((t,e)=>t+e),0),s=(a-n)/n*100;return[t.CHART_DATA,n,parseFloat(s.toFixed(2))]}var K={props:["MainPortfolioData"],data(){return{Data:{"":0},Sum:1,Value:0,findMarket:null,ctData:[],tblData:[{Name:"AAPL",FX:"USD",Price:100.1234,Amount:1e3,"Total(KRW)":13e3,"Proportion(%)":15},{Name:"XOM",FX:"USD",Price:100.1234,Amount:500,"Total(KRW)":13e3,"Proportion(%)":15},{Name:"CRM",FX:"USD",Price:100.1234,Amount:1200,"Total(KRW)":13e3,"Proportion(%)":15},{Name:"KO",FX:"USD",Price:100.1234,Amount:800,"Total(KRW)":13e3,"Proportion(%)":15},{Name:"GOOGL",FX:"USD",Price:100.1234,Amount:10,"Total(KRW)":13e3,"Proportion(%)":15},{Name:"MSFT",FX:"USD",Price:100.1234,Amount:320,"Total(KRW)":13e3,"Proportion(%)":15}]}},created(){this.getPortfolios()},mounted(){this.findMarket=this.$store.state.allAssetsData,document.getElementById("table").hasChildNodes()&&document.getElementById("table").removeChild(document.getElementById("table").childNodes[0]),this.$Create_Table(this.tblData,"table",getComputedStyle(document.getElementById("table")).width,getComputedStyle(document.getElementById("table")).height,!0)},updated(){this.$Color_Tag()},watch:{MainPortfolioData:function(t){let e=t.ASSETS.map((t=>t={TICKER:t,MARKET:this.findMarket[this.findMarket.findIndex((e=>e.TICKER===t))].MARKET})),o={array:e};this.$http.get("/portfolio/getCurrentPrices",{params:o}).then((e=>{[this.Data,this.Sum,this.Value]=N(t,e.data,this.$store.state.fxRates)})).catch((t=>console.log(t)))}},methods:{getPortfolios:function(){this.$http.get("/portfolio/getPortfolioData").then((t=>{this.data=t.data})).catch((t=>console.log(t)))},openSubPage(){document.getElementById("portfolios-sub").style.right="100vw",document.getElementById("new-portfolio").style.paddingLeft="20vw"}}},W=o(4100);const I=(0,W.c)(K,[["render",C],["__scopeId","data-v-7d36d1a6"]]);var k=I;const w={id:"new-portfolio"},M={id:"contents"};function x(t,e,o,l,a,n){const s=(0,i.E1)("FindPortfolio"),d=(0,i.E1)("AddPortfolio");return(0,i.Wz)(),(0,i.An)("div",w,[(0,i.QD)("div",M,[(0,i.K2)(s),(0,i.K2)(d)])])}var B=o(9096);const O=t=>((0,i.ED)("data-v-0e8e6609"),t=t(),(0,i.ii)(),t),F={id:"find-portfolio"},$=O((()=>(0,i.QD)("p",{id:"title"},[(0,i.QD)("span",null,"New / Other")],-1))),_={id:"main"},U=O((()=>(0,i.QD)("input",{id:"search-portfolio-list"},null,-1))),z={id:"portfolio-list"},L={id:"select-list"},X=["onClick"],H={id:"portfolio-info"};function V(t,e,o,l,a,n){return(0,i.Wz)(),(0,i.An)("div",F,[$,(0,i.QD)("div",_,[U,(0,i.QD)("div",z,[(0,i.QD)("ul",L,[((0,i.Wz)(!0),(0,i.An)(i.ae,null,(0,i.mi)(a.data,((t,o)=>((0,i.Wz)(),(0,i.An)("li",{key:o,onClick:e=>n.showInfo(t),onDblclick:e[0]||(e[0]=t=>n.changePortfolio())},[(0,i.QD)("span",null,(0,B.WA)(t.NAME),1)],40,X)))),128))]),(0,i.QD)("ul",H,[(0,i.QD)("li",null,"Assets : "+(0,B.WA)(this.numOfAssets),1),(0,i.QD)("li",null,"Sum(\\) : "+(0,B.WA)(Number(this.sumTotal).toLocaleString()),1),(0,i.QD)("li",null,"Value(E, %) : "+(0,B.WA)(this.valutaion),1)])])])])}var q={data(){return{data:null,numOfAssets:null,sumTotal:null,valutaion:null}},created(){this.getPortfolios()},methods:{getPortfolios:function(){this.$http.get("/portfolio/getPortfolioData").then((t=>{this.data=t.data})).catch((t=>console.log(t)))},showInfo:function(t){this.numOfAssets=t.ASSETS.length,this.sumTotal=123456789.123,this.valutaion=123.1234},changePortfolio:function(){this.closeSubPage()},closeSubPage:function(){document.getElementById("portfolios-sub").style.right="0px",document.getElementById("new-portfolio").style.paddingLeft="0px"}}};const G=(0,W.c)(q,[["render",V],["__scopeId","data-v-0e8e6609"]]);var Y=G,j=o(7764);const J=t=>((0,i.ED)("data-v-4694d194"),t=t(),(0,i.ii)(),t),Z={id:"find-add"},tt=J((()=>(0,i.QD)("div",{id:"find"},null,-1))),et={id:"included-assets"},ot=J((()=>(0,i.QD)("div",{id:"included-assets-thead"},[(0,i.QD)("table",null,[(0,i.QD)("thead",null,[(0,i.QD)("tr",null,[(0,i.QD)("th",null,"No."),(0,i.QD)("th",null,"Name"),(0,i.QD)("th",null,"Price"),(0,i.QD)("th",null,"Amount"),(0,i.QD)("th",null,"Delete")])])])],-1))),it={id:"included-assets-tbody"},lt=["onClick"],at={id:"find-assets"},nt={id:"find-assets-search"},st={id:"find-assets-suggest"},dt=["onClick"],rt={id:"find-assets-btns"};function ut(t,e,o,l,a,n){return(0,i.Wz)(),(0,i.An)("div",Z,[tt,(0,i.QD)("div",et,[ot,(0,i.QD)("div",it,[(0,i.QD)("table",null,[(0,i.QD)("tbody",null,[((0,i.Wz)(!0),(0,i.An)(i.ae,null,(0,i.mi)(a.addAssetsData,((t,e)=>((0,i.Wz)(),(0,i.An)("tr",{key:e},[(0,i.QD)("td",null,(0,B.WA)(e+1),1),(0,i.QD)("td",null,(0,B.WA)(t),1),(0,i.QD)("td",null,[(0,i.QD)("input",{class:(0,B.WN)("price-"+String(t)),type:"text"},null,2)]),(0,i.QD)("td",null,[(0,i.QD)("input",{class:(0,B.WN)("amount-"+String(t)),type:"number",min:"1",required:"",value:"1"},null,2)]),(0,i.QD)("td",null,[(0,i.QD)("button",{onClick:e=>n.removeAsset(t)},"X",8,lt)])])))),128))])])])]),(0,i.QD)("div",at,[(0,i.QD)("div",nt,[(0,i.wt)((0,i.QD)("input",{type:"text",placeholder:"Set portfolio-name","onUpdate:modelValue":e[0]||(e[0]=t=>a.portfolioName=t)},null,512),[[j.Og,a.portfolioName]]),(0,i.wt)((0,i.QD)("input",{type:"text",placeholder:"Name, ticker symbol, or code","onUpdate:modelValue":e[1]||(e[1]=t=>a.paramForSearch=t)},null,512),[[j.Og,a.paramForSearch]]),(0,i.QD)("ul",st,[0!=a.suggestionResult.length?((0,i.Wz)(!0),(0,i.An)(i.ae,{key:0},(0,i.mi)(a.suggestionResult,((t,e)=>((0,i.Wz)(),(0,i.An)("li",{key:e,onClick:e=>n.addAsset(t.TICKER)},[(0,i.QD)("p",null,(0,B.WA)(t.TICKER),1),(0,i.QD)("p",null,(0,B.WA)(t.NAME),1)],8,dt)))),128)):(0,i.g1)("",!0)])]),(0,i.QD)("div",rt,[(0,i.QD)("button",{onClick:e[2]||(e[2]=t=>n.makeNewPortfolio())},"EXECUTE"),(0,i.QD)("button",{onClick:e[3]||(e[3]=t=>n.PopupOffByCancelBtn())},"CANCEL")])])])}o(3248);var ct={data(){return{addAssetsData:[],findAssetsData:null,suggestionResult:[],portfolioName:"New Portfolio",paramForSearch:"",market_fxRates:{Shanghai:"CNY/KRW",Hongkong:"HKD/KRW",Singapore:"SGD/KRW",Us:"USD/KRW"}}},mounted(){this.findAssetsData=this.$store.state.allAssetsData},watch:{paramForSearch:function(t){""!==t&&null!==t?(this.suggestionResult=[],this.suggestionResult.push(...this.findAssetsData.filter((e=>e.NAME.toLowerCase().startsWith(t.toLowerCase())))),this.suggestionResult.push(...this.findAssetsData.filter((e=>e.TICKER.toLowerCase().startsWith(t.toLowerCase())))),this.suggestionResult=[...new Set(this.suggestionResult)]):this.suggestionResult=[]},addAssetsData:{handler(t,e){this.$nextTick((()=>{let t=document.getElementById("included-assets-tbody"),[e,o]=[t.scrollHeight,t.clientHeight];if(e>o){for(let t of document.querySelectorAll("#included-assets-tbody tr:last-child td"))t.style.borderTop="1px solid gray",t.style.borderBottom="none";t.scrollBy(0,e)}}))},deep:!0}},methods:{makeNewPortfolio:function(){let t={NAME:[null,""].includes(this.portfolioName)?"New Portfolio":this.portfolioName,TYPE:"Customized",ASSETS:this.addAssetsData,DATAS:this.setAssetsInPortfolio()};0!==Object.keys(t["DATAS"]).length&&this.$http.post("/portfolio/makeNewPortfolio",{params:t}).then((t=>{this.$emit("emitDataAdded",1),this.PopupOffByCancelBtn()})).catch((t=>console.log(t)))},setAssetsInPortfolio:function(){let t={};for(const e of this.addAssetsData){let o=this.findAssetsData[this.findAssetsData.findIndex((t=>t.TICKER===e))].MARKET;t[e]={MARKET:o,FXRATE:"Korea"===o?1:Number(this.$store.state.fxRates[this.market_fxRates[o]]),PRICE:Number(document.querySelector(`.price-${e}`).value),AMOUNT:Number(document.querySelector(`.amount-${e}`).value)}}return t},addAsset:function(t){let e=this.addAssetsData.find((e=>e===t));if(void 0===e){let e=this.findAssetsData[this.findAssetsData.findIndex((e=>e.TICKER===t))].MARKET,o=0;this.$http.get("/portfolio/addAsset",{params:{TICKER:t,MARKET:e}}).then((e=>{this.addAssetsData.push(t),o=e.data[0].Close})).then((e=>{o=o.toFixed(o%1===0?0:4).toLocaleString(),document.querySelector(`.price-${t}`).value=o})).catch((t=>console.log(t)))}},removeAsset:function(t){this.addAssetsData.splice(this.addAssetsData.findIndex((e=>e===t)),1)},PopupOffByCancelBtn:function(){this.$emit("PopupSwitchOff",!1),this.closeSubPage()},closeSubPage:function(){document.getElementById("portfolios-sub").style.right="0px",document.getElementById("new-portfolio").style.paddingLeft="0px"}}};const ft=(0,W.c)(ct,[["render",ut],["__scopeId","data-v-4694d194"]]);var ht=ft,pt={components:{FindPortfolio:Y,AddPortfolio:ht}};const Dt=(0,W.c)(pt,[["render",x],["__scopeId","data-v-5f6fdf0d"]]);var mt=Dt,At={components:{SelectedPortfolio:k,NewPortfolio:mt},data(){return{MainPortfolioData:null,dataAdded:null}},methods:{sendDataToMain(t){this.MainPortfolioData=t},funcDataAdded:function(t){this.dataAdded+=t}}};const gt=(0,W.c)(At,[["render",s],["__scopeId","data-v-1deedda5"]]);var Qt=gt}}]);
//# sourceMappingURL=272.111cdb85.js.map