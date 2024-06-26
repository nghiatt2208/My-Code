import mongoose from "mongoose";
const AuthSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    passwords: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);
const AuthModel = mongoose.model("user", AuthSchema);
export default AuthModel;
