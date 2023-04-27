module.exports = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8082/api/v1/"
      : "https://rocci-backend.herokuapp.com/api/v1/",
};