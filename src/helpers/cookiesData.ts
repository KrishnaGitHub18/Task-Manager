import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
const TOKEN_SECRET = "abcdefghijklmnopqrstuvwxyz"; 

export const cookiesData = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, TOKEN_SECRET);
        return decodedToken;
    } catch (error) {
        console.log("Error in extracting the data", error);
    }
}