"use strict";(self.webpackChunkhonset=self.webpackChunkhonset||[]).push([[126],{6990:function(e,t,n){n.d(t,{lR:function(){return a},zH:function(){return r},E3:function(){return s},Bz:function(){return i},eA:function(){return o}});var a={currentPage:1,totalItemCount:0,totalPage:1,search:"",pageSizes:[10,20,50,100]},r={1:"Male",2:"Female",3:"Other"},s={name:"",email:"",password:"",profile:"",phone:"",description:""},i=["1-10","10-20","20-30","30-40","40-50","50-60","60-100"],o=[{key:"usersDetails",name:"Provider Details"},{key:"documents",name:"Documents"},{key:"services",name:"Services"},{key:"bookings",name:"Bookings"}]},6780:function(e,t,n){n.r(t);var a=n(4942),r=n(2982),s=n(1413),i=n(885),o=n(2791),l=n(6153),d=n(7988),c=n(3002),u=n(8556),h=n(1034),m=n(8472),f=n(3794),x=n(4726),g=n(2950),j=n(2919),p=n(3964),v=n(5084),Z=n(8024),S=n(9959),P=n(6990),b=n(184),w=o.memo((function(e){var t=(0,o.useRef)(null),n=(0,o.useState)(P.lR),w=(0,i.Z)(n,2),N=w[0],k=w[1],C=(0,o.useState)([]),y=(0,i.Z)(C,2),z=y[0],I=y[1],R=(0,o.useState)(!0),_=(0,i.Z)(R,2),A=_[0],D=_[1],B=(0,o.useState)(10),E=(0,i.Z)(B,2),U=E[0],F=E[1],M=(0,o.useState)(1),O=(0,i.Z)(M,2),V=O[0],H=O[1],K=(0,o.useState)(void 0),L=(0,i.Z)(K,2),q=L[0],G=L[1],J=(0,o.useState)(!1),Q=(0,i.Z)(J,2),T=Q[0],W=Q[1],X=(0,o.useState)(""),Y=(0,i.Z)(X,2),$=Y[0],ee=Y[1],te=(0,o.useState)({gender:"",country:"",age:""}),ne=(0,i.Z)(te,2),ae=ne[0],re=ne[1],se=(0,o.useState)([]),ie=(0,i.Z)(se,2),oe=ie[0],le=ie[1],de=(0,o.useState)(!1),ce=(0,i.Z)(de,2),ue=ce[0],he=ce[1];(0,o.useEffect)((function(){var t,n;(0,x.Be)(V,U,q,(null===(t=e.match)||void 0===t||null===(n=t.params)||void 0===n?void 0:n.status)||"",ae).then((function(e){var t=e.data.data,n=t.result,a=t.pagination;D(!1),I(n),P.lR.totalItemCount=a.totalRecord,P.lR.selectedPageSize=a.limit,P.lR.totalPage=a.totalPage,k((0,s.Z)({},P.lR))})).catch((function(e){if(D(!1),e.response){var t=e.response.data;g.fn.warning(t.error_message,"Something went wrong",3e3,null,null,"")}}))}),[U,V,q,ae]);var me=(V-1)*U,fe=V*U;return A?(0,b.jsx)("div",{className:"loading"}):(0,b.jsxs)(o.Fragment,{children:[(0,b.jsx)(m.CSVLink,{data:oe,filename:"instructor-record.csv",style:{display:"none"},ref:t,children:"Download"}),(0,b.jsx)(u.Z,{onClick:function(){return e.history.push("/add-provider")},addShow:!0,Addname:"+ Add New Provider",match:e.match,heading:"Provider",changePageSize:function(e){D(!0),F(e)},selectedPageSize:U,totalItemCount:N.totalItemCount,startIndex:me,endIndex:fe,onSearchKey:function(e){G(e.target.value)},orderOptions:N.orderOptions,pageSizes:N.pageSizes}),(0,b.jsx)(p.Z,{loading:ue}),(0,b.jsxs)(l.Z,{className:"mb-4",children:[(0,b.jsxs)(d.Z,{md:"3",children:[(0,b.jsx)(c.Z,{children:"Age Range"}),(0,b.jsxs)("select",{onChange:function(e){var t=e.target,n=t.name,r=t.value;re((0,s.Z)((0,s.Z)({},ae),{},(0,a.Z)({},n,r)))},name:"age",className:"form-control",children:[(0,b.jsx)("option",{value:"",children:"--Select Age Range"}),P.Bz.map((function(e){return(0,b.jsx)("option",{value:e,children:e},e)}))]})]}),(0,b.jsx)(d.Z,{md:"3"}),(0,b.jsx)(d.Z,{md:"3"}),(0,b.jsx)(d.Z,{md:"3",children:(0,b.jsxs)("button",{className:"btn btn-info ml-5 mt-4",onClick:function(){var n,a;he(!0),(0,x.Be)(1,1e3,"",(null===(n=e.match)||void 0===n||null===(a=n.params)||void 0===a?void 0:a.status)||"",ae).then((function(e){var n=e.data.data.result;he(!1);var a=n.map((function(e){return{"Provider Name":e.name,"Provider Email":e.email,"Provider Phone":e.phone,"Provider gender":P.zH[e.gender],"Provider status":{0:"Inactive",1:"Active"}[e.status],"Profile Created":(0,Z.Ny)(e.created)}}));le(a),t.current.link.click()})).catch((function(e){if(he(!1),e.response){var t=e.response.data;g.fn.warning(t.error_message,"Something went wrong",3e3,null,null,"")}}))},children:[(0,b.jsx)("i",{className:"simple-icon-arrow-down-circle mr-2"}),"Download CSV"]})})]}),(0,b.jsxs)("table",{className:"table table-striped animate__animated  animate__zoomIn animate__fadeInDown",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{children:"#"}),(0,b.jsx)("th",{children:"Name"}),(0,b.jsx)("th",{children:"Profile"}),(0,b.jsx)("th",{children:"Email"}),(0,b.jsx)("th",{children:"Phone"}),(0,b.jsx)("th",{children:"Status"}),(0,b.jsx)("th",{children:"Created Date"}),(0,b.jsx)("th",{children:"Action"})]})}),(0,b.jsxs)("tbody",{children:[z.map((function(e,t){return(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{children:t+1}),(0,b.jsx)("td",{children:(0,b.jsxs)(j.rU,{to:{pathname:"/provider-details",state:{post:e}},className:"d-flex",children:[" ",e.name]})}),(0,b.jsx)("td",{children:(0,b.jsx)("img",{onClick:function(){ee(e.profile),W(!0)},alt:e.first_name,src:e.profile,className:"list-thumbnail responsive border-0 card-img-left"})}),(0,b.jsx)("td",{children:e.email}),(0,b.jsx)("td",{children:e.phone}),(0,b.jsx)("td",{children:(0,b.jsx)(S.Z,{data:e,table:"users",statusMessage:{0:"Inactive",1:"Active"},updateKey:"status",onUpdate:function(){return function(e,t){z[t]=e,I((0,r.Z)(z))}(t)},isButton:!0})}),(0,b.jsx)("td",{children:(0,Z.Ny)(e.created)}),(0,b.jsxs)("td",{children:[(0,b.jsx)(j.rU,{to:{pathname:"/provider-details",state:{post:e}},className:"btn btn-primary btn-sm",children:"View"})," ",(0,b.jsx)(j.rU,{to:{pathname:"/edit-provider",state:{post:e}},className:"btn btn-info btn-sm",children:"Edit"})," ",(0,b.jsx)(v.Z,{view:"Provider",classes:"btn-sm",table:"users",data:e.id,ondelete:function(){return function(e){z.splice(e,1),I((0,r.Z)(z))}(t)},children:"Delete"})]})]},t)})),0===z.length&&(0,b.jsx)("tr",{className:"no-record-tr",children:(0,b.jsx)("td",{colSpan:"10",children:(0,b.jsx)("h2",{className:"no-record",children:"No record Found"})})})]})]}),(0,b.jsx)(f.Z,{imagePath:$,showModel:T,onClose:function(e){return W(e)}}),(0,b.jsx)(h.Z,{currentPage:V,totalPage:N.totalPage,onChangePage:function(e){H(e)}})]})}));t.default=w}}]);
//# sourceMappingURL=Providers.391b8f9f.chunk.js.map