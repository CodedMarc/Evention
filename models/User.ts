import mongoose from "mongoose";

// export interface User {
//   name: String,
//   username: String,
//   password: String,
//   email: String,
//   avatar: any,
//   roles: any,
//   created_at: any,
//   lastActive: any,
//   friends: any,
//   settings: any
// }

const UserSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    default: false
  },
  roles: {
    type: [String],
    default: ['user']
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  friends: {
    type: [String],
    default: []
  },
  settings: {
    type: {},
    default: {
      private: false
    }
  },
});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
export default UserModel;
