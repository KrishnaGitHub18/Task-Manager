import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username required"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Email-id required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password required"]
        }
    }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;