const assert = require("assert");
const User = require("../src/user");

describe("Reading User out of database", () => {

  let joe;
  beforeEach(async () => {
    joe = new User({name: "Joe"})
    await joe.save();
  })

  it("finds all users with name of joe", async () => {
    const users = await User.find({name: "Joe"})
    assert(users[0]._id.toString === joe._id.toString)
  })
})
