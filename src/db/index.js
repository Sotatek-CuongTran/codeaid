// /////////////////////////////////////////////////////////////////////////////
// IMPORTANT:
// THE CODE BELOW IS READ ONLY CODE AND YOU SHOULD INSPECT IT TO SEE WHAT IT
// DOES IN ORDER TO COMPLETE THE TASK, BUT DO NOT MODIFY IT IN ANY WAY AS THAT
// WILL RESULT IN A TEST FAILURE
// /////////////////////////////////////////////////////////////////////////////

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:", {
  logging: function (str) {
    // do stuff with the sql str
    console.log("🚀 ~ file: index.js:15 ~ str:", str)
  },
});
export default sequelize;
