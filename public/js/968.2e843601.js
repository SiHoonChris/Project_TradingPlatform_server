"use strict";(self["webpackChunkui"]=self["webpackChunkui"]||[]).push([[968],{5680:function(t,a,e){e.d(a,{c:function(){return h}});var d=e(4108);const i={id:"popup-container"},n={id:"close-btn"},r={id:"popup-contents"};function o(t,a,e,o,v,s){return(0,d.Wz)(),(0,d.An)("div",i,[(0,d.QD)("div",n,[(0,d.QD)("button",{id:"off-btn",onClick:a[0]||(a[0]=t=>s.PopupOff())},"X")]),(0,d.QD)("div",r,[(0,d.oF)(t.$slots,"contents",{},void 0,!0)])])}var v={methods:{PopupOff:function(){this.$emit("PopupSwitchOff",!1)}}},s=e(4100);const c=(0,s.c)(v,[["render",o],["__scopeId","data-v-3636d38f"]]);var h=c},9968:function(t,a,e){e.r(a),e.d(a,{default:function(){return Dt}});var d=e(4108);const i={id:"detail"},n={id:"charts-in-popup"},r={id:"candle-chart"},o={id:"buy-and-sell"},v={id:"order-history"},s={id:"asset-memo"};function c(t,a,e,c,h,b){const p=(0,d.E1)("DebtRatio"),f=(0,d.E1)("ProfitMargin"),l=(0,d.E1)("FinancialValues"),u=(0,d.E1)("FinancialReport"),C=(0,d.E1)("PopupSlot"),m=(0,d.E1)("CandleChart"),D=(0,d.E1)("BuyAndSell"),E=(0,d.E1)("OrderHistory"),I=(0,d.E1)("AssetMemo");return(0,d.Wz)(),(0,d.An)("div",i,[h.popUpOnOff?((0,d.Wz)(),(0,d.Az)(C,{key:0,onPopupSwitchOff:b.setPopupSwitch},{contents:(0,d.Ql)((()=>[(0,d.QD)("div",n,[(0,d.K2)(p),(0,d.K2)(f)]),(0,d.K2)(l),(0,d.K2)(u)])),_:1},8,["onPopupSwitchOff"])):(0,d.g1)("",!0),(0,d.QD)("div",r,[(0,d.K2)(m,{onPopupSwitchOn:b.setPopupSwitch},null,8,["onPopupSwitchOn"])]),(0,d.QD)("div",o,[(0,d.K2)(D)]),(0,d.QD)("div",v,[(0,d.K2)(E)]),(0,d.QD)("div",s,[(0,d.K2)(I)])])}var h=e(9096);const b=t=>((0,d.ED)("data-v-50f33df6"),t=t(),(0,d.ii)(),t),p={id:"CandleChart"},f={id:"chart-helper"},l={id:"asset-price"},u={id:"name"},C={id:"chart-tool"},m=b((()=>(0,d.QD)("button",null,"X",-1))),D=b((()=>(0,d.QD)("div",{id:"asset-chart"},[(0,d.QD)("svg",{width:"200%",height:"100%"})],-1)));function E(t,a,e,i,n,r){return(0,d.Wz)(),(0,d.An)("div",p,[(0,d.QD)("div",f,[(0,d.QD)("div",l,[(0,d.QD)("span",u,(0,h.WA)(this.assetName),1)]),(0,d.QD)("div",C,[(0,d.QD)("button",{onClick:a[0]||(a[0]=t=>r.PopupOn())},"X"),m])]),D])}var I={data(){return{assetName:null,marketInfo:null,datasForChart:null}},created(){this.$store.commit("getAssetName",this.$route.params.ticker),this.$store.commit("getMarketInfo",this.$route.params.ticker),this.assetName=this.$store.state.assetName,this.marketInfo=this.$store.state.marketInfo,this.getHistoricalPriceData(this.$route.params.ticker,this.marketInfo)},updated(){this.$Standard_Candle(this.datasForChart,"#asset-chart svg")},methods:{getHistoricalPriceData:function(t,a){this.$http.get("/trade/getHistoricalPriceData",{params:{TICKER:t,MARKET:a}}).then((t=>{this.datasForChart=t.data,this.$Standard_Candle(this.datasForChart,"#asset-chart svg"),document.querySelector("#asset-chart").scrollBy(document.querySelector("#asset-chart").offsetWidth,0)})).catch((t=>console.log(t)))},PopupOn:function(){this.$emit("PopupSwitchOn",!0)}}},y=e(4100);const O=(0,y.c)(I,[["render",E],["__scopeId","data-v-50f33df6"]]);var A=O;const P={id:"BuyAndSell"},R=(0,d.IL)('<div id="select-trade" data-v-52b97968><label data-v-52b97968><input type="radio" name="select-trade" id="select-buy" checked data-v-52b97968><div data-v-52b97968>Buy</div></label><label data-v-52b97968><input type="radio" name="select-trade" id="select-sell" data-v-52b97968><div data-v-52b97968>Sell</div></label></div><div id="select-quantity" data-v-52b97968><input type="number" id="price" placeholder="price" data-v-52b97968><input type="number" id="amount" placeholder="amount" data-v-52b97968><input type="number" id="total" placeholder="total" readonly data-v-52b97968></div><div id="decision" data-v-52b97968><button data-v-52b97968>BUY</button></div>',3),_=[R];function N(t,a,e,i,n,r){return(0,d.Wz)(),(0,d.An)("div",P,_)}var S={data(){return{}}};const T=(0,y.c)(S,[["render",N],["__scopeId","data-v-52b97968"]]);var F=T;const L={id:"OrderHistory"},g=(0,d.IL)('<div id="select-order-history" data-v-71189e61><select data-v-71189e61><option data-v-71189e61>Open Orders</option><option data-v-71189e61>Order History</option><option data-v-71189e61>Trade History</option></select></div><table data-v-71189e61><thead data-v-71189e61><tr data-v-71189e61><th data-v-71189e61>Date</th><th data-v-71189e61>Type</th><th data-v-71189e61>Detail</th></tr></thead><tbody data-v-71189e61><tr data-v-71189e61><td data-v-71189e61></td><td data-v-71189e61></td><td data-v-71189e61></td></tr></tbody></table>',2),Q=[g];function k(t,a){return(0,d.Wz)(),(0,d.An)("div",L,Q)}const z={},W=(0,y.c)(z,[["render",k],["__scopeId","data-v-71189e61"]]);var $=W;const w={id:"AssetMemo",placeholder:"Memo"};function K(t,a){return(0,d.Wz)(),(0,d.An)("textarea",w)}const M={},V=(0,y.c)(M,[["render",K],["__scopeId","data-v-7cb938be"]]);var H=V,B=e(5680);const U={id:"debt-ratio"};function Y(t,a,e,i,n,r){return(0,d.Wz)(),(0,d.An)("div",U)}var q=JSON.parse('[{"TotalLiabilities":400,"TotalEquity":600}]'),X={data(){return{Data:null}},created(){this.Data=q},mounted(){this.$Donut_Chart(this.Data[0],"#debt-ratio")}};const G=(0,y.c)(X,[["render",Y],["__scopeId","data-v-9bd14bd0"]]);var J=G;const x={id:"profit-margin"};function j(t,a,e,i,n,r){return(0,d.Wz)(),(0,d.An)("div",x)}var Z=JSON.parse('[{"profit":"Rev","size":282836},{"profit":"Oper_Inc","size":74842},{"profit":"Net_Inc","size":59972}]'),tt={date(){return{Data:null}},created(){this.Data=Z},mounted(){this.$Horizontal_Bar_Chart(this.Data,"#profit-margin")}};const at=(0,y.c)(tt,[["render",j],["__scopeId","data-v-e0fb0b94"]]);var et=at;const dt={id:"financial-values"},it=(0,d.IL)('<div id="financial-values-thead" data-v-06ef4bea><table data-v-06ef4bea><thead data-v-06ef4bea><tr data-v-06ef4bea><th rowspan="2" data-v-06ef4bea>FY</th><th colspan="2" data-v-06ef4bea>REV</th><th colspan="2" data-v-06ef4bea>OP INC</th><th colspan="2" data-v-06ef4bea>NET INC</th><th colspan="2" data-v-06ef4bea>TA</th><th colspan="2" data-v-06ef4bea>TL</th><th data-v-06ef4bea>CA / CL</th><th data-v-06ef4bea>TE</th><th data-v-06ef4bea>NI / NCL</th><th data-v-06ef4bea>EPS</th><th colspan="2" data-v-06ef4bea>MARKET CAP.</th><th data-v-06ef4bea>DIV</th><th colspan="2" data-v-06ef4bea>OPER.C/F</th></tr><tr data-v-06ef4bea><th colspan="3" data-v-06ef4bea>REV GROW.</th><th colspan="3" data-v-06ef4bea>NI / R</th><th data-v-06ef4bea>CA</th><th data-v-06ef4bea>NCA</th><th data-v-06ef4bea>CL</th><th data-v-06ef4bea>NCL</th><th data-v-06ef4bea>CA / NCL</th><th data-v-06ef4bea>TL / TE</th><th data-v-06ef4bea>ROE</th><th data-v-06ef4bea>PER</th><th data-v-06ef4bea>PRICE</th><th data-v-06ef4bea>S.OUT</th><th data-v-06ef4bea>DIV.Y/R</th><th data-v-06ef4bea>R/E</th><th data-v-06ef4bea>C &amp; CE</th></tr></thead></table></div><div id="financial-values-tbody" data-v-06ef4bea><table data-v-06ef4bea><tbody data-v-06ef4bea><tr data-v-06ef4bea><td rowspan="2" data-v-06ef4bea>FY</td><td colspan="2" data-v-06ef4bea>REV</td><td colspan="2" data-v-06ef4bea>OP INC</td><td colspan="2" data-v-06ef4bea>NET INC</td><td colspan="2" data-v-06ef4bea>TA</td><td colspan="2" data-v-06ef4bea>TL</td><td data-v-06ef4bea>CA / CL</td><td data-v-06ef4bea>TE</td><td data-v-06ef4bea>NI / NCL</td><td data-v-06ef4bea>EPS</td><td colspan="2" data-v-06ef4bea>MARKET CAP.</td><td data-v-06ef4bea>DIV</td><td colspan="2" data-v-06ef4bea>OPER.C/F</td></tr><tr data-v-06ef4bea><td colspan="3" data-v-06ef4bea>REV GROW.</td><td colspan="3" data-v-06ef4bea>NI / R</td><td data-v-06ef4bea>CA</td><td data-v-06ef4bea>NCA</td><td data-v-06ef4bea>CL</td><td data-v-06ef4bea>NCL</td><td data-v-06ef4bea>CA / NCL</td><td data-v-06ef4bea>TL / TE</td><td data-v-06ef4bea>ROE</td><td data-v-06ef4bea>PER</td><td data-v-06ef4bea>PRICE</td><td data-v-06ef4bea>S.OUT</td><td data-v-06ef4bea>DIV.Y/R</td><td data-v-06ef4bea>R/E</td><td data-v-06ef4bea>C &amp; CE</td></tr></tbody></table></div>',2),nt=[it];function rt(t,a,e,i,n,r){return(0,d.Wz)(),(0,d.An)("div",dt,nt)}var ot={};const vt=(0,y.c)(ot,[["render",rt],["__scopeId","data-v-06ef4bea"]]);var st=vt;const ct={id:"financial-report"},ht=(0,d.IL)('<div id="financial-report-thead" data-v-462b9e5e><table data-v-462b9e5e><thead data-v-462b9e5e><tr data-v-462b9e5e><th data-v-462b9e5e>Form type</th><th data-v-462b9e5e>Form Description</th><th data-v-462b9e5e>Filing Date</th><th data-v-462b9e5e>Reporting Date</th></tr></thead></table></div><div id="financial-report-tbody" data-v-462b9e5e><table data-v-462b9e5e><tbody data-v-462b9e5e><tr data-v-462b9e5e><td data-v-462b9e5e>Form</td><td data-v-462b9e5e>Form Description</td><td data-v-462b9e5e>F Date</td><td data-v-462b9e5e>R Date</td></tr></tbody></table></div>',2),bt=[ht];function pt(t,a,e,i,n,r){return(0,d.Wz)(),(0,d.An)("div",ct,bt)}var ft={};const lt=(0,y.c)(ft,[["render",pt],["__scopeId","data-v-462b9e5e"]]);var ut=lt,Ct={components:{CandleChart:A,BuyAndSell:F,OrderHistory:$,AssetMemo:H,PopupSlot:B.c,DebtRatio:J,ProfitMargin:et,FinancialValues:st,FinancialReport:ut},data(){return{popUpOnOff:!1}},methods:{setPopupSwitch:function(t){this.popUpOnOff=t}}};const mt=(0,y.c)(Ct,[["render",c],["__scopeId","data-v-6507a983"]]);var Dt=mt}}]);
//# sourceMappingURL=968.2e843601.js.map