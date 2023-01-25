const assert = require("assert");
const User = require("../src/user");

describe("Sub Documents", () => {
  it("can create a subdocument", async () => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "post1" }],
    });

    await joe.save();
    const user = await User.findOne({name: "Joe"})
    assert(user.posts[0].title === "post1")
  });

  it("can add subdocuments to an existing record", async () => {
    const joe = new User({
      name: "Joe",
      posts: [],
    });
    await joe.save();

    let user;
    user = await User.findOne({name: "Joe"})
    user.posts.push({title: 'New Post'})
    await user.save();
    user = await User.findOne({name: "Joe"})
    assert(user.posts[0].title === "New Post")
  });

  // Special mongoose remove function
  it("can remove existing subdocuments", async () => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "post1" }],
    });
    await joe.save();

    let user;
    user = await User.findOne({name: "Joe"})
    user.posts[0].remove();
    await user.save();
    user = await User.findOne({name: "Joe"})
    assert(user.posts.length === 0)
  });
});
