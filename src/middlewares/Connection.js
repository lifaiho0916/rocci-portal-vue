import axios from "axios";
import config from "../config/config";
import Vue from "../main";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;
axios.defaults.baseURL = config.api;
class Connection {
  static async get(url, args, callback) {
    try {
      axios({
        method: "GET",
        url: url,
        params: args,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.data) return callback(null, null);
          if (response.data.error) return callback(response.data.error, null);
          console.log(response.data);
          callback(null, response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            if (error.response.status === 400)
              return callback("Wrong call", null);
            if (error.response.status === 401) {
              Vue.$store.commit("signOut");
              Vue.$router.push({
                name: "Index",
                params: { error: "Login Expired" },
              });
              return callback("Login Expired", null);
            }
            if (error.response.status === 403)
              return callback("Not Allowed", null);
            if (error.response.status === 500)
              return callback("Erorr Happened", null);
          }
          callback("Network Error", null);
          console.log(error);
        });
    } catch (error) {
      callback("Network Error", null);
    }
  }
  static async post(url, args, callback) {
    try {
      axios({
        method: "POST",
        url: url,
        data: args,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.data) return callback(null, null);
          if (response.data.error) return callback(response.data.error, null);
          callback(null, response.data);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400)
              return callback("Incorrect", null);
            if (error.response.status === 401) {
              Vue.$store.commit("signOut");
              Vue.$router.push({
                name: "Index",
                params: { error: "Login Expired" },
              });
              return callback("Login Expired", null);
            }
            if (error.response.status === 403)
              return callback("Not Allowed", null);
            if (error.response.status === 500)
              return callback("Error Happened", null);
          }
          callback("Network Error", null);
        });
    } catch (error) {
      callback("Network Error", null);
    }
  }
}
export default Connection;
