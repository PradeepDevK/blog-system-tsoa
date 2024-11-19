import { PrismaClient } from "@prisma/client";
import { Get, Post, Route, Body, Tags } from "tsoa";
import prisma from "../../prisma/client";

interface CreatePostRequest {
    title: string;
    content: string;
    userId: number;
    categoryIds: number[];
}

@Route("posts")
export class PostController {
    @Get("/")
    async getPosts() {
        return prisma.post.findMany({
        include: { user: true, categories: true },
        });
    }

    @Post("/")
    async createPost(@Body() request: CreatePostRequest) {
        const { title, content, userId, categoryIds } = request;
        return prisma.post.create({
            data: {
                title,
                content,
                userId,
                categories: {
                    connect: categoryIds.map((id) => ({ id })),
                }
            },
            include: { categories: true },
        });
    }
}