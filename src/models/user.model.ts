import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

interface IUser extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: 6,
    },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email },
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRY as string,
    }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRY as string,
    }
  );
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
