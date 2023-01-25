const assert = require("assert");
const User = require("../src/user");

describe("Virtual Type test", () => {
  it("postCount returns number of posts", async () => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "Post Title" }],
    });
    await joe.save();
    const user = await User.findOne({ name: "Joe" });
    assert(user.postCount === 1)
  });
});
