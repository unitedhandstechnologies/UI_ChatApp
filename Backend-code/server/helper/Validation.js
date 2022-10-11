 class Validation {
   constructor(sehema, request) {
     this.sehema = sehema;
     this.request = request;
     this.error = [];
     this.requried();
   }

   isEmail(email) {
     const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
     if (!reg.test(email)) {
       this.error['email'] = {
         emailFormate: 'Invaild Email',
       };
     }
     return this;
   }

   requried(){
     
   }

   get isVaild() {
     return this.error;
   }
 }

module.exports = Validation;