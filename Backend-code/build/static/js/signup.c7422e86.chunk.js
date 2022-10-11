"use strict";(self.webpackChunkhonset=self.webpackChunkhonset||[]).push([[830],{4726:function(n,e,r){r.d(e,{ce:function(){return c},cX:function(){return d},CF:function(){return x},M3:function(){return w},cn:function(){return v},Lp:function(){return h},GV:function(){return f},zw:function(){return l},h8:function(){return C},Es:function(){return y},Vp:function(){return A},lQ:function(){return N},hO:function(){return j},VR:function(){return Z},bG:function(){return b},Be:function(){return m},al:function(){return E},Hx:function(){return B},Uk:function(){return g},ck:function(){return k},m7:function(){return O},rC:function(){return p}});var t=r(1413),a=r(4569),s=r(7710),o=r(8024),i=(0,a.create)({baseURL:(0,o.JW)()});i.interceptors.response.use((function(n){return n}),(function(n){throw n&&n.response&&n.response.status&&401===n.response.status&&(window.localStorage.clear(),window.location.replace("".concat(window.location.origin,"/admin/login"))),n})),i.interceptors.request.use((function(n){var e=(0,s.r)(o.pT),r=n;return s.r&&(r.headers.common.Authorization="".concat(e)),r}),(function(n){return Promise.reject(n)}));var u=i,c=function(n){var e=n.email,r=n.password;return u.post("/login",{email:e,password:r})},l=function(){return u.get("/dashboard")},p=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",s=arguments.length>4?arguments[4]:void 0;return u.get("/users",{params:(0,t.Z)({page:n,limit:e,q:r,status:a},s)})},d=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",s=arguments.length>4?arguments[4]:void 0;return u.get("/bookings",{params:(0,t.Z)({page:n,limit:e,q:r,status:a},s)})},m=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",s=arguments.length>4?arguments[4]:void 0;return u.get("/provider",{params:(0,t.Z)({page:n,limit:e,q:r,status:a},s)})},f=function(){return u.get("/app-info")},h=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return u.get("/all-services",{params:{page:n,limit:e,q:r}})},g=function(n){return u.put("/app-info",n)},w=function(n){var e=new FormData;return e.append("name",n.name),e.append("image",n.image),e.append("price",n.price||0),e.append("status",1),u.post("/services",e)},A=function(n){var e=new FormData;return e.append("name",n.name),e.append("image",n.image),e.append("price",n.price||0),e.append("id",n.id),u.put("/services",e)},v=function(n){var e=new FormData;return e.append("name",n.name),e.append("email",n.email),e.append("password",n.password),e.append("profile",n.profile),e.append("phone",n.phone),e.append("userType",0),e.append("status",1),u.post("/users",e)},x=function(n){var e=new FormData;return e.append("name",n.name),e.append("email",n.email),e.append("password",n.password),e.append("profile",n.profile),e.append("phone",n.phone),e.append("userType",1),e.append("status",1),u.post("/provider",e)},b=function(n){return u.get("/user-info/".concat(n))},Z=function(n){return u.get("/provider-info/".concat(n))},j=function(){return u.get("/app-settings")},N=function(n){var e=new FormData;return e.append("id",n.id),e.append("name",n.name),e.append("email",n.email),e.append("password",n.password),e.append("profile",n.profile),e.append("phone",n.phone),u.put("/users",e)},y=function(n){var e=new FormData;return e.append("id",n.id),e.append("name",n.name),e.append("email",n.email),e.append("password",n.password),e.append("profile",n.profile),e.append("phone",n.phone),u.put("/instrcture",e)},k=function(n){var e=new FormData;return e.append("first_name",n.first_name),e.append("last_name",n.last_name),e.append("password",n.password),e.append("email",n.email),e.append("token",n.token),e.append("profile",n.image),e.append("id",n.id),u.post("/admin-profile",e)},B=function(n){return u.put("/update-status",n)},E=function(n){return u.put("/send-push",n)},O=function(n){return u.put("/app-settings",n)},C=function(n){return u.delete("/users",{data:n},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}},8037:function(n,e,r){r.d(e,{E:function(){return d},I:function(){return w}});var t=r(1413),a=r(5987),s=r(2791),o=r(2007),i=r.n(o),u=r(184),c=["url","height","className","width","alt"],l=function(n){var e=n.url,r=n.height,s=void 0===r?"100":r,o=n.className,i=void 0===o?"":o,l=n.width,p=void 0===l?"50":l,d=n.alt,m=void 0===d?"image":d,f=(0,a.Z)(n,c);return(0,u.jsx)("img",(0,t.Z)({src:e,height:s,className:i,width:p,alt:m},f))};l.propType={url:i().string.isRequired,height:i().string,width:i().string,alt:i().string,className:i().string};var p,d=l,m=r(168),f=r(4483).ZP.div(p||(p=(0,m.Z)(["\n\tdisplay: flex;\n\twidth: 100%;\n\tmargin-bottom: 15px;\n\tbackground: #e9e9e9;\n\theight: 50px;\n\tborder: 2px solid;\n\tborder-color: "," !important;\n\tborder-radius: 50px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\t.vl {\n\t\tborder-right: 1.2px solid #ff5900;\n\t\theight: 25px;\n\t}\n\t.icon {\n\t\tpadding: 9px;\n\t\tmargin: 12px 0;\n\t\tcolor: white;\n\t\tmin-width: 45px;\n\t\ttext-align: center;\n\t\theight: 36px;\n\t}\n\t.icon:after {\n\t\theight: 50%;\n\t}\n\t& input {\n\t\twidth: 98%;\n\t\tpadding: 10px;\n\t\toutline: none !important;\n\t\tbackground: #e9e9e9;\n\t\tborder-radius: 50px;\n\t\tborder: none;\n\t\theight: "," !important;\n\t}\n\t& .error {\n\t\tcolor: red;\n\t}\n"])),(function(n){return n.isError?"red":"#e9e9e9"}),(function(n){return n.isError?"47px":"50px"})),h=["type","placeholder","name","onChange","value","onBlur","onFocus","className","error","readOnly","icon"],g=s.forwardRef((function(n,e){var r=n.type,s=n.placeholder,o=n.name,i=n.onChange,c=n.value,l=n.onBlur,p=void 0===l?function(){}:l,m=n.onFocus,g=void 0===m?function(){}:m,w=n.className,A=n.error,v=n.readOnly,x=n.icon,b=(0,a.Z)(n,h);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(f,{isError:A,children:[(0,u.jsx)(d,{url:x,align:"absmiddle",className:"icon",width:"",height:"35px"}),(0,u.jsx)("div",{className:"vl"}),(0,u.jsx)("input",(0,t.Z)((0,t.Z)({readOnly:v,type:r,placeholder:s,name:o,className:"".concat(w," ").concat(A?"error":""),value:c,onBlur:p,onFocus:g,onChange:i},b),{},{ref:e}))]}),A&&(0,u.jsx)("div",{className:"invalid-feedback d-block",children:A})]})}));g.propTypes={type:i().string,placeholder:i().string,name:i().string,variant:i().string,onChange:i().func,selectedValue:i().string,onBlur:i().func,onFocus:i().func,className:i().string,readOnly:i().bool,min:i().any},g.defaultProps={type:"text",placeholder:"text",name:"name",classes:{},onChange:function(){return null},value:"",onBlur:function(){return null},onFocus:function(){return null},className:"",readOnly:!1};var w=(0,s.memo)(g)},2950:function(n,e,r){r.d(e,{fn:function(){return t.Z}});r(1435),r(6020);var t=r(5318)},9988:function(n,e,r){var t=r(5671),a=r(3144),s=r(136),o=r(8347),i=r(2791),u=r(184),c=function(n){(0,s.Z)(r,n);var e=(0,o.Z)(r);function r(){return(0,t.Z)(this,r),e.apply(this,arguments)}return(0,a.Z)(r,[{key:"componentDidMount",value:function(){document.body.classList.add("background")}},{key:"componentWillUnmount",value:function(){document.body.classList.remove("background")}},{key:"render",value:function(){return(0,u.jsxs)(i.Fragment,{children:[(0,u.jsx)("div",{className:"fixed-background"}),(0,u.jsx)("main",{children:(0,u.jsx)("div",{className:"container",children:this.props.children})})]})}}]),r}(i.Component);e.Z=c},3022:function(n,e,r){r.d(e,{K:function(){return l},Al:function(){return i},mw:function(){return u},oH:function(){return p},uo:function(){return c}});var t=r(1413),a=r(885),s=r(4942),o=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,i=function(n,e){var r=e?"":"This field is required";return(0,s.Z)({},n,r)},u=function(n,e,r){switch(!0){case!e:return(0,s.Z)({},n,"This field is required");case r!==e:return(0,s.Z)({},n,"Password and confirm password does not match");default:return(0,s.Z)({},n,"")}},c=function(n,e){switch(!0){case!e:return(0,s.Z)({},n,"This field is required");case e.length<8:return(0,s.Z)({},n,"Password should be minimum 8 characters");case!/[^A-Za-z0-9]/.test(e):return(0,s.Z)({},n,"Password should be One special character");case!/[a-z]/.test(e):return(0,s.Z)({},n,"Password should be One lowercase character");case!/[A-Z]/.test(e):return(0,s.Z)({},n,"Password should be One uppercase character");case e.search(/[0-9]/)<0:return(0,s.Z)({},n,"Password should be One number");default:return(0,s.Z)({},n,"")}},l=function(n,e){return Object.entries(n).reduce((function(n,r){var o=(0,a.Z)(r,1)[0],i=e[o]?"":"This field is required";return(0,t.Z)((0,t.Z)({},n),{},(0,s.Z)({},o,i))}),{})},p=function(n,e){switch(!0){case!e:return(0,s.Z)({},n,"Email field is required");case!o.test(e):return(0,s.Z)({},n,"Invalid email address");default:return(0,s.Z)({},n,"")}}},7028:function(n,e,r){r.r(e),r.d(e,{default:function(){return k}});var t=r(4942),a=r(5861),s=r(1413),o=r(885),i=r(7757),u=r.n(i),c=r(2791),l=r(6153),p=r(2357),d=r(6919),m=r(1815),f=r(2919),h=r(9271),g=r(2950),w=r(8037),A=r(4726),v=r(3116),x=r(9988),b=r(7710),Z=r(3022),j={name:"",email:"",password:"",confirmPassword:""},N=r(184),y=c.memo((function(n){n.props;var e=(0,c.useState)(!1),i=(0,o.Z)(e,2),y=i[0],k=i[1],B=(0,c.useState)((0,b.wt)("LoginUser")),E=(0,o.Z)(B,2),O=E[0],C=E[1],P=(0,c.useState)(j),U=(0,o.Z)(P,2),D=U[0],R=U[1],F=(0,c.useState)(j),H=(0,o.Z)(F,2),M=H[0],z=H[1],I=function(n){var e=n.target.name;z((0,s.Z)((0,s.Z)({},M),{},(0,t.Z)({},e,"")))},X=function(n){var e=n.target,r=e.name,t=e.value,a={};switch(r){case"email":Object.assign(a,(0,Z.oH)(r,t));break;case"password":Object.assign(a,(0,Z.uo)(r,t));break;case"confirmPassword":Object.assign(a,(0,Z.mw)(r,t,D.password));break;default:Object.assign(a,(0,Z.Al)(r,t))}z((0,s.Z)((0,s.Z)({},M),a))},T=function(n){var e=n.target,r=e.name,a=e.value;R((0,s.Z)((0,s.Z)({},D),{},(0,t.Z)({},r,a)))};return O?(0,N.jsx)(h.l_,{to:"/"}):(0,N.jsx)(x.Z,{children:(0,N.jsx)(c.Suspense,{fallback:(0,N.jsx)("div",{className:"loading"}),children:(0,N.jsx)(l.Z,{className:"h-100",children:(0,N.jsx)(v.F,{xxs:"12",md:"10",className:"mx-auto my-auto",children:(0,N.jsxs)(p.Z,{className:"auth-card",children:[(0,N.jsx)("div",{className:"position-relative image-side "}),(0,N.jsxs)("div",{className:"form-side",children:[(0,N.jsx)(f.OL,{to:"/",className:"white login-logo",children:(0,N.jsx)("img",{height:"200px",className:"pb-3",src:"/assets/img/logo.png",alt:"dd"})}),(0,N.jsxs)("form",{onSubmit:function(n){if(n.preventDefault(),function(){var n=(0,Z.K)(j,D);return z((0,s.Z)((0,s.Z)({},M),n)),Object.values(n).some((function(n){return n.length>0}))}())return!1;k(!0);var e=D.email,r=D.password;(0,A.ce)({email:e,password:r}).then(function(){var n=(0,a.Z)(u().mark((function n(e){return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:C(!0),g.fn.success("User Signup successfully","Login Success",3e3,null,null,"");case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(n){if(k(!1),n.response){var e=n.response.data;g.fn.warning(e.error_message,"Error",3e3,null,null,"")}}))},className:"av-tooltip tooltip-label-bottom",children:[(0,N.jsx)(d.Z,{className:"form-group has-float-label",children:(0,N.jsx)(w.I,{placeholder:"Name",name:"name",type:"text",value:D.name,error:M.name,onFocus:I,onBlur:X,onChange:T,icon:r(3947)})}),(0,N.jsx)(d.Z,{className:"form-group has-float-label",children:(0,N.jsx)(w.I,{placeholder:"Email Address",name:"email",type:"email",value:D.email,error:M.email,onFocus:I,onBlur:X,onChange:T,icon:r(1566)})}),(0,N.jsx)(d.Z,{className:"form-group has-float-label",children:(0,N.jsx)(w.I,{placeholder:"Password",type:"password",name:"password",value:D.password,error:M.password,onFocus:I,onBlur:X,onChange:T,icon:r(36)})}),(0,N.jsx)(d.Z,{className:"form-group has-float-label",children:(0,N.jsx)(w.I,{placeholder:"Confirm Password",type:"password",name:"confirmPassword",value:D.confirmPassword,error:M.confirmPassword,onFocus:I,onBlur:X,onChange:T,icon:r(36)})}),(0,N.jsx)("div",{className:"'d-flex align-items-center mt-2",children:(0,N.jsxs)(m.Z,{color:"primary",className:"btn-shadow w-100 btn-login btn-multiple-state mr-2 ".concat(y?"show-spinner":""),size:"lg",children:[(0,N.jsxs)("span",{className:"spinner d-inline-block",children:[(0,N.jsx)("span",{className:"bounce1"}),(0,N.jsx)("span",{className:"bounce2"}),(0,N.jsx)("span",{className:"bounce3"})]}),(0,N.jsx)("span",{className:"label",children:"Signup"})]})})]})]})]})})})})})})),k=y},1566:function(n){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAWCAYAAADXYyzPAAAB/ElEQVRIib3WS6iNURQH8N+593pEBkhJLkUGMvEYETKQGElRyCPkkcctJaLMFCYklKsUBuSRiRKZiAwUeQ+VRwykzLg4517t2/rq637n4Byn8x99a+31rf9ee6219yr1rZJhLZZjSsi9moN2/MQTnMPD5DUjvhakrcBWnE3Eu3EMv7ABLzAIbU3aRBnfsBebQjetA5tDKGEkXhZ+/X+MwMScl20pqtGoIG3iJO5gbBNJUzK/YmFONyERD0VPnP1nLIpCmFdwUT+O4lIUWApqR3jobYtcDk8Jxww8xjjcpz//jWAUbkVeEw6hC+/yxH0hTMInzMb50KWiu4DBdZDPwXMsiTZagYOx1pkZ5Ss320A5qntXyOvwCFMLFEVsiT4dH0U6E9dzVpVqxANxCvPxEdPxNHZfC6fRHWtXMAuva9j+kTjhQZDexhBcxZEBNp1htz3kA1gZ90JN/Msl8SXylRHuw10sxcY4ibnRMotxuOChCjqq6Gphf7TZxejJfF+miNfgfY1/C6iHWBRKaredWIDvuIHjBcu/oF7ihLfYU9DWiWY9BA0Rl+K7UlhtPsoZbz7inhYQZ8H1E38IoRWDQDbvvEnFdQJn4uYZg3txJO2F3xpDinJYDAGpzxO6s9EnPQTpTm4FVuNy1k7rcRPLMDl0zRz2fuBVPL3P4Dclt2ZU5lBHdwAAAABJRU5ErkJggg=="},36:function(n){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAC2klEQVRIicXWX6jfcxgH8Nc5zobONhuK5e9m/rSTkvxLKXFhR5GSC5sLuVhzhcjaIokmRZGUcuOKcoH8uaAQJhqtjQ11SIiR/3/Pdk77HT0776++ft8fO27mqV+f+jzP93k/z/v58/kNzVztv8gIjsMUfsQ05mEJ5uNz7J2Lv5HOTVc24XicgxX4HcMBqrOXQOocxQS24Ats7HiLDHduDpDsL+O7cSlWYhK/4VDsxq5QXZkvxsHRH40q4Lbo7+h43Q/wU7g4rBTogoBtxg7c2rK9H2M4HUfhD5ya0lTQV82F6nvwGq7ATGwK8CEci604AW9hO97EMXgn58P4GkP5/kq8kl75S/q7+i6sSpRTYeRFfIL1sSmAM9JkAlBN9S7Oy929OBnjKUuV4X28hNsNAH4Py9Khv8bwupaz8ZZ+XmwOw54wM5FAN+Sbx3BJ+uKg6M9s1/jtnMszh9/hCdzWCmpFsphOE72Ab7AUlyersbDTyLUp3RosSt03NxnXhx/HsEC/wml9dd+Umi+NzSN9QRUba0P7Z3iuTy8BHRmm9tFzdrKYDiXPd9pt9n5JHH87wOn6ZC/Uz+94mPW7ML0zNZxIhvLbk0D6ZTIjMpOxGiQLczcZ5/1ybhpyH1YB78y47ErTnJWV15aNKcdIMt/ap9+RGo4kkX5GtqX+FfiX9Wua6+mc18TByjiveb4puo9yX/pT4uB7HJG7Xh6OiRbgg7gIJ0b/E57R6uqm/Sui1cnqJBye+q7DDaF7TfSjoX0m9BXo42HnziyT8dj00htPNg/HoGfxgazK5anV4szmqpZ+LFmMZrQ+xQctdl7GhfgFh+BDvIqbG5BBwI3UKjw/Hw+HnXLwOm7sWM+u1AsyitPJsrJ9I0H8Tf4NuORRXBYHezMmResPybSXjbQgZem1Vm3V81lc3/E6B+CS+7Jxag8XQDMqFUAjVeeS2l4/5wGpKbjln5z+P38E8CemCboKaN7wdAAAAABJRU5ErkJggg=="},3947:function(n){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAkCAYAAACe0YppAAADLklEQVRYhb2XW4hOURTHfzNmyIOZaWZcypRpvMgtmgeS27jmGi+khBTlfouEmGLGtfCEYjyIyDUUqcklhqJm3KWUS27D8DAKY/i0xjpZzj7f+c74Pv51ap+9/3v9z9lrnbXWSYtNISoygf7AIKAb0B6IAa+B+8AV4BrQGMVehjMTjDHAchUNw0VgC3A+hNOEdGfGxSbgbIBoTC+LEuAcUOZYaeYb7wdmmPuPwCngEvAGSAMKgMHAOCBbeat0PN+xqAjz8Upgo7k/A6wG7jrMX+gFlAOjzNxiYKfDDBHuDdwyrtgNzHFYwdgHzNQVCbSewEM/M56Pl5q1ymaICmYBVToWVy5xGHGEC9Vfgm/AGocRjh+657uyJgAdoggPNUEin8cNh5EYsu+6stoCQ6IIF5nxZWc1OioNs3MUYXssz53V6LB7Ix11c9bDkBmyFmj4vRl3dFajo8Aw30URfmTGA5zV6OhnmI+jCEtE1ut4OFDsMBJD8vpAZX0ICtIg4aea6NEEUO4wEqPc1AEpMC+jCKMVqUHHI4DtDiM+9phj/gxsDWLGE64GSs29JPtDQBeH+RvdgePAbDMnVeqewwwpEh5OABPNvUT8Ee02nuiDd9KyONVkPMEuYK5jURFWj1sCOb65fGCeXomQp/YDW6F4R50LnNaOwoO/2wiC5UwCTgJZAbxAYXnTA8BIMyetzGigAngA1AKf9LOr1WZvr3I2m31j1ZaTxfw+lgc55vPrCl9ktlK/Zukb1usn2GA4UhbXm/ujwGR7Ii1Ke/whvNZX9BcAO3wPK3W2DnilrW2dqb0eJPi+AsP0XtrhL8DVoDcu1hrqHcs2bWmTgfRbC3W/fNN9vJ7N+rjMiF5IgahgmUmXrYEN3oInXGKCSYJmkWPi79Cotjz/jwf6WuHpxuxBX4VKFreBw8bGNE84X/ssNCAqUijqocIkEjnZ7HTNsV7Rlrx609mWPKpMby09XVdP2EN1xAzVXEibXGP2NAkXmoma5OyH4o5ZLJIk3s5MvJWkoj9jqURMf/I85IlwGzOxTv/wMlJ45GkaWBLEHnJFwFYP6+9/iRwRfqHX/wM8+wky3Z9L2HBFKwAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=signup.c7422e86.chunk.js.map