import { cookiesData } from "@/helpers/cookiesData";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/app/models/userModel";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function GET (request: NextRequest){
    try {
        const cookieSavedData = await cookiesData(request);
        return NextResponse.json({cookieSavedData});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}