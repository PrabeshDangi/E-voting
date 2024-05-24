import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    address: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (value) {
          if (value.endsWith("@xyz.voter.co")) {
            this.role = "voter";
            return true;
          } else if (value.endsWith("@abc.admin.co")) {
            this.role = "admin";
            return true;
          } else {
            throw new Error("Invalid email domain");
          }
        },
        message: "Invalid email domain",
      },
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["male", "female", "other"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
    },
    voterUuid: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 15);
  }

  if (this.dob) {
    const today = new Date();
    const birthDate = new Date(this.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthsDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthsDiff < 0 ||
      (monthsDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      return next(new Error("User must be at least 18 years old to sign up"));
    }
    this.age = age;
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
