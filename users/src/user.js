const mongoose = require("mongoose");
const PostSchema = require("./post")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer than 2 characters."
    },
  },
  likes: {
    type: Number,
    default: 0,
  },
  posts: [PostSchema]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
})

const User = mongoose.model("user", UserSchema);

module.exports = User;
