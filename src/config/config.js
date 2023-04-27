module.exports = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api/v1/"
      : "https://rocci-backend.herokuapp.com/api/v1/",
};