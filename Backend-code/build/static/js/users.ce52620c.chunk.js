"use strict";(self.webpackChunkhonset=self.webpackChunkhonset||[]).push([[681],{120:function(e,t,n){n.r(t);var a=n(2982),s=n(4942),r=n(1413),i=n(885),l=n(2791),o=n(6153),c=n(7988),d=n(3002),u=n(8556),h=n(8472),m=n(1034),x=n(3794),j=n(9959),f=n(4726),g=n(2950),p=n(2919),v=n(3964),Z=n(5084),S=n(8024),b=n(184),C={currentPage:1,totalItemCount:0,totalPage:1,search:"",pageSizes:[10,20,50,100]},N=["1-10","10-20","20-30","30-40","40-50","50-60","60-100"],w=l.memo((function(e){var t=(0,l.useRef)(null),n=(0,l.useState)(C),w=(0,i.Z)(n,2),P=w[0],k=w[1],y=(0,l.useState)([]),I=(0,i.Z)(y,2),U=I[0],_=I[1],z=(0,l.useState)(!0),A=(0,i.Z)(z,2),D=A[0],E=A[1],R=(0,l.useState)(10),V=(0,i.Z)(R,2),F=V[0],K=V[1],M=(0,l.useState)(1),O=(0,i.Z)(M,2),B=O[0],L=O[1],q=(0,l.useState)(void 0),G=(0,i.Z)(q,2),H=G[0],J=G[1],Q=(0,l.useState)(!1),T=(0,i.Z)(Q,2),W=T[0],X=T[1],Y=(0,l.useState)(""),$=(0,i.Z)(Y,2),ee=$[0],te=$[1],ne=(0,l.useState)({gender:"",country:"",age:""}),ae=(0,i.Z)(ne,2),se=ae[0],re=ae[1],ie=(0,l.useState)([]),le=(0,i.Z)(ie,2),oe=le[0],ce=le[1],de=(0,l.useState)(!1),ue=(0,i.Z)(de,2),he=ue[0],me=ue[1];(0,l.useEffect)((function(){var t,n;(0,f.rC)(B,F,H,(null===(t=e.match)||void 0===t||null===(n=t.params)||void 0===n?void 0:n.status)||"",se).then((function(e){var t=e.data.data,n=t.result,a=t.pagination;E(!1),_(n),C.totalItemCount=a.totalRecord,C.selectedPageSize=a.limit,C.totalPage=a.totalPage,k((0,r.Z)({},C))})).catch((function(e){if(E(!1),e.response){var t=e.response.data;g.fn.warning(t.error_message,"Something went wrong",3e3,null,null,"")}}))}),[F,B,H,se]);var xe=(B-1)*F,je=B*F;return D?(0,b.jsx)("div",{className:"loading"}):(0,b.jsxs)(l.Fragment,{children:[(0,b.jsx)(h.CSVLink,{data:oe,filename:"users-record.csv",style:{display:"none"},ref:t,children:"Download"}),(0,b.jsx)(u.Z,{onClick:function(){return e.history.push("/add-user")},addShow:!0,Addname:"+ Add New User",match:e.match,heading:"Users",changePageSize:function(e){E(!0),K(e)},selectedPageSize:F,totalItemCount:P.totalItemCount,startIndex:xe,endIndex:je,onSearchKey:function(e){J(e.target.value)},orderOptions:P.orderOptions,pageSizes:P.pageSizes}),(0,b.jsx)(v.Z,{loading:he}),(0,b.jsxs)(o.Z,{className:"mb-4",children:[(0,b.jsxs)(c.Z,{md:"3",children:[(0,b.jsx)(d.Z,{children:"Age Range"}),(0,b.jsxs)("select",{onChange:function(e){var t=e.target,n=t.name,a=t.value;re((0,r.Z)((0,r.Z)({},se),{},(0,s.Z)({},n,a)))},name:"age",className:"form-control",children:[(0,b.jsx)("option",{value:"",children:"--Select Age Range"}),N.map((function(e){return(0,b.jsx)("option",{value:e,children:e},e)}))]})]}),(0,b.jsx)(c.Z,{md:"3"}),(0,b.jsx)(c.Z,{md:"3"}),(0,b.jsx)(c.Z,{md:"3",children:(0,b.jsxs)("button",{className:"btn btn-info ml-5 mt-4",onClick:function(){var n,a;me(!0),(0,f.rC)(1,1e3,"",(null===(n=e.match)||void 0===n||null===(a=n.params)||void 0===a?void 0:a.status)||"",se).then((function(e){var n=e.data.data.result;me(!1);var a=n.map((function(e){return{"User Name":e.name,"User Email":e.email,"User Phone":e.phone,"User status":{0:"Inactive",1:"Active"}[e.status],"Profile Created":(0,S.Ny)(e.created)}}));ce(a),t.current.link.click()})).catch((function(e){if(me(!1),e.response){var t=e.response.data;g.fn.warning(t.error_message,"Something went wrong",3e3,null,null,"")}}))},children:[(0,b.jsx)("i",{className:"simple-icon-arrow-down-circle mr-2"}),"Download CSV"]})})]}),(0,b.jsxs)("table",{className:"table table-striped animate__animated  animate__zoomIn animate__fadeInDown mb-5",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{children:"#"}),(0,b.jsx)("th",{children:"Name"}),(0,b.jsx)("th",{children:"Profile"}),(0,b.jsx)("th",{children:"Email"}),(0,b.jsx)("th",{children:"Phone"}),(0,b.jsx)("th",{children:"Status"}),(0,b.jsx)("th",{children:"Created Date"}),(0,b.jsx)("th",{children:"Action"})]})}),(0,b.jsxs)("tbody",{children:[U.map((function(e,t){return(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{children:t+1}),(0,b.jsx)("td",{children:(0,b.jsxs)(p.rU,{to:{pathname:"/user-details",state:{post:e}},className:"d-flex",children:[" ",e.name]})}),(0,b.jsx)("td",{children:(0,b.jsx)("img",{onClick:function(){te(e.profile),X(!0)},alt:e.first_name,src:e.profile,className:"list-thumbnail responsive border-0 card-img-left"})}),(0,b.jsx)("td",{children:e.email}),(0,b.jsx)("td",{children:e.phone}),(0,b.jsx)("td",{children:(0,b.jsx)(j.Z,{data:e,table:"users",statusMessage:{0:"Inactive",1:"Active"},updateKey:"status",onUpdate:function(){return function(e,t){U[t]=e,_((0,a.Z)(U))}(t)},isButton:!0})}),(0,b.jsx)("td",{children:(0,S.Ny)(e.created)}),(0,b.jsxs)("td",{children:[(0,b.jsx)(p.rU,{to:{pathname:"/user-details",state:{post:e}},className:"btn btn-primary btn-sm",children:"View"})," ",(0,b.jsx)(p.rU,{to:{pathname:"/edit-user",state:{post:e}},className:"btn btn-info btn-sm",children:"Edit"})," ",(0,b.jsx)(Z.Z,{classes:"btn-sm",table:"users",data:e.id,ondelete:function(){return function(e){U.splice(e,1),_((0,a.Z)(U))}(t)},children:"Delete"})]})]},t)})),0===U.length&&(0,b.jsx)("tr",{className:"no-record-tr",children:(0,b.jsx)("td",{colSpan:"8",children:(0,b.jsx)("h2",{className:"no-record",children:"No record Found"})})})]})]}),(0,b.jsx)(x.Z,{imagePath:ee,showModel:W,onClose:function(e){return X(e)}}),(0,b.jsx)(m.Z,{currentPage:B,totalPage:P.totalPage,onChangePage:function(e){L(e)}})]})}));t.default=w}}]);
//# sourceMappingURL=users.ce52620c.chunk.js.map