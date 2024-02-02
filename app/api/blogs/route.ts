import { blogs } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/blogs:
 *  post:
 *   description: Create a blog
 *   responses:
 *    200:
 *     description: Success
 *   500:
 *     description: Internal server error
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       title:
 *        type: string
 *       body:
 *        type: string
 *       author:
 *        type: string
 *       timestamp:
 *        type: string
 */
export async function POST(
    request: Request) {
    const blog = await request.json();
    if (!(blog.title && blog.body && blog.author && blog.timestamp)) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    try {
        const result = await blogs.insertOne(blog);
        if (!result) {
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/blogs:
 *  get:
 *   description: Get blogs
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Internal server error
 */
export async function GET(
    request: Request) {
    try {
        const blog = await blogs.find().toArray();
        if (!blog) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        }
        return NextResponse.json(blog, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}