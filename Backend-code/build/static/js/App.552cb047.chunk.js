(self.webpackChunkhonset=self.webpackChunkhonset||[]).push([[768],{7456:function(e,a,o){"use strict";o.r(a),o.d(a,{default:function(){return O}});var s=o(5671),t=o(3144),n=o(136),r=o(8347),i=o(2791),d=o(364),l=o(2919),u=o(9271),c=o(2776),m=o(1413),p=o(9111),g=o.n(p),h=o(813),b=o.n(h),f={messages:(0,m.Z)({},b()),locale:"en-US",data:g()},v=o(9537),y=o.n(v),C=o(1440),w=o.n(C),E={en:f,es:{messages:(0,m.Z)({},w()),locale:"es-ES",data:y()},enrtl:{messages:(0,m.Z)({},b()),locale:"en-US",data:g()}};(0,c.oK)(E.en.data),(0,c.oK)(E.es.data),(0,c.oK)(E.enrtl.data);var k=E,P=o(7326),x=o(4164),A=o(8024),R=o(6919),S=o(3002),D=o(586),T=o(184),N=function(e){(0,n.Z)(o,e);var a=(0,r.Z)(o);function o(e){var t;return(0,s.Z)(this,o),(t=a.call(this)).getContainer=function(){return x.findDOMNode((0,P.Z)(t))},t.toggle=function(e){e.preventDefault();var a=t.state.isOpen;a?t.removeEvents():t.addEvents(),t.setState({isOpen:!a})},t.changeThemeColor=function(e,a){e.preventDefault(),localStorage.setItem(A.bk,a),t.toggle(e),setTimeout((function(){window.location.reload()}),500)},t.addEvents=function(){["click","touchstart"].forEach((function(e){return document.addEventListener(e,t.handleDocumentClick,!0)}))},t.removeEvents=function(){["click","touchstart"].forEach((function(e){return document.removeEventListener(e,t.handleDocumentClick,!0)}))},t.handleDocumentClick=function(e){var a=t.getContainer();a.contains(e.target)||a===e.target||t.toggle(e)},t.changeRadius=function(e){"flat"===e?document.body.classList.remove("rounded"):document.body.classList.add("rounded"),t.setState({radius:e}),localStorage.setItem(A.hS,e)},t.state={isOpen:!1,selectedColor:localStorage.getItem(A.bk),radius:localStorage.getItem(A.hS)||"rounded"},t.removeEvents(),t}return(0,t.Z)(o,[{key:"componentDidMount",value:function(){this.changeRadius(this.state.radius)}},{key:"render",value:function(){var e=this,a=this.state,o=a.selectedColor,s=a.radius;return(0,T.jsxs)("div",{className:"theme-colors ".concat(this.state.isOpen?"shown":""),children:[(0,T.jsxs)("div",{className:"p-4",children:[(0,T.jsx)("p",{className:"text-muted mb-2",children:"Light Theme"}),(0,T.jsx)("div",{className:"d-flex flex-row justify-content-between mb-4",children:["purple","blue","green","orange","red"].map((function(a){return(0,T.jsx)("a",{href:"#light.".concat(a),className:"theme-color theme-color-".concat(a," ").concat(o==="light.".concat(a)?"active":""),onClick:function(o){return e.changeThemeColor(o,"light.".concat(a))},children:(0,T.jsxs)("span",{children:["`light.$",a,"`"]})},"light.".concat(a))}))}),(0,T.jsx)("p",{className:"text-muted mb-2",children:"Dark Theme"}),(0,T.jsx)("div",{className:"d-flex flex-row justify-content-between",children:["purple","blue","green","orange","red"].map((function(a){return(0,T.jsx)("a",{href:"#dark.".concat(a),className:"theme-color theme-color-".concat(a," ").concat(o==="dark.".concat(a)?"active":""),onClick:function(o){return e.changeThemeColor(o,"dark.".concat(a))},children:(0,T.jsxs)("span",{children:["`dark.$",a,"`"]})},"dark.".concat(a))}))})]}),(0,T.jsx)("div",{className:" pb-0 pl-4 pt-4",children:(0,T.jsxs)(R.Z,{children:[(0,T.jsx)(S.Z,{for:"radiusRadio",children:"Border Radius "}),(0,T.jsxs)("div",{children:[(0,T.jsx)(D.Z,{type:"radio",name:"radiusRadio",id:"rounded",label:"Rounded",inline:!0,defaultChecked:"rounded"===s,onChange:function(){return e.changeRadius("rounded")}}),(0,T.jsx)(D.Z,{type:"radio",name:"radiusRadio",id:"flat",label:"Flat",inline:!0,defaultChecked:"flat"===s,onChange:function(){return e.changeRadius("flat")}})]})]})}),(0,T.jsxs)("a",{href:"#section",className:"theme-button",onClick:this.toggle,children:[" ",(0,T.jsx)("i",{className:"simple-icon-magic-wand"})," "]})]})}}]),o}(i.Component),j=o(6020),L=o(6931),I=i.lazy((function(){return o.e(391).then(o.bind(o,1044))})),z=i.lazy((function(){return Promise.all([o.e(447),o.e(819)]).then(o.bind(o,2333))})),B=function(e){(0,n.Z)(o,e);var a=(0,r.Z)(o);function o(e){var t;return(0,s.Z)(this,o),t=a.call(this,e),(0,L.Mg)().isRtl?(document.body.classList.add("rtl"),document.body.classList.remove("ltr")):(document.body.classList.add("ltr"),document.body.classList.remove("rtl")),t}return(0,t.Z)(o,[{key:"render",value:function(){var e=this.props.locale,a=k[e];return(0,T.jsx)("div",{className:"h-100",children:(0,T.jsx)(c.Pj,{locale:a.locale,messages:a.messages,children:(0,T.jsxs)(i.Fragment,{children:[(0,T.jsx)(j.Z,{}),A.zt&&(0,T.jsx)(N,{}),(0,T.jsx)(i.Suspense,{fallback:(0,T.jsx)("div",{className:"loading"}),children:(0,T.jsx)(l.VK,{children:(0,T.jsxs)(u.rs,{children:[(0,T.jsx)(u.AW,{path:"/admin",component:I}),(0,T.jsx)(u.AW,{path:"/",component:z})]})})})]})})})}}]),o}(i.Component),O=(0,d.$j)((function(e){var a=e.authUser,o=e.settings;return{loginUser:a.user,locale:o.locale}}),{})(B)},6020:function(e,a,o){"use strict";var s=o(5671),t=o(3144),n=o(136),r=o(8347),i=o(2791),d=o(5318),l=o(1435),u=o(184),c=function(e){(0,n.Z)(o,e);var a=(0,r.Z)(o);function o(e){var t;return(0,s.Z)(this,o),(t=a.call(this,e)).state={notifications:[]},t.componentWillUnmount=function(){d.Z.removeChangeListener(t.handleStoreChange)},t.handleStoreChange=function(e){t.setState({notifications:e})},t.handleRequestHide=function(e){d.Z.remove(e)},d.Z.addChangeListener(t.handleStoreChange),t}return(0,t.Z)(o,[{key:"render",value:function(){var e=this.state.notifications,a=this.props,o=a.enterTimeout,s=a.leaveTimeout;return(0,u.jsx)(l.Z,{enterTimeout:o,leaveTimeout:s,notifications:e,onRequestHide:this.handleRequestHide})}}]),o}(i.Component);c.defaultProps={enterTimeout:400,leaveTimeout:400},a.Z=c},5318:function(e,a,o){"use strict";var s=o(5671),t=o(3144),n=o(136),r=o(8347),i=o(7465),d="change",l="primary",u="secondary",c="info",m="success",p="warning",g="error",h=function(e){(0,n.Z)(o,e);var a=(0,r.Z)(o);function o(){var e;return(0,s.Z)(this,o),(e=a.call(this)).listNotify=[],e}return(0,t.Z)(o,[{key:"create",value:function(e){var a={id:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var a=16*Math.random()|0;return("x"===e?a:3&a|8).toString(16)})),type:"info",title:null,message:null,timeOut:5e3,customClassName:""};e.priority?this.listNotify.unshift(Object.assign(a,e)):this.listNotify.push(Object.assign(a,e)),this.emitChange()}},{key:"primary",value:function(e,a,o,s,t,n){this.create({type:l,message:e,title:a,timeOut:o,onClick:s,priority:t,customClassName:n})}},{key:"secondary",value:function(e,a,o,s,t,n){this.create({type:u,message:e,title:a,timeOut:o,onClick:s,priority:t,customClassName:n})}},{key:"info",value:function(e,a,o,s,t,n){this.create({type:c,message:e,title:a,timeOut:o,onClick:s,priority:t,customClassName:n})}},{key:"success",value:function(e,a,o,s,t,n){this.create({type:m,message:e,title:a,timeOut:o,onClick:s,priority:t,customClassName:n})}},{key:"warning",value:function(e,a,o,s,t,n){this.create({type:p,message:e,title:a,timeOut:o,onClick:s,priority:t,customClassName:n})}},{key:"error",value:function(e,a,o,s,t,n){this.create({type:g,message:e,title:a,timeOut:o,onClick:s,priority:t,customClassName:n})}},{key:"remove",value:function(e){this.listNotify=this.listNotify.filter((function(a){return e.id!==a.id})),this.emitChange()}},{key:"emitChange",value:function(){this.emit(d,this.listNotify)}},{key:"addChangeListener",value:function(e){this.addListener(d,e)}},{key:"removeChangeListener",value:function(e){this.removeListener(d,e)}}]),o}(i.EventEmitter);a.Z=new h},1435:function(e,a,o){"use strict";o.d(a,{Z:function(){return b}});var s=o(5671),t=o(3144),n=o(136),r=o(8347),i=o(2791),d=o(5660),l=o(9295),u=o(1694),c=o.n(u),m=o(184),p=function(e){(0,n.Z)(o,e);var a=(0,r.Z)(o);function o(){var e;(0,s.Z)(this,o);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return(e=a.call.apply(a,[this].concat(n))).componentDidMount=function(){var a=e.props.timeOut;0!==a&&(e.timer=setTimeout(e.requestHide,a))},e.componentWillUnmount=function(){e.timer&&clearTimeout(e.timer)},e.handleClick=function(){var a=e.props.onClick;a&&a(),e.requestHide()},e.requestHide=function(){var a=e.props.onRequestHide;a&&a()},e}return(0,t.Z)(o,[{key:"render",value:function(){var e=this.props,a=e.type,o=e.message,s=this.props.title,t=c()(["notification","notification-".concat(a),this.props.customClassName]);return s=s?(0,m.jsx)("h4",{className:"title",children:s}):null,(0,m.jsx)("div",{className:t,onClick:this.handleClick,children:(0,m.jsxs)("div",{className:"notification-message",role:"alert",children:[s,(0,m.jsx)("div",{className:"message",children:o})]})})}}]),o}(i.Component);p.defaultProps={type:"info",title:null,message:null,timeOut:5e3,onClick:function(){},onRequestHide:function(){},customClassName:""};var g=p,h=function(e){(0,n.Z)(o,e);var a=(0,r.Z)(o);function o(){var e;(0,s.Z)(this,o);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return(e=a.call.apply(a,[this].concat(n))).handleRequestHide=function(a){return function(){var o=e.props.onRequestHide;o&&o(a)}},e}return(0,t.Z)(o,[{key:"render",value:function(){var e=this,a=this.props,o=a.notifications,s=a.enterTimeout,t=a.leaveTimeout,n=c()("notification-container",{"notification-container-empty":0===o.length});return(0,m.jsx)("div",{className:n,children:(0,m.jsx)(d.Z,{children:o.map((function(a){var o=a.id||(new Date).getTime();return(0,m.jsx)(l.Z,{classNames:"notification",timeout:{exit:t,enter:s},children:(0,m.jsx)(g,{type:a.type,title:a.title,message:a.message,timeOut:a.timeOut,onClick:a.onClick,onRequestHide:e.handleRequestHide(a),customClassName:a.customClassName},o)},o)}))})})}}]),o}(i.Component);h.defaultProps={notifications:[],onRequestHide:function(){},enterTimeout:400,leaveTimeout:400};var b=h},6931:function(e,a,o){"use strict";o.d(a,{Mg:function(){return t},mU:function(){return n}});var s=o(8024),t=function(){var e=s.FX;if(localStorage.getItem("direction")){var a=localStorage.getItem("direction");"rtl"!==a&&"ltr"!==a||(e=a)}return{direction:e,isRtl:"rtl"===e}},n=function(e){var a="ltr";"rtl"!==e&&"ltr"!==e||(a=e),localStorage.setItem("direction",a)}},813:function(e){e.exports={"general.copyright":"Gogo React \xa9 2018 All Rights Reserved.","user.login-title":"Login","user.register":"Register","user.forgot-password":"Forgot Password","user.email":"E-mail","user.password":"Password","user.forgot-password-question":"Forget password?","user.fullname":"Full Name","user.login-button":"LOGIN","user.register-button":"REGISTER","user.reset-password-button":"RESET","user.buy":"BUY","user.username":"Username","user.new-password-again":"New Password Again","user.new-password":"New Password","user.reset-password":"Reset Password","menu.jobs":"Jobs","menu.category":"Job Category","menu.users":"Users","menu.comments":"comments","menu.app":"Home","menu.dashboards":"Dashboards","menu.default":"Default","menu.analytics":"Analytics","menu.ecommerce":"Ecommerce","menu.content":"Content","menu.pages":"Pages","menu.data-list":"Data List","menu.thumb-list":"Thumb List","menu.image-list":"Image List","menu.details":"Details","menu.search":"Search","menu.login":"Login","menu.register":"Register","menu.forgot-password":"Forgot Password","menu.error":"Error","menu.applications":"Applications","menu.todo":"To-do List","menu.survey":"Survey","menu.chat":"Chat","menu.ui":"UI","menu.posts":"Posts","menu.alerts":"Alerts","menu.badges":"Badges","menu.buttons":"Buttons","menu.cards":"Cards","menu.carousel":"Carousel","menu.charts":"Charts","menu.collapse":"Collapse","menu.dropdowns":"Dropdowns","menu.editors":"Editors","menu.form-layouts":"Form Layouts","menu.form-components":"Form Components","menu.form-validations":"Form Validations","menu.form-wizard":"Form Wizard","menu.icons":"Icons","menu.input-groups":"Input Groups","menu.jumbotron":"Jumbotron","menu.modal":"Modal","menu.navigation":"Navigation","menu.popover-tooltip":"Popover & Tooltip","menu.sortable":"Sortable","menu.tables":"Tables","menu.menu":"Menu","menu.subhidden":"Subhidden","menu.hidden":"Hidden","menu.visible":"Visible","menu.maps":"Maps","menu.landingpage":"Landing Page","menu.multipage-home":"Multipage Home","menu.singlepage-home":"Singlepage Home","menu.about":"About","menu.auth-login":"Auth Login","menu.auth-register":"Auth Register","menu.reset-password":"Reset Password","menu.blog":"Blog","menu.blog-list":"Blog List","menu.blog-detail":"Blog Detail","menu.careers":"Careers","menu.confirmation":"Confirmation","menu.contact":"Contact","menu.docs":"Docs","menu.features":"Features","menu.prices":"Prices","menu.videos":"Videos","menu.mailing":"Mailing","menu.invoice":"Invoice","menu.blank-page":"Blank Page","menu.types":"Menu Types","menu.levels":"Menu Levels","menu.third-level-1":"Third Level 1","menu.third-level-2":"Third Level 2","menu.third-level-3":"Third Level 3","menu.faq":"Faq","menu.knowledge-base":"Knowledge Base","menu.authorization":"Authorization","menu.profile":"Profile","menu.product":"Product","menu.miscellaneous":"Miscellaneous","menu.portfolio":"Portfolio","menu.social":"Social","menu.details-alt":"Details Alt","menu.forms":"Forms","menu.components":"Components","menu.layouts":"Layouts","menu.validations":"Validations","menu.wizard":"Wizard","pages.add_category":"Add Category","pages.submit":"Save Category","pages.cancel":"Cancel","pages.display-options":"","pages.ads":"Ads","menu.ads":"Ads Listing","pages.url":"Ad URL","pages.Image":"Image","pages.adsAdd":"Save Ad","menu.business":"Business"}},1440:function(e){e.exports={"general.copyright":"Gogo React \xa9 Todos los derechos reservados.","user.login-title":"Iniciar sesi\xf3n","user.register":"Registro","user.forgot-password":"Se te olvid\xf3 tu contrase\xf1a","user.email":"Email","user.password":"Contrase\xf1a","user.forgot-password-question":"\xbfContrase\xf1a olvidada?","user.fullname":"Nombre completo","user.login-button":"INICIAR SESI\xd3N","user.register-button":"REGISTRO","user.reset-password-button":"REINICIAR","user.buy":"COMPRAR","user.username":"Nombre de Usuario","user.new-password-again":"New Password Again","user.new-password":"New Password ","user.reset-password":"Reset Password","menu.app":"Inicio","menu.dashboards":"Tableros","menu.default":"Defecto","menu.analytics":"Anal\xedtica","menu.ecommerce":"Comercio electr\xf3nico","menu.content":"Contenido","menu.pages":"P\xe1ginas","menu.data-list":"Lista Datos","menu.thumb-list":"Lista Pulgares","menu.image-list":"Lista Imagen","menu.details":"Detalles","menu.search":"B\xfasqueda","menu.login":"Iniciar sesi\xf3n","menu.register":"Registro","menu.forgot-password":"Olvid\xe9 mi contrase\xf1a","menu.reset-password":"Reset Password","menu.error":"Error","menu.applications":"Aplicaciones","menu.todo":"Notas","menu.survey":"Encuesta","menu.chat":"Chatea","menu.ui":"IU","menu.alerts":"Alertas","menu.badges":"Badges","menu.buttons":"Botones","menu.cards":"Tarjetas","menu.carousel":"Carrusel","menu.charts":"Gr\xe1ficos","menu.collapse":"Colapso","menu.dropdowns":"Men\xfas Desplegables","menu.editors":"Editores","menu.form-layouts":"Dise\xf1os de Formulario","menu.form-components":"Componentes de Formulario","menu.form-validations":"Validaciones de Formulario","menu.form-wizard":"Asistente de Formulario","menu.icons":"Iconos","menu.input-groups":"Grupos de Entrada","menu.jumbotron":"Jumbotron","menu.modal":"Modal","menu.navigation":"Navegaci\xf3n","menu.popover-tooltip":"Tooltips y Popovers","menu.sortable":"Ordenable","menu.tables":"Tablas","menu.menu":"Men\xfa","menu.subhidden":"Sub Oculto","menu.hidden":"Oculto","menu.visible":"Visible","menu.maps":"Mapas","menu.landingpage":"P\xe1gina de Destino","menu.multipage-home":"M\xfaltiple P\xe1gina","menu.singlepage-home":"Una P\xe1gina","menu.about":"Acerca de","menu.auth-login":"Autenticaci\xf3n","menu.auth-register":"Registro","menu.blog":"Blog","menu.blog-detail":"Detalle del Blog","menu.careers":"Carrera","menu.confirmation":"Confirmaci\xf3n","menu.contact":"Contacto","menu.docs":"Docs","menu.features":"Caracteristicas","menu.prices":"Precios","menu.videos":"Videos","menu.mailing":"Correo","menu.invoice":"Factura","menu.blank-page":"Blank Page","menu.types":"Menu Types","menu.levels":"Menu Levels","menu.third-level-1":"Third Level 1","menu.third-level-2":"Third Level 2","menu.third-level-3":"Third Level 3","menu.faq":"Pmf","menu.knowledge-base":"Base de Conocimientos","menu.authorization":"Authorization","menu.profile":"Profile","menu.product":"Producto","menu.miscellaneous":"Diversa","menu.portfolio":"Portafolio","menu.social":"Social","menu.details-alt":"Details Alt","menu.forms":"Formulario","menu.components":"Componentes","menu.layouts":"Dise\xf1os","menu.validations":"Validaciones","menu.wizard":"Mago","dashboards.pending-orders":"Pedidos Pendientes","dashboards.completed-orders":"Pedidos Completados","dashboards.refund-requests":"Petici\xf3n de Reembolso","dashboards.new-comments":"Nuevos Comentarios","dashboards.sales":"Ventas","dashboards.orders":"Pedidos","dashboards.refunds":"Reembolso","dashboards.recent-orders":"Pedidos Recientas","dashboards.product-categories":"Categor\xedas de Producto","dashboards.cakes":"Tortas","dashboards.tickets":"Entradas","dashboards.calendar":"Calendario","dashboards.best-sellers":"Mejores Vendidos","dashboards.website-visits":"Visitas al sitio web","dashboards.unique-visitors":"Visitantes \xfanicos","dashboards.this-week":"Esta Semana","dashboards.last-week":"La Semana Pasada","dashboards.this-month":"Este Mes","dashboards.conversion-rates":"Medidas de Conversi\xf3n","dashboards.per-session":"Por Secci\xf3n","dashboards.profile-status":"Estado del Perfil","dashboards.payment-status":"Estado del Pago","dashboards.work-progress":"Trabajo en Progreso","dashboards.tasks-completed":"Tareas Completadas","dashboards.payments-done":"Pagos Realizados","dashboards.order-stock":"Pedidos - Valores","dashboards.categories":"Categor\xedas","dashboards.quick-post":"Publicaci\xf3n R\xe1pida","dashboards.title":"T\xedtulo","dashboards.content":"Contenido","dashboards.category":"Categor\xeda","dashboards.save-and-publish":"Guardar y Publicar","dashboards.top-viewed-posts":"Publicaciones M\xe1s Vistas","dashboards.posts":"Puestos","dashboards.pending-for-publish":"Pendiente de Publicaci\xf3n","dashboards.users":"Usuarios","dashboards.on-approval-process":"En Proceso de Aprobaci\xf3n","dashboards.alerts":"Alertas","dashboards.waiting-for-notice":"Esperando Aviso","dashboards.files":"Archivos","dashboards.pending-for-print":"Pendiente para imprimir","dashboards.logs":"Troncos","dashboards.gogo":"GOGO","dashboards.magic-is-in-the-details":"LA MAGIA ESTA EN LOS DETALLES","dashboards.yes-it-is-indeed":"\xa1Si es verdad!","dashboards.advanced-search":"B\xfasqueda Avanzada","dashboards.toppings":"Coberturas","dashboards.type":"Categor\xeda","dashboards.keyword":"Palabra Clave","dashboards.search":"B\xfasqueda","dashboards.top-rated-items":"Art\xedculos Mejores Valorados","pages.add-new":"AGREGAR NUEVO","pages.add-new-modal-title":"Agregar \xedtem nuevo","pages.display-options":"Opciones de Pantalla","pages.orderby":"Ordenar por : ","pages.product-name":"Nombre del Producto","pages.category":"Categor\xeda","pages.description":"Descripci\xf3n","pages.status":"Estado","pages.cancel":"Cancelar","pages.submit":"Enviar","pages.delete":"Borrar","pages.another-action":"Otra accion","pages.actions":"ACCIONES","pages.header":"Encabezado","pages.details":"DETALLES","pages.orders":"PEDIDOS","pages.rating":"Clasificaci\xf3n","pages.price":"Precio","pages.ingredients":"Ingredients","pages.is-vegan":"Es Vegano","pages.order-status":"Estado del Pedido","pages.bake-progress":"Progreso de Hornear","pages.popularity":"Popularidad","pages.comments":"Comentarios","pages.error-title":"Vaya, parece que ha ocurrido un error!","pages.error-code":"C\xf3digo de error","pages.go-back-home":"REGRESAR A INICIO","pages.mailing-info":"Las plantillas de correo utilizan el dise\xf1o en l\xednea y el dise\xf1o de la tabla para mostrarse bien en varios proveedores de servicios. Para proporcionar una mejor usabilidad, lo incluimos como html regular con dangerouslySetInnerHTML.","pages.invoice-info":"La plantilla de factura tiene una versi\xf3n de estilo en l\xednea para uso fuera del proyecto, as\xed como la versi\xf3n React.","pages.react-version":"React Versi\xf3n","pages.inline-version":"Estilo en Linea Html Versi\xf3n","pages.like":"Me gusta","pages.likes":"Me gusta","pages.details-title":"Detalles","pages.comments-title":"Comentarios","pages.questions-title":"Preguntas","pages.similar-projects":"Proyectos Similares","pages.send":"Enviar","pages.addComment":"A\xf1adir un comentario","pages.location":"Ubicaci\xf3n","pages.responsibilities":"Responsabilidades","pages.photos":"Fotos","pages.who-to-follow":"A qui\xe9n seguir","pages.follow":"SEGUIR","pages.followers":"SEGUIDORES","pages.recent-posts":"Mensajes Recientes","pages.profile":"PERFIL","pages.friends":"AMIGOS","pages.images":"IMAGENES","pages.purchase":"COMPRA","pages.price.developer":"REVELADOR","pages.price.team":"EQUIPO","pages.price.enterprise":"EMPRESA","pages.price.twofactorauthentication":"Autenticaci\xf3n de dos factores","pages.price.teampermissions":"Permisos del equipo","pages.price.245Support":"24/5 Soporte","pages.price.247Support":"24/7 Soporte","pages.price.useractionsauditlog":"Registro de acciones del usuario","pages.prices.featurecomparison":"Comparaci\xf3n de Caracter\xedsticas","pages.prices.pricecomparison":"Comparaci\xf3n de Precios","chat.messages":"Mensajes","chat.contacts":"Contactos","chat.saysomething":"Di algo..","survey.delete":"Borrar","survey.edit":"Edit","survey.add-new":"AGREGAR NUEVO","survey.add-new-title":"Add New Encuesta","survey.title":"T\xedtulo","survey.category":"Categor\xeda","survey.label":"Etiqueta","survey.status":"Estado","survey.cancel":"Cancelar","survey.submit":"Enviar","survey.another-action":"Otra accion","survey.display-options":"Opciones de Pantalla","survey.orderby":"Ordenar por : ","survey.all-surveys":"Todas las Encuestas","survey.completed-surveys":"Encuestas Completadas","survey.categories":"Categor\xedas","survey.active-surveys":"Encuestas Activas","survey.labels":"Etiquetas","todo.add-new":"AGREGAR NUEVO","todo.add-new-title":"A\xf1adir Nuevo","todo.title":"T\xedtulo","todo.detail":"Detalle","todo.category":"Categor\xeda","todo.label":"Etiqueta","todo.status":"Estado","todo.cancel":"Cancelar","todo.submit":"Enviar","todo.action":"Accion","todo.another-action":"Otra accion","todo.display-options":"Opciones de Pantalla","todo.orderby":"Ordenar por : ","todo.all-tasks":"Todas las Tareas","todo.pending-tasks":"Tareas Pendientes","todo.completed-tasks":"Tareas Completadas","todo.categories":"Categor\xedas","todo.labels":"Etiquetas","alert.rounded":"Alerta Redondeado","alert.react-notifications":"React Notificaciones","alert.outline":"Contorno","alert.primary":"Primary","alert.secondary":"Secondary","alert.info":"Info","alert.success":"Success","alert.warning":"Warning","alert.error":"Error","alert.filled":"Lleno","alert.primary-text":"\xa1Esto es un primary alert\u2014check fuera!","alert.secondary-text":"\xa1Esto es un secondary alert\u2014check fuera!","alert.success-text":"\xa1Esto es un success alert\u2014check fuera!","alert.danger-text":"\xa1Esto es un danger alert\u2014check fuera!","alert.warning-text":"\xa1Esto es un warning alert\u2014check fuera!","alert.info-text":"\xa1Esto es un info alert\u2014check fuera!","alert.light-text":"\xa1Esto es un light alert\u2014check fuera!","alert.dark-text":"\xa1Esto es un dark alert\u2014check fuera!","alert.default":"Alerta por Defecto","alert.dismissing":"Despido de Alerta","alert.dismissing-text":"\xa1Santo guacamole! Debes revisar algunos de esos campos a continuaci\xf3n.","alert.dismissing-without-animate-text":"\xa1Estoy alerta y me pueden despedir sin animarme!","badge.sizes":"Tama\xf1os","badge.colors":"Colores","badge.outline":"Contorno","badge.links":"Enlaces","badge.counter-badges":"Mostrador Badges","badge.bootstrap-default":"Bootstrap Defecto","badge.primary":"Primary","badge.secondary":"Secondary","badge.success":"Success","badge.danger":"Danger","badge.warning":"Warning","badge.info":"Info","badge.light":"Light","badge.dark":"Dark","button.default":"Bootstrap Defecto","button.colors":"Colores","button.rounded":"Botones Redondeado","button.outline":"Contorno","button.states":"Estados","button.sizes":"Tama\xf1os","button.button-groups":"Grupos de Botones","button.large-button":"Bot\xf3n Grande","button.small-button":"Bot\xf3n Peque\xf1o","button.extra-small-button":"Bot\xf3n Extra Peque\xf1o","button.block-button":"Bot\xf3n de Bloqueo","button.active":"Activo","button.disabled":"Discapacitado","button.basic":"B\xe1sico","button.toolbar":"Barra de Herramientas","button.nesting":"Anidando","button.vertical-variation":"Variaci\xf3n Vertical","button.checkbox-radio-button":"Checkbox  y Radio Buttons","button.checkbox":"Checkbox","button.radio":"Radio","button.radio-button":"Radio Button","button.primary":"Primary","button.secondary":"Secondary","button.success":"Success","button.danger":"Danger","button.warning":"Warning","button.info":"Info","button.light":"Light","button.dark":"Dark","button.states-text":"Este bot\xf3n muestra una rueda giratoria durante 2 segundos y un icono de error durante 3 segundos antes de cambiar al estado normal. Estos estados se pueden activar agregando y eliminando clases.","button.click-here":"Haga clic aqu\xed","button.states-text-alternate":"Este bot\xf3n muestra una rueda giratoria durante 2 segundos y un icono de error durante 3 segundos antes de cambiar al estado normal. Estos estados se pueden activar agregando y eliminando clases.","button.primary-link":"Primary Enlace","button.link":"Enlace","button.primary-button":"Primary Bot\xf3n","button.button":"Bot\xf3n","button.left":"Izquierda","button.middle":"Centro","button.right":"Derecha","button.dropdown":"Desplegable","button.dropdown-link":"Enlace Desplegable","cards.icon-card":"Tarjeta de Icono","cards.image-card":"Tarjeta de Imagen","cards.image-overlay-card":"Tarjeta de Superposici\xf3n de Im\xe1genes","cards.image-card-list":"Lista de Tarjetas de Imagen","cards.tab-card":"Tarjeta de Tab","cards.user-card":"Tarjeta de Usuario","carousel.basic":"Carrusel B\xe1sico","carousel.single":"Carrusel S\xf3lo","carousel.without-controls":"Carrusel sin Control","charts.line":"Gr\xe1fico de Linea","charts.polar":"Gr\xe1fico de Polar","charts.area":"Gr\xe1fico de \xc1rea","charts.scatter":"Gr\xe1fico de Dispersi\xf3n","charts.bar":"Gr\xe1fico de Barras","charts.radar":"Gr\xe1fico de Radar","charts.pie":"Gr\xe1fico de Circular","charts.doughnut":"Gr\xe1fico de Rosquilla","charts.shadow":"Sombra","charts.no-shadow":"Sin Sombra","collapse.basic":"B\xe1sico","collapse.toggle":"Palanca","collapse.accordion":"Acorde\xf3n","collapse.controlled":"Revisado","collapse.uncontrolled":"Sin Control","dropdowns.basic":"B\xe1sico","dropdowns.controlled":"Revisado","dropdowns.uncontrolled":"Sin Control","dropdowns.dropdown":"Desplegable","dropdowns.header":"Encabezado","dropdowns.action":"Accion","dropdowns.another-action":"Otra accion","dropdowns.right":"Derecha","dropdowns.left":"Izquierda","dropdowns.drop-directions":"Direcciones de drop","dropdowns.dropright":"Drop Derecha","dropdowns.dropleft":"Drop Izquierda","dropdowns.small-button":"Bot\xf3n Peque\xf1o","dropdowns.large-button":"Bot\xf3n Grande","dropdowns.sizing":"Dimensionamiento","dropdowns.split-button":"Botones Desplegables","dropdowns.dropup":"Dropup","editors.draftjs":"Draft.js","editors.quill-standart":"Quill Est\xe1ndar","editors.quill-bubble":"Quill Burbuja","forms.basic":"B\xe1sico","forms.email":"Email","forms.email-muted":"Nunca compartiremos tu email con nadie m\xe1s.","forms.password":"Contrase\xf1a","forms.password-confirm":"Confirmar Contrase\xf1a","forms.submit":"Enviar","forms.horizontal":"Horizontal","forms.radios":"Radios","forms.first-radio":"Primero radio","forms.second-radio":"Segundo radio","forms.third-radio-disabled":"Tercera radio deshabilitada","forms.checkbox":"Checkbox","forms.signin":"Registrarse","forms.top-labels-over-line":"Etiquetas Superiores Sobre la L\xednea","forms.tags":"Etiquetas","forms.date":"Fecha","forms.state":"Estado","forms.top-labels-in-input":"Etiquetas Superiores Sobre la Entrada","forms.email-u":"EMAIL","forms.password-u":"CONTRASE\xd1A","forms.tags-u":"ETIQUETAS","forms.date-u":"FECHA","forms.state-u":"ESTADO","forms.grid":"Cuadr\xedcula de Formulario","forms.address":"Direcci\xf3n","forms.address2":"Direcci\xf3n 2","forms.city":"Ciudad","forms.city-message":"Por favor seleccione una ciudad!","forms.state-message":"Por favor seleccione un estado!","forms.zip":"C\xf3digo Postal","forms.signup":"Reg\xedstrate","forms.inline":"Inline","forms.validation":"Validaci\xf3n","forms.default":"Defecto","forms.firstname":"Nombre de Pila","forms.firstname-message":"\xa1Por favor, introduzca su nombre de pila!","forms.lastname":"Apellido","forms.lastname-message":"\xa1Por favor ingrese su apellido!","forms.name":"Nombre","forms.validation-availity":"Availity Reactstrap Validation","forms.validation-formik":"Formik Validation","form-components.custom-inputs":"Entrada Personalizada","form-components.checkboxes":"Checkboxes","form-components.radios":"Radios","form-components.inline":"Inline","form-components.react-select":"React Select","form-components.state-single":"Estado Soltero","form-components.state-multiple":"Estado M\xfaltiple","form-components.react-autosuggest":"React Autosuggest","form-components.date-picker":"Selector de Fechas","form-components.date":"Fecha","form-components.date-range":"Rango de Fechas","form-components.date-with-time":"Fecha con Hora","form-components.embedded":"Incrustado","form-components.dropzone":"Dropzone","form-components.drop-files-here":"Soltar Archivos Aqu\xed","form-components.tags":"Etiquetas","form-components.switch":"Cambiar","form-components.primary":"Primary","form-components.secondary":"Secondary","form-components.primary-inverse":"Primary Inverso","form-components.secondary-inverse":"Secondary Inverso","form-components.slider":"Deslizador","form-components.double-slider":"Doble Deslizador","form-components.single-slider":"\xdanico Deslizador","form-components.rating":"Clasificaci\xf3n","form-components.interactive":"Interactivo","form-components.readonly":"Solo Lectura","form-components.type-a-cake":"Escribe un pastel","form-components.start":"Comienzo","form-components.end":"Fin","form-components.tables":"Tablas","icons.simplelineicons":"Simple Line Iconos","icons.iconsmind":"Iconsmind Iconos","input-groups.basic":"B\xe1sico","input-groups.sizing":"Dimensionamiento","input-groups.small":"Peque\xf1o","input-groups.default":"Defecto","input-groups.large":"Grande","input-groups.checkboxes-and-radios":"Checkboxes y radios","input-groups.multiple-inputs":"Entradas M\xfaltiples","input-groups.first-and-last-name":"Nombre y apellido","input-groups.multiple-addons":"Complementos M\xfaltiples","input-groups.button-addons":"Complementos Bot\xf3n","input-groups.button":"Bot\xf3n","input-groups.buttons-with-dropdowns":"Botones y Desplegables","input-groups.dropdown":"Desplegable","input-groups.header":"Encabezado","input-groups.action":"Accion","input-groups.another-action":"Otra accion","input-groups.custom-select":"Personalizada Select","input-groups.options":"Opciones","input-groups.choose":"Escoger...","input-groups.custom-file-input":"Entrada de Archivo Personalizada","jumbotron.hello-world":"\xa1Hola Mundo!","jumbotron.lead":"Esta es una unidad de h\xe9roe simple, un componente de estilo jumbotron simple para llamar la atenci\xf3n extra al contenido o informaci\xf3n destacados.","jumbotron.lead-detail":"Utiliza clases de utilidad para tipograf\xeda y espaciado para espaciar el contenido dentro del contenedor m\xe1s grande.","jumbotron.learn-more":"Aprende m\xe1s","modal.basic":"B\xe1sico","modal.modal-title":"T\xedtulo Modal","modal.launch-demo-modal":"Lanzar Demo Modal","modal.scrolling-long-content":"Contenido de Desplazamiento Largo","modal.backdrop":"Fondo","modal.backdrop-value":"Valor de Fondo","modal.right-modal":"Derecha Modal","modal.launch-right-modal":"Launch Derecha Modal","modal.nested-modal":"Modal Anidado","modal.size":"Tama\xf1o","modal.launch-large-modal":"Lanzar Grande Modal","modal.launch-small-modal":"Lanzar Peque\xf1o Modal","nav.basic":"Navegaci\xf3n B\xe1sico","nav.active":"Activo","nav.disabled":"Discapacitado","nav.disabled-link":"Enlace Discapacitado","nav.link":"Enlace","nav.longer-link":"Enlace de navegaci\xf3n m\xe1s largo","nav.another-link":"Otro Enlace","nav.right":"Derecha","nav.dropdown":"Desplegable","nav.header":"Encabezado","nav.action":"Accion","nav.another-action":"Otra accion","nav.horizontal-alignment":"Alineaci\xf3n Horizontal","nav.vertical-alignment":"Alineaci\xf3n Vertical","nav.pills":"Navegaci\xf3n P\xedldoras","nav.fill-justify":"Navegaci\xf3n Llenar y Justify","nav.pills-dropdowns":"Nav Pills with Dropdowns","nav.pagination-basic":"Paginaci\xf3n B\xe1sico","nav.pagination-sizing":"Paginaci\xf3n Dimensionamiento","nav.large":"Grande","nav.small":"Peque\xf1o","nav.center":"Centro","nav.pagination-alignment":"Alineaci\xf3n de Paginaci\xf3n","nav.breadcrumb-basic":"Migas de Pan B\xe1sico","popover-tooltip.popover":"Popovers","popover-tooltip.tooltip":"Tooltips","sortable.columns":"Clasificar Columnas","sortable.basic":"B\xe1sico","sortable.handles":"Handles","maps.google":"Google","maps.yandex":"Yandex","table.bootstrap-tables":"Tablas Bootstrap","table.bootstrap-basic":"Tablas B\xe1sicas","table.bootstrap-striped":"Cebreadas","table.bootstrap-bordered":"Tablas Con Bordes","table.bootstrap-borderless":"Tablas Sin Bordes","table.bootstrap-hoverable":"Tablas din\xe1micas","table.bootstrap-responsive":"Tablas Responsive","table.react-tables":"Tablas React","table.react-pagination":"Paginaci\xf3n","table.react-scrollable":"Tablas Con Voluta","table.react-advanced":"Filtro, Longitud y Salto","wizard.step-name-1":"Paso 1","wizard.step-name-2":"Paso 2","wizard.step-name-3":"Paso 3","wizard.step-desc-1":"Descripci\xf3n del primer paso","wizard.step-desc-2":"Descripci\xf3n del segundo paso","wizard.step-desc-3":"Descripci\xf3n del tercer paso","wizard.content-1":"Contenido para el primer paso.","wizard.content-2":"Contenido para el segundo paso.","wizard.content-3":"Contenido del \xfaltimo paso!","wizard.content-thanks":"Gracias!","wizard.next":"Entrante","wizard.prev":"Anterior","wizard.registered":"\xa1Su registro se complet\xf3 con \xe9xito!","wizard.async":"\xa1Ahorro as\xedncrono durante 3 segundos!"}},8374:function(){},5353:function(){},7116:function(){}}]);
//# sourceMappingURL=App.552cb047.chunk.js.map