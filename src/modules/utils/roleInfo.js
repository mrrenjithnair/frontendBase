class RoleInfo {
    constructor() {
      this.defaultPrivileges = {
        "header": {},
        "club":{},
        "user":{},
        "dashboard":{},
      }
  
      this.privileges = this.defaultPrivileges;
  
      this.reset = () => {
        this.privileges = this.defaultPrivileges;
      }
  
      this.set = (privileges) => {
        this.privileges = Object.assign(this.defaultPrivileges, privileges);
      }
    }
  }
  
  export default (new RoleInfo);
  