import connection from "@/middlewares/Connection";
class Service {
  // ------------------------------START OF VOLUNTEERS--------------------------------------------------------------------------
  static getVolunteersAbstract(callback) {
    connection.get("portal/getVolunteersAbstract", null, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.volunteers);
    });
  }
  static getuserDetails(_id, callback) {
    connection.get(`user/${_id}`, null, (err, result) => {
      if (err) return callback(err, null);
      console.log(result.data);
      callback(null, result.data);
    });
  }
  static getuserSub(_id, callback) {
    connection.get(`user-subscription/${_id}`, null, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.data);
    });
  }
  static delVolunteer(volunteer_id, callback) {
    connection.post(
      "portal/delVolunteer",
      { volunteer_id: volunteer_id },
      callback
    );
  }
  static unblockVolunteer(volunteer_id, callback) {
    connection.post(
      "portal/unblockVolunteer",
      { volunteer_id: volunteer_id },
      callback
    );
  }
  static blockVolunteer(volunteer_id, date, callback) {
    connection.post(
      "portal/blockVolunteer",
      { volunteer_id: volunteer_id, date: date },
      callback
    );
  }
  // -------------------------------START OF USERS-------------------------------------------------------------------------
  static getusersAbstract(callback) {
    connection.get("users", null, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.data);
    });
  }
  static getdiscountsAbstract(callback) {
    connection.get("discounts", null, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.data);
    });
  }

  static blockuser(user, callback) {
    connection.post(`user/block/${user}`, { user: user }, callback);
  }
  static unblockuser(user, callback) {
    connection.post(`user/unblock/${user}`, { user: user }, callback);
  }
  static enablediscount(discount, callback) {
    connection.post(
      `discount/enable/${discount}`,
      { discount: discount },
      callback
    );
  }
  static disablediscount(discount, callback) {
    connection.post(
      `discount/disable/${discount}`,
      { discount: discount },
      callback
    );
  }
  static addUser(user, callback) {
    connection.post("portal/addUser", { user: user }, callback);
  }
  static addDiscount(discount, callback) {
    connection.post("discount/add", { discount }, callback);
  }

  static editUser(user, callback) {
    connection.post("portal/editUser", { user: user }, callback);
  }
  static delUser(user_id, callback) {
    connection.post("portal/delUser", { user_id: user_id }, callback);
  }
  // --------------------------------START OF EVENTS------------------------------------------------------------------------
  static getEventsAbstract(callback) {
    connection.get("portal/getEventsAbstract", null, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.events);
    });
  }
  static getEventDetails(event_id, callback) {
    connection.get(
      "portal/getEventDetails",
      { event_id: event_id },
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.event);
      }
    );
  }
  static addEvent(event, callback) {
    connection.post("portal/addEvent", { event: event }, callback);
  }
  static editEvent(event, callback) {
    connection.post("portal/editEvent", { event: event }, callback);
  }
  static delEvent(event_id, callback) {
    connection.post("portal/delEvent", { event_id: event_id }, callback);
  }
  static acceptEvent(event_id, callback) {
    connection.post("portal/acceptEvent", { event_id: event_id }, callback);
  }
  static revertEvent(event_id, callback) {
    connection.post("portal/revertEvent", { event_id: event_id }, callback);
  }
  // -------------------------------START OF COMPLAINS-------------------------------------------------------------------------
  static getComplainsAbstract(callback) {
    connection.get("portal/getComplainsAbstract", null, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.complains);
    });
  }
  static getComplainDetails(complain_id, callback) {
    connection.get(
      "portal/getComplainDetails",
      { complain_id: complain_id },
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.complain);
      }
    );
  }
  static addComplain(complain, callback) {
    connection.post("portal/addComplain", { complain: complain }, callback);
  }
  static editComplain(complain, callback) {
    connection.post("portal/editComplain", { complain: complain }, callback);
  }
  static delComplain(complain_id, callback) {
    connection.post(
      "portal/delComplain",
      { complain_id: complain_id },
      callback
    );
  }
  // --------------------------------------START OF COMPANIES------------------------------------------------------------------
  static coSignup(company, callback) {
    connection.post("portal/coSignup", { company: company }, callback);
  }
  static getCompanyAbstract(callback) {
    connection.get("portal/getCompanyAbstract", null, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.company);
    });
  }
  static getCompanyDetails(company_id, callback) {
    connection.get(
      "portal/getCompanyDetails",
      { company_id: company_id },
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.company);
      }
    );
  }
  static addCompany(company, callback) {
    connection.post("portal/coSignup", { company: company }, callback);
  }
  static delCompany(company_id, callback) {
    connection.post("portal/delCompany", { company_id: company_id }, callback);
  }
  static editCompany(company, callback) {
    connection.post("portal/editCompany", { company: company }, callback);
  }
  // --------------------------------------START OF SERVICE------------------------------------------------------------------
  static addService(service, callback) {
    connection.post("portal/addService", { service: service }, callback);
  }
  static getServiceAbstract(callback) {
    connection.get("portal/getServiceAbstract", null, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.service);
    });
  }
  static delService(service_id, callback) {
    connection.post("portal/delService", { service_id: service_id }, callback);
  }
  static editService(service, callback) {
    connection.post("portal/editService", { service: service }, callback);
  }
  static getServiceDetails(service_id, callback) {
    connection.get(
      "portal/getServiceDetails",
      { service_id: service_id },
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.service);
      }
    );
  }
  //-----------------------------------------------VOLEVENTS-------------------------
  static getVolEvAbstract(eventId, callback) {
    connection.get(
      "portal/getVolEvAbstract",
      { eventId: eventId },
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.content);
      }
    );
  }
  static delVolEv(volev_id, callback) {
    connection.post("portal/delVolEv", { volev_id: volev_id }, callback);
  }

  //-------------------------------------START OF PARTNERS--------------------------------------------
}

export default Service;
