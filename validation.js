const validator = {

    validateAuthorization : (authorization) => {
        if (typeof authorization !== 'object' || !authorization.last_login || !(authorization.last_login instanceof Date)) {
          return false;
        }
        return true;
      },
      
    admin_name: (admin_name) => {
      if (!/^[A-Za-z]+$/.test(admin_name)) {
        return false;
      }
      return true;
    },
    admin_email: (admin_email) => {
      if (!/[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/.test(admin_email)) {
       
      }
      return true;
    },
    admin_password: (admin_password) => {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(admin_password)) {
            return false;
          }
          return true
    },
    user_name:(user_name)=>{
        if (!/^[A-Za-z0-9-]+$/.test(user_name)){
            return false;
        }
        return true;
    }
}
module.exports = validator