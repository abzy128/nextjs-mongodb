import { blogs } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
/**
 * @swagger
 * /api/blogs/{id}:
 *  get:
 *   description: Get blogs
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
export async function GET(
    request: Request,
    { params }: { params: { id: string } }) {
    const { id } = params;
    const blog = await blogs.findOne({ "_id": new ObjectId(id) });
    if (!blog) {
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
}

/**
 * @swagger
 * /api/blogs/{id}:
 *  put:
 *   description: Update a blog
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not Found
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
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }) {
    const { id } = params;
    const { title, body, author, timestamp } = await request.json();
    if (!(id && title && body && author && timestamp)) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    try {
        const dbblog = await blogs.findOne({ "_id": new ObjectId(id) });
        if (!dbblog) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        }
    }
    catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

    try {
        await blogs.updateOne({ "_id": new ObjectId(id) }, { $set: { title, body, author, timestamp } });
    } catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
}

/**
 * @swagger
 * /api/blogs/{id}:
 *  delete:
 *   description: Delete a blog
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not Found
 */
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    try {
        const dbblog = await blogs.findOne({ "_id": new ObjectId(id) });
        if (!dbblog) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        }
        await blogs.deleteOne({ "_id": new ObjectId(id) });
    }
    catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
}
