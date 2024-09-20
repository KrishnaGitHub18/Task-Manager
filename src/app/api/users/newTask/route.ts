import dbConnect from "@/lib/dbConnect";
import Task from "@/app/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, title, description, dueDate, priority, status } = reqBody;
        console.log(reqBody);

        const newTask = await new Task({ username, title, description, dueDate, priority, status }).save();
        console.log(newTask);

        const response =  NextResponse.json({
            message: "Task created successfully",
            success: true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
