"use strict";(self.webpackChunkhonset=self.webpackChunkhonset||[]).push([[152],{4726:function(e,n,t){t.d(n,{ce:function(){return c},cX:function(){return l},CF:function(){return b},M3:function(){return v},cn:function(){return x},Lp:function(){return m},GV:function(){return f},zw:function(){return p},h8:function(){return C},Es:function(){return y},Vp:function(){return j},lQ:function(){return k},hO:function(){return N},VR:function(){return Z},bG:function(){return w},Be:function(){return h},al:function(){return S},Hx:function(){return D},Uk:function(){return g},ck:function(){return P},m7:function(){return F},rC:function(){return u}});var r=t(1413),a=t(4569),s=t(7710),i=t(8024),o=(0,a.create)({baseURL:(0,i.JW)()});o.interceptors.response.use((function(e){return e}),(function(e){throw e&&e.response&&e.response.status&&401===e.response.status&&(window.localStorage.clear(),window.location.replace("".concat(window.location.origin,"/admin/login"))),e})),o.interceptors.request.use((function(e){var n=(0,s.r)(i.pT),t=e;return s.r&&(t.headers.common.Authorization="".concat(n)),t}),(function(e){return Promise.reject(e)}));var d=o,c=function(e){var n=e.email,t=e.password;return d.post("/login",{email:n,password:t})},p=function(){return d.get("/dashboard")},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",s=arguments.length>4?arguments[4]:void 0;return d.get("/users",{params:(0,r.Z)({page:e,limit:n,q:t,status:a},s)})},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",s=arguments.length>4?arguments[4]:void 0;return d.get("/bookings",{params:(0,r.Z)({page:e,limit:n,q:t,status:a},s)})},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",s=arguments.length>4?arguments[4]:void 0;return d.get("/provider",{params:(0,r.Z)({page:e,limit:n,q:t,status:a},s)})},f=function(){return d.get("/app-info")},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return d.get("/all-services",{params:{page:e,limit:n,q:t}})},g=function(e){return d.put("/app-info",e)},v=function(e){var n=new FormData;return n.append("name",e.name),n.append("image",e.image),n.append("price",e.price||0),n.append("status",1),d.post("/services",n)},j=function(e){var n=new FormData;return n.append("name",e.name),n.append("image",e.image),n.append("price",e.price||0),n.append("id",e.id),d.put("/services",n)},x=function(e){var n=new FormData;return n.append("name",e.name),n.append("email",e.email),n.append("password",e.password),n.append("profile",e.profile),n.append("phone",e.phone),n.append("userType",0),n.append("status",1),d.post("/users",n)},b=function(e){var n=new FormData;return n.append("name",e.name),n.append("email",e.email),n.append("password",e.password),n.append("profile",e.profile),n.append("phone",e.phone),n.append("userType",1),n.append("status",1),d.post("/provider",n)},w=function(e){return d.get("/user-info/".concat(e))},Z=function(e){return d.get("/provider-info/".concat(e))},N=function(){return d.get("/app-settings")},k=function(e){var n=new FormData;return n.append("id",e.id),n.append("name",e.name),n.append("email",e.email),n.append("password",e.password),n.append("profile",e.profile),n.append("phone",e.phone),d.put("/users",n)},y=function(e){var n=new FormData;return n.append("id",e.id),n.append("name",e.name),n.append("email",e.email),n.append("password",e.password),n.append("profile",e.profile),n.append("phone",e.phone),d.put("/instrcture",n)},P=function(e){var n=new FormData;return n.append("first_name",e.first_name),n.append("last_name",e.last_name),n.append("password",e.password),n.append("email",e.email),n.append("token",e.token),n.append("profile",e.image),n.append("id",e.id),d.post("/admin-profile",n)},D=function(e){return d.put("/update-status",e)},S=function(e){return d.put("/send-push",e)},F=function(e){return d.put("/app-settings",e)},C=function(e){return d.delete("/users",{data:e},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}},3964:function(e,n,t){t(2791);var r=t(6343),a=t.n(r),s=t(184);n.Z=function(e){var n=e.loading;return(0,s.jsx)("div",{className:"loading-react",children:(0,s.jsx)(a(),{visible:n,type:"Puff",color:"#ff5900",height:100,width:100})})}},3794:function(e,n,t){t(2791);var r=t(2298),a=t(4292),s=t(5234),i=t(8971),o=t(184);n.Z=function(e){var n=e.showModel,t=e.onClose,d=e.imagePath,c=e.name;return(0,o.jsxs)(r.Z,{isOpen:n,size:"lg",toggle:function(){return t(!1)},children:[(0,o.jsx)(a.Z,{toggle:function(){return t(!1)},children:c||"Image Preview"}),(0,o.jsx)(s.Z,{children:(0,o.jsx)(i.Z,{top:!0,alt:d,src:d})})]})}},9959:function(e,n,t){var r=t(4942),a=(t(2791),t(4726)),s=t(184),i=function(e){var n,t=e.table,i=e.data,o=e.onUpdate,d=e.updateKey,c=void 0===d?"status":d,p=e.statusMessage,u=e.isButton,l=void 0!==u&&u,h=e.isUpdate,f=void 0!==h&&h;return(0,s.jsx)("span",{style:{cursor:f?"none":"pointer",pointerEvents:f?"none":"click"},onClick:function(){var e;parseInt(i[c])>=1?i[c]=0:i[c]=1,(0,a.Hx)((e={table:t},(0,r.Z)(e,c,i[c]),(0,r.Z)(e,"id",i.id),e)).then((function(e){o(i)})).catch((function(e){}))},className:(n=i[c],l?n>=1?"btn btn-sm btn-success":"btn btn-sm btn-danger":n>=1?"badge badge-pill badge-success":"badge badge-pill badge-danger"),children:function(e){return parseInt(e)>=4?p[3]:p[e]}(i[c])})};i.defaultProps={type:"button",disabled:null,classes:"badge badge-success",statusMessage:{1:"Active",0:"Deactive"}},n.Z=i},2950:function(e,n,t){t.d(n,{fn:function(){return r.Z}});t(1435),t(6020);var r=t(5318)},7971:function(e,n,t){t.r(n);var r=t(1413),a=t(885),s=t(2791),i=t(2357),o=t(3638),d=t(8284),c=t(2950),p=t(9959),u=t(3964),l=t(3794),h=t(8024),f=t(4726),m=t(184);n.default=function(e){var n=(0,s.useState)((0,r.Z)({},e.location.state.post)),t=(0,a.Z)(n,2),g=t[0],v=t[1],j=(0,s.useState)([]),x=(0,a.Z)(j,2),b=x[0],w=x[1],Z=(0,s.useState)(!1),N=(0,a.Z)(Z,2),k=N[0],y=N[1],P=(0,s.useState)(""),D=(0,a.Z)(P,2),S=D[0],F=D[1],C=(0,s.useState)(!1),M=(0,a.Z)(C,2),T=M[0],E=M[1];return console.log(g),(0,s.useEffect)((function(){g.id&&(E(!0),(0,f.bG)(g.id).then((function(e){var n=e.data.data.allBooking;w(n),E(!1)})).catch((function(e){if(E(!1),e.response){var n=e.response.data;c.fn.warning(n.error_message,"Something went wrong",3e3,null,null,"")}})))}),[g.id]),(0,m.jsxs)(s.Fragment,{children:[(0,m.jsx)(i.Z,{children:(0,m.jsx)(o.Z,{children:(0,m.jsx)("h1",{style:{paddingTop:"31px"},children:" User Details "})})}),(0,m.jsx)(u.Z,{loading:T}),(0,m.jsxs)(d.Z,{children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:" Name "})," : ",g.name]}),(0,m.jsx)("hr",{}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:" Email "})," : ",g.email]}),(0,m.jsx)("hr",{}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:" Phone "})," : ",g.phone]}),(0,m.jsx)("hr",{}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:" DOB "})," : ",(0,h.Ny)(g.dob)]}),(0,m.jsx)("hr",{}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:" Address "})," : ",g.address]}),(0,m.jsx)("hr",{}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:" Profile "})," :"," ",(0,m.jsx)("img",{onClick:function(){F(g.profile),y(!0)},alt:g.first_name,src:g.profile,className:"list-thumbnail responsive border-0 card-img-left"})]}),(0,m.jsx)("hr",{}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:" Status "})," : - \xa0",(0,m.jsx)(p.Z,{table:"users",onUpdate:function(e){return v((0,r.Z)((0,r.Z)({},g),e))},data:g,updateKey:"status",isButton:!0})]})]}),(0,m.jsx)("hr",{className:"pb-5"}),(0,m.jsx)(i.Z,{children:(0,m.jsxs)(o.Z,{children:[" ",(0,m.jsx)("h3",{className:"mt-3",children:"User Bookings"})]})}),(0,m.jsxs)("table",{className:"table table-striped",children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{children:"#"}),(0,m.jsx)("th",{children:"Provider Name"}),(0,m.jsx)("th",{children:"Provider Email"}),(0,m.jsx)("th",{children:"Service Name"}),(0,m.jsx)("th",{children:"Price"}),(0,m.jsx)("th",{children:"Start/End Time"}),(0,m.jsx)("th",{children:"Booking Date"})]})}),(0,m.jsxs)("tbody",{children:[b.map((function(e,n){var t;return(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:n+1}),(0,m.jsx)("td",{children:e.providerName}),(0,m.jsx)("td",{children:e.providerEmail}),(0,m.jsx)("td",{children:null===(t=JSON.parse(e.serviceDetails))||void 0===t?void 0:t.name}),(0,m.jsx)("td",{children:e.totalPrice}),(0,m.jsxs)("td",{children:[(0,h.jF)(e.bookingStartTime)," /"," ",(0,h.jF)(e.bookingEndTime)]}),(0,m.jsx)("td",{children:(0,h.Ny)(e.bookingDate)})]},e.id)})),0===b.length&&(0,m.jsx)("tr",{className:"",children:(0,m.jsx)("td",{colSpan:"8",children:(0,m.jsx)("h2",{className:"bg-red",children:"No record Found"})})})]})]}),(0,m.jsx)("hr",{className:"pb-5"}),(0,m.jsx)(l.Z,{imagePath:S,showModel:k,onClose:function(e){return y(e)}})]})}},8284:function(e,n,t){var r=t(7462),a=t(3366),s=t(2791),i=t(2007),o=t.n(i),d=t(1694),c=t.n(d),p=t(5489),u=["className","cssModule","innerRef","tag"],l={tag:p.iC,className:o().string,cssModule:o().object,innerRef:o().oneOfType([o().object,o().string,o().func])},h=function(e){var n=e.className,t=e.cssModule,i=e.innerRef,o=e.tag,d=(0,a.Z)(e,u),l=(0,p.mx)(c()(n,"card-body"),t);return s.createElement(o,(0,r.Z)({},d,{className:l,ref:i}))};h.propTypes=l,h.defaultProps={tag:"div"},n.Z=h},3638:function(e,n,t){var r=t(7462),a=t(3366),s=t(2791),i=t(2007),o=t.n(i),d=t(1694),c=t.n(d),p=t(5489),u=["className","cssModule","tag"],l={tag:p.iC,className:o().string,cssModule:o().object},h=function(e){var n=e.className,t=e.cssModule,i=e.tag,o=(0,a.Z)(e,u),d=(0,p.mx)(c()(n,"card-header"),t);return s.createElement(i,(0,r.Z)({},o,{className:d}))};h.propTypes=l,h.defaultProps={tag:"div"},n.Z=h}}]);
//# sourceMappingURL=user Details.cc4c5ae8.chunk.js.map