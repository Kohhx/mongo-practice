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

  it("find one user with particular ID using findOne", async() => {
    const users = await User.findOne({_id: joe._id});
    assert(users.name=== "Joe")
  })

  it("find one user with particular ID using findbyID", async() => {
    const users = await User.findById(joe._id);
    assert(users.name === "Joe")
  })
})
