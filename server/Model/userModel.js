import mongoose from "mongoose";
import validator from "validator";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email should be unique"],
    lowercase: true,
    // validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please confirm your password"],
    minlength: 3,
  },
  phoneNumber: {
    type: String,
    // required: true,
  },
  confirmPassword: {
    type: String,
    required: [true, "Password is required"],
    minlength: 3,
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "Passwords do not match",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
