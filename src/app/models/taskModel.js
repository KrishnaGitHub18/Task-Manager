import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            // required: [true, "Username required"]
        },
        title: {
            type: String,
            required: [true, "Title required"]
        },
        description: {
            type: String,
            required: [false]
        },
        status: {
            type: String,
            enum: ["To Do", "In Progress", "Completed"],
            required: true
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            required: true
        },
        dueDate: {
            type: Date,
            required: false
        }
    }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
