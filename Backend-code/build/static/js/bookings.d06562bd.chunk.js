"use strict";(self.webpackChunkhonset=self.webpackChunkhonset||[]).push([[837],{4726:function(e,n,t){t.d(n,{ce:function(){return l},cX:function(){return u},CF:function(){return Z},M3:function(){return v},cn:function(){return j},Lp:function(){return f},GV:function(){return h},zw:function(){return d},h8:function(){return O},Es:function(){return C},Vp:function(){return x},lQ:function(){return w},hO:function(){return N},VR:function(){return k},bG:function(){return b},Be:function(){return m},al:function(){return P},Hx:function(){return S},Uk:function(){return g},ck:function(){return y},m7:function(){return I},rC:function(){return p}});var a=t(1413),r=t(4569),i=t(7710),s=t(8024),o=(0,r.create)({baseURL:(0,s.JW)()});o.interceptors.response.use((function(e){return e}),(function(e){throw e&&e.response&&e.response.status&&401===e.response.status&&(window.localStorage.clear(),window.location.replace("".concat(window.location.origin,"/admin/login"))),e})),o.interceptors.request.use((function(e){var n=(0,i.r)(s.pT),t=e;return i.r&&(t.headers.common.Authorization="".concat(n)),t}),(function(e){return Promise.reject(e)}));var c=o,l=function(e){var n=e.email,t=e.password;return c.post("/login",{email:n,password:t})},d=function(){return c.get("/dashboard")},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=arguments.length>4?arguments[4]:void 0;return c.get("/users",{params:(0,a.Z)({page:e,limit:n,q:t,status:r},i)})},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=arguments.length>4?arguments[4]:void 0;return c.get("/bookings",{params:(0,a.Z)({page:e,limit:n,q:t,status:r},i)})},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=arguments.length>4?arguments[4]:void 0;return c.get("/provider",{params:(0,a.Z)({page:e,limit:n,q:t,status:r},i)})},h=function(){return c.get("/app-info")},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return c.get("/all-services",{params:{page:e,limit:n,q:t}})},g=function(e){return c.put("/app-info",e)},v=function(e){var n=new FormData;return n.append("name",e.name),n.append("image",e.image),n.append("price",e.price||0),n.append("status",1),c.post("/services",n)},x=function(e){var n=new FormData;return n.append("name",e.name),n.append("image",e.image),n.append("price",e.price||0),n.append("id",e.id),c.put("/services",n)},j=function(e){var n=new FormData;return n.append("name",e.name),n.append("email",e.email),n.append("password",e.password),n.append("profile",e.profile),n.append("phone",e.phone),n.append("userType",0),n.append("status",1),c.post("/users",n)},Z=function(e){var n=new FormData;return n.append("name",e.name),n.append("email",e.email),n.append("password",e.password),n.append("profile",e.profile),n.append("phone",e.phone),n.append("userType",1),n.append("status",1),c.post("/provider",n)},b=function(e){return c.get("/user-info/".concat(e))},k=function(e){return c.get("/provider-info/".concat(e))},N=function(){return c.get("/app-settings")},w=function(e){var n=new FormData;return n.append("id",e.id),n.append("name",e.name),n.append("email",e.email),n.append("password",e.password),n.append("profile",e.profile),n.append("phone",e.phone),c.put("/users",n)},C=function(e){var n=new FormData;return n.append("id",e.id),n.append("name",e.name),n.append("email",e.email),n.append("password",e.password),n.append("profile",e.profile),n.append("phone",e.phone),c.put("/instrcture",n)},y=function(e){var n=new FormData;return n.append("first_name",e.first_name),n.append("last_name",e.last_name),n.append("password",e.password),n.append("email",e.email),n.append("token",e.token),n.append("profile",e.image),n.append("id",e.id),c.post("/admin-profile",n)},S=function(e){return c.put("/update-status",e)},P=function(e){return c.put("/send-push",e)},I=function(e){return c.put("/app-settings",e)},O=function(e){return c.delete("/users",{data:e},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}},3794:function(e,n,t){t(2791);var a=t(2298),r=t(4292),i=t(5234),s=t(8971),o=t(184);n.Z=function(e){var n=e.showModel,t=e.onClose,c=e.imagePath,l=e.name;return(0,o.jsxs)(a.Z,{isOpen:n,size:"lg",toggle:function(){return t(!1)},children:[(0,o.jsx)(r.Z,{toggle:function(){return t(!1)},children:l||"Image Preview"}),(0,o.jsx)(i.Z,{children:(0,o.jsx)(s.Z,{top:!0,alt:c,src:c})})]})}},2950:function(e,n,t){t.d(n,{fn:function(){return a.Z}});t(1435),t(6020);var a=t(5318)},8556:function(e,n,t){var a=t(5671),r=t(3144),i=t(136),s=t(8347),o=t(2791),c=t(6153),l=t(1815),d=t(7496),p=t(5484),u=t(387),m=t(9508),h=t(6522),f=t(2776),g=t(3116),v=t(7799),x=(t(9045),t(184)),j=function(e){(0,i.Z)(t,e);var n=(0,s.Z)(t);function t(e){var r;return(0,a.Z)(this,t),(r=n.call(this)).toggleDisplayOptions=function(){r.setState((function(e){return{displayOptionsIsOpen:!e.displayOptionsIsOpen}}))},r.toggleSplit=function(){r.setState((function(e){return{dropdownSplitOpen:!e.dropdownSplitOpen}}))},r.state={dropdownSplitOpen:!1,displayOptionsIsOpen:!1},r}return(0,r.Z)(t,[{key:"render",value:function(){var e=this.props.intl.messages,n=this.props,t=(n.displayMode,n.changeDisplayMode,n.onClick),a=void 0===t?function(){return null}:t,r=n.changePageSize,i=n.selectedPageSize,s=n.totalItemCount,o=n.startIndex,f=n.endIndex,j=n.addShow,Z=n.Addname,b=n.onSearchKey,k=n.pageSizes,N=n.heading,w=this.state.displayOptionsIsOpen;return(0,x.jsx)(c.Z,{children:(0,x.jsxs)(g.F,{xxs:"12",children:[(0,x.jsxs)("div",{className:"mb-2",children:[(0,x.jsx)("h1",{children:(0,x.jsx)(v.Z,{id:N})}),(0,x.jsxs)("div",{className:"text-zero top-right-button-container",children:[j&&(0,x.jsx)(l.Z,{color:"primary",size:"lg",className:"top-right-button",onClick:a,children:(0,x.jsx)(v.Z,{id:Z})}),"  "]})]}),(0,x.jsxs)("div",{className:"mb-2",children:[(0,x.jsxs)(l.Z,{color:"empty",className:"pt-0 pl-0 d-inline-block d-md-none",onClick:this.toggleDisplayOptions,children:[(0,x.jsx)(v.Z,{id:"pages.display-options"})," ",(0,x.jsx)("i",{className:"simple-icon-arrow-down align-middle"})]}),(0,x.jsxs)(d.Z,{isOpen:w,className:"d-md-block",id:"displayOptions",children:[(0,x.jsxs)("div",{className:"d-block d-md-inline-block pt-1",children:[(0,x.jsx)(p.Z,{className:"mr-1 float-md-left btn-group mb-1"}),(0,x.jsx)("div",{className:"search-sm d-inline-block float-md-left mr-1 mb-1 align-top",children:(0,x.jsx)("input",{type:"text",name:"keyword",id:"search",placeholder:e["menu.search"],onChange:function(e){return b(e)}})})]}),(0,x.jsxs)("div",{className:"float-md-right pt-1",children:[(0,x.jsx)("span",{className:"text-muted text-small mr-1",children:"".concat(o,"-").concat(f," of ").concat(s," ")}),(0,x.jsxs)(p.Z,{className:"d-inline-block",children:[(0,x.jsx)(u.Z,{caret:!0,color:"outline-dark",size:"xs",children:i}),(0,x.jsx)(m.Z,{right:!0,children:k.map((function(e,n){return(0,x.jsx)(h.Z,{onClick:function(){return r(e)},children:e},n)}))})]})]})]})]}),(0,x.jsx)(g.Z,{className:"mb-5"})]})})}}]),t}(o.Component);n.Z=(0,f.XN)((0,o.memo)(j))},1034:function(e,n,t){t.d(n,{Z:function(){return y}});var a=t(5671),r=t(3144),i=t(136),s=t(8347),o=t(2791),c=t(3116),l=t(7462),d=t(3366),p=t(7326),u=t(4578),m=t(2007),h=t.n(m),f=t(1694),g=t.n(f),v=t(5489),x=["className","cssModule","active","tag","innerRef"],j={tag:v.iC,innerRef:h().oneOfType([h().object,h().func,h().string]),disabled:h().bool,active:h().bool,className:h().string,cssModule:h().object,onClick:h().func,href:h().any},Z=function(e){function n(n){var t;return(t=e.call(this,n)||this).onClick=t.onClick.bind((0,p.Z)(t)),t}(0,u.Z)(n,e);var t=n.prototype;return t.onClick=function(e){this.props.disabled?e.preventDefault():("#"===this.props.href&&e.preventDefault(),this.props.onClick&&this.props.onClick(e))},t.render=function(){var e=this.props,n=e.className,t=e.cssModule,a=e.active,r=e.tag,i=e.innerRef,s=(0,d.Z)(e,x),c=(0,v.mx)(g()(n,"nav-link",{disabled:s.disabled,active:a}),t);return o.createElement(r,(0,l.Z)({},s,{ref:i,onClick:this.onClick,className:c}))},n}(o.Component);Z.propTypes=j,Z.defaultProps={tag:"a"};var b=Z,k=t(7976),N=t(5146),w=t(184),C=function(e){(0,i.Z)(t,e);var n=(0,s.Z)(t);function t(){return(0,a.Z)(this,t),n.apply(this,arguments)}return(0,r.Z)(t,[{key:"componentDidMount",value:function(){}},{key:"onChangePage",value:function(e){this.props.onChangePage(e)}},{key:"render",value:function(){var e=this,n=this.props,t=n.totalPage,a=void 0===t?0:t,r=n.currentPage,i=void 0===r?1:r,s=n.numberLimit,o=void 0===s?5:s,l=n.lastIsActive,d=void 0===l||l,p=n.firstIsActive,u=void 0===p||p,m=1,h=o;o>a?(m=1,h=a):i<=parseInt(o/2,10)?(m=1,h=o):i+parseInt(o/2,10)<=a?(m=i-parseInt(o/2,10),h=i+parseInt(o/2,10)):(m=a-(o-1),h=a);for(var f=[],g=m=0===m?1:m;g<=h;g++)f.push(g);var v=i<=1?"disabled":"",x=i>=a?"disabled":"",j=i<=1?"disabled":"",Z=i>=a?"disabled":"";return a>1?(0,w.jsx)(c.F,{xxs:"12",className:"mt-3",children:(0,w.jsxs)(k.Z,{className:"pagination justify-content-center",children:[u&&(0,w.jsx)(N.Z,{className:"page-item ".concat(v),children:(0,w.jsx)(b,{className:"page-link first",onClick:function(){return e.onChangePage(1)},children:(0,w.jsx)("i",{className:"simple-icon-control-start"})})}),(0,w.jsx)(N.Z,{className:"page-item ".concat(j),children:(0,w.jsx)(b,{className:"page-link prev",onClick:function(){return e.onChangePage(i-1)},children:(0,w.jsx)("i",{className:"simple-icon-arrow-left"})})}),f.map((function(n){return(0,w.jsx)(N.Z,{className:"page-item ".concat(i===n&&"active"),children:(0,w.jsx)(b,{className:"page-link",onClick:function(){return e.onChangePage(n)},children:n})},n)})),(0,w.jsx)(N.Z,{className:"page-item ".concat(Z),children:(0,w.jsx)(b,{className:"page-link next",onClick:function(){return e.onChangePage(i+1)},children:(0,w.jsx)("i",{className:"simple-icon-arrow-right"})})}),d&&(0,w.jsx)(N.Z,{className:"page-item ".concat(x),children:(0,w.jsx)(b,{className:"page-link last",onClick:function(){return e.onChangePage(a)},children:(0,w.jsx)("i",{className:"simple-icon-control-end"})})})]})}):(0,w.jsx)(c.F,{xxs:"12",className:"mt-2"})}}]),t}(o.Component),y=C},868:function(e,n,t){t.r(n),t.d(n,{default:function(){return Z}});var a=t(4942),r=(t(2982),t(1413)),i=t(885),s=t(2791),o=t(6153),c=t(7988),l=t(3002),d=t(8556),p=t(1034),u=t(3794),m=t(4726),h=t(2950),f=t(8024),g={currentPage:1,totalItemCount:0,totalPage:1,search:"",pageSizes:[10,20,50,100]},v={1:"Cash",2:"Stripe",3:"Other"},x={0:"In process",1:"Accepted",2:"Cancel",3:"Complete"},j=t(184),Z=s.memo((function(e){var n=(0,s.useState)(g),t=(0,i.Z)(n,2),Z=t[0],b=t[1],k=(0,s.useState)([]),N=(0,i.Z)(k,2),w=N[0],C=N[1],y=(0,s.useState)(!0),S=(0,i.Z)(y,2),P=S[0],I=S[1],O=(0,s.useState)(10),D=(0,i.Z)(O,2),z=D[0],F=D[1],T=(0,s.useState)(1),_=(0,i.Z)(T,2),M=_[0],A=_[1],B=(0,s.useState)(void 0),E=(0,i.Z)(B,2),R=E[0],q=E[1],L=(0,s.useState)(!1),U=(0,i.Z)(L,2),V=U[0],X=U[1],G=(0,s.useState)(""),J=(0,i.Z)(G,1)[0],K=(0,s.useState)([]),H=(0,i.Z)(K,2),Q=H[0],W=H[1],Y=(0,s.useState)({serviceId:"",dateRange:0,statusBooking:""}),$=(0,i.Z)(Y,2),ee=$[0],ne=$[1];(0,s.useEffect)((function(){(0,m.Lp)().then((function(e){var n=e.data;W(n.data.result)})).catch()}),[]),(0,s.useEffect)((function(){var n,t;(0,m.cX)(M,z,R,(null===(n=e.match)||void 0===n||null===(t=n.params)||void 0===t?void 0:t.status)||"",ee).then((function(e){var n=e.data.data,t=n.result,a=n.pagination;I(!1),C(t),g.totalItemCount=a.totalRecord,g.selectedPageSize=a.limit,g.totalPage=a.totalPage,b((0,r.Z)({},g))})).catch((function(e){if(I(!1),e.response){var n=e.response.data;h.fn.warning(n.error_message,"Something went wrong",3e3,null,null,"")}}))}),[z,M,R,ee]);var te=function(e){var n=e.target,t=n.name,i=n.value;ne((0,r.Z)((0,r.Z)({},ee),{},(0,a.Z)({},t,i)))},ae=(M-1)*z,re=M*z;return P?(0,j.jsx)("div",{className:"loading"}):(0,j.jsxs)(s.Fragment,{children:[(0,j.jsx)(d.Z,{match:e.match,heading:"Bookings",changePageSize:function(e){I(!0),F(e)},selectedPageSize:z,totalItemCount:Z.totalItemCount,startIndex:ae,endIndex:re,onSearchKey:function(e){q(e.target.value)},orderOptions:Z.orderOptions,pageSizes:Z.pageSizes}),(0,j.jsxs)(o.Z,{className:"mb-4",children:[(0,j.jsx)(c.Z,{md:"2"}),(0,j.jsxs)(c.Z,{md:"4",children:[(0,j.jsx)(l.Z,{children:"Service Name"}),(0,j.jsxs)("select",{onChange:te,name:"serviceId",className:"form-control",children:[(0,j.jsx)("option",{value:"",children:"--Select Service--"}),Q.map((function(e){var n=e.name,t=e.id;return(0,j.jsx)("option",{value:t,children:n},t)}))]})]}),(0,j.jsxs)(c.Z,{md:"4",children:[(0,j.jsx)(l.Z,{children:"Booking Status"}),(0,j.jsxs)("select",{onChange:te,name:"statusBooking",className:"form-control",children:[(0,j.jsx)("option",{value:"",children:"--Select Booking Status"}),Object.keys(x).map((function(e){return(0,j.jsx)("option",{value:e,children:x[e]},e)}))]})]}),(0,j.jsx)(c.Z,{md:"2"})]}),(0,j.jsxs)("table",{className:"table table-striped animate__animated  animate__zoomIn animate__fadeInDown",children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{children:"#"}),(0,j.jsx)("th",{children:"User Name"}),(0,j.jsx)("th",{children:"Provider Name"}),(0,j.jsx)("th",{children:"Service Name"}),(0,j.jsx)("th",{children:"Total Price"}),(0,j.jsx)("th",{children:"Payment Type"}),(0,j.jsx)("th",{children:"Booking Status"}),(0,j.jsx)("th",{children:"Start/End Time"}),(0,j.jsx)("th",{children:"Booking Date"})]})}),(0,j.jsxs)("tbody",{children:[w.map((function(e,n){var t;return(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{children:n+1}),(0,j.jsx)("td",{children:e.userName}),(0,j.jsx)("td",{children:e.providerName}),(0,j.jsx)("td",{children:null===(t=JSON.parse(e.serviceDetails))||void 0===t?void 0:t.name}),(0,j.jsx)("td",{children:e.totalPrice}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:"badge badge-pill badge-success",children:v[e.paymentType]})}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:"badge badge-pill badge-primary",children:x[e.status]})}),(0,j.jsxs)("td",{children:[(0,f.jF)(e.bookingStartTime)," /"," ",(0,f.jF)(e.bookingEndTime)]}),(0,j.jsx)("td",{children:(0,f.Ny)(e.bookingDate)})]},e.id)})),0===w.length&&(0,j.jsx)("tr",{className:"",children:(0,j.jsx)("td",{colSpan:"9",children:(0,j.jsx)("h2",{className:"bg-red",children:"No record Found"})})})]})]}),(0,j.jsx)(u.Z,{imagePath:J,showModel:V,onClose:function(e){return X(e)}}),(0,j.jsx)(p.Z,{currentPage:M,totalPage:Z.totalPage,onChangePage:function(e){A(e)}})]})}))},2982:function(e,n,t){t.d(n,{Z:function(){return i}});var a=t(907);var r=t(181);function i(e){return function(e){if(Array.isArray(e))return(0,a.Z)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||(0,r.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=bookings.d06562bd.chunk.js.map