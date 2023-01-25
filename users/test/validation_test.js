const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  let joe;
  beforeEach(async () => {
    joe = new User({ name: "Joe", postCount: 0 });
    await joe.save();
  });

  it("it requires a user name", () => {
    const user = new User({
      name: undefined,
    });
    const validationResult = user.validateSync();
    // console.log(validationResult.errors.name.messages)
    const { message } = validationResult.errors.name;
    console.log(message);
    assert(message === "Name is required.");
  });

  it("it requires a user's name longer than 2 characters", () => {
    const user2 = new User({
      name: "Al",
    });
    // console.log(user2);
    const validationResult = user2.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name must be longer than 2 characters.");
  });

  it("disallows invalid recors from being saved", async () => {
    const user = new User({
      name: "Al",
    });

    try {
      await user.save();
    } catch (validationResult) {
      const { message } = validationResult.errors.name;
      assert(message === "Name must be longer than 2 characters.");
    }
  });
});
