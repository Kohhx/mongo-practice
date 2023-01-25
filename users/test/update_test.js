const assert = require("assert");
const User = require("../src/user");

describe("Updating Records", () => {
  let joe;
  beforeEach(async () => {
    joe = new User({ name: "Joe", postCount: 0});
    await joe.save();
  });

  // Create a help assert function
  const assertName = async () => {
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === "Koh");
    // console.log(users)
  };

  it("model instance mutate and save", async () => {
    const user = await User.findOne({ name: "Joe" });
    user.name = "Koh";
    await user.save();
    const userfind = await User.findOne({ name: "Koh" });
    assert(userfind.name === "Koh");
  });

  it("model instance set and save", async () => {
    const user = await User.findOne({ name: "Joe" });
    user.set("name", "Koh");
    await user.save();
    await assertName();
  });

  it("model instance can update", async () => {
    const user = await User.findOne({ name: "Joe" });
    await user.update({ name: "Koh" });
    await assertName();
  });

  it("model instance can updateOne", async () => {
    const user = await User.findOne({ name: "Joe" });
    await user.updateOne({ name: "Koh" });
    await assertName();
  });

  it("Class can updateOne", async () => {
    await User.updateOne({ name: "Joe" }, { name: "Koh" });
    await assertName();
  });

  it("Class can updateMany", async () => {
    await User.updateMany({ name: "Joe" }, { name: "Koh" });
    await assertName();
  });

  it("Class can FindOne and Update", async () => {
    await User.findOneAndUpdate({ name: "Joe" }, { name: "Koh" });
    await assertName();
  });

  it("Class can Find By ID and Update", async () => {
    await User.findByIdAndUpdate( joe._id, { name: "Koh" });
    await assertName();
  });

  it("Can increment by 1", async()=>{
      await User.updateMany({name:"Joe"}, { $inc: { postCount: 1}})
     const user = await User.findOne({name: "Joe"});
     assert(user.postCount === 1)

  })

});
