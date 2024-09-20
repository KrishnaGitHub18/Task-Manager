import dbConnect from "@/lib/dbConnect";
import User from "../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

dbConnect();

export async function POST (request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);

        //user already exist or not
        const checkUserExist = await User.findOne({ email });
        if (checkUserExist){
            console.log("User Already Exists");
            return;
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword }).save();
        console.log(newUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}