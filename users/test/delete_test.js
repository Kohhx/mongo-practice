const assert = require("assert");
const User = require("../src/user");

describe("Deleting a User", () => {
  let joe;
  beforeEach(async () => {
    joe = new User({ name: "Joe" });
    await joe.save();
  });

  it("model instance remove", async () => {
    const user = await User.findOne({ name: "Joe" });
    await user.remove();
    const userfind = await User.findOne({ name: "Joe" });
    assert(userfind === null);
  });

  it("class method Delete Many", async () => {
    await User.deleteMany({ name: "Joe" });
    const userfind = await User.findOne({ name: "Joe" });
    assert(userfind === null);
  });

  it("class method Delete One", async () => {
    await User.deleteOne({ name: "Joe" });
    const userfind = await User.findOne({ name: "Joe" });
    assert(userfind === null);
  });

  it("class method findOneAndRemove", async () => {
    await User.findOneAndRemove({ name: "Joe" });
    const userfind = await User.findOne({ name: "Joe" });
    assert(userfind === null);
  });


  it("class method findbyIDAndRemove", async () => {
    await User.findByIdAndRemove(joe._id);
    const userfind = await User.findOne({ name: "Joe" });
    assert(userfind === null);
  });
});
