const mongoose = require("mongoose");
const { notificationSchema } = require("./notificationSchema");
const { autoIncrement } = require("mongoose-plugin-autoinc");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "Please Type A User Name!"],
      minlength: 3,
    },

    email: {
      type: String,
      required: [true, "Please Type An Email!"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please Enter A Valid Email!"],
    },

    password: {
      type: String,
      required: [true, "Please Type A Password!"],
    },

    phone: {
      type: String,
      required: [true, "Please Enter Phone Number!"],
      unique: true,
      match: [/^[6-9]\d{9}$/, "Please Enter Valid Indian Phone Number"],
    },

    full_addresse: {
      type: String,
      required: [true, "Please Type Address!"],
    },

    zip_code: {
      type: String,
      required: [true, "Please Enter PIN Code!"],
      match: [/^\d{6}$/, "Please Enter Valid 6-digit PIN Code"],
    },

    role: {
      type: String,
      default: "Client",
      immutable: true,
    },

    user_status: {
      type: Number,
      default: 0,
    },

    no_of_account: {
      type: Number,
      default: 0,
      max: [3, "Maximum 3 accounts allowed"],
    },

    accounts: [String],
    notifications: [notificationSchema],
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

// Duplicate key handler
userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    next(new Error(`${field} already exists`));
  } else {
    next();
  }
});

// Auto increment
userSchema.plugin(autoIncrement, {
  model: "User",
  startAt: 2525500300,
  incrementBy: 1,
});

module.exports = mongoose.model("User", userSchema);
