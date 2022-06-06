import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);
const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, slug: "title", unique: true },
    body: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
