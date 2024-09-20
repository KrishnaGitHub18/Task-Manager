import dbConnect from "@/lib/dbConnect";
import User from "../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "abcdefghijklmnopqrstuvwxyz"; 

dbConnect();

export async function POST (request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        const userCheck = await User.findOne({email});
        if (!userCheck){
            return NextResponse.json({error: "Invalid Credentials"}, {status: 400});
        }
        const userPasswordCheck = await bcryptjs.compare(password, userCheck.password);

        if (!userPasswordCheck){
            return NextResponse.json({error: "Invalid Password"}, {status: 400});
        }

        const tokenData = {id: userCheck._id, username: userCheck.username};
        const token = await jwt.sign(tokenData, TOKEN_SECRET, {expiresIn: "1d"});
        const response = NextResponse.json({messsage: "Login Successful", success: true});
        response.cookies.set("token", token, {httpOnly: true});

        return response;


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}