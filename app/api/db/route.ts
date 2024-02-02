import { dbClient } from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
/**
 * @swagger
 * /api/db:
 *  get:
 *   description: Get database connection
 *   responses:
 *    200:
 *     description: Success
 *   500:
 *     description: Internal server error
 */
export async function GET(
    request: Request) {
    try{
        await dbClient.connect();
        await dbClient.db("blogdb").command({ ping: 1 });
    }catch(e){
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Database connected" }, { status: 200 });
}