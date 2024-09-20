import dbConnect from "@/lib/dbConnect";
import Task from "@/app/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        const userTasks = await Task.find({ username });
        const response = NextResponse.json({
            message: "Task data fetched successfully",
            userTasks
        }, { status: 200 });
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
