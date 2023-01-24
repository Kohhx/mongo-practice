const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_test");
mongoose.connection
  .once("open", () => console.log("Good to go"))
  .on("error", (error) => {
    console.warn("Warning", error);
  });

// Drop users collection after each test so that each test is run in isolation
// Using Callback
// beforeEach((done) => {
//   mongoose.connection.collections.users.drop(() => {
//     done();
//   });
// });

// Drop users collection after each test so that each test is run in isolation
// Using await
beforeEach(async () => {
  await mongoose.connection.collections.users.drop();
});
