import { PrismaClient } from "@prisma/client";
import { Get, Post, Route, Body } from "tsoa";
import prisma from "../../prisma/client";

interface CreateCategoryRequest {
    name: string;
}

@Route("categories")
export class CategoryController {
    @Get("/")
    async getCategories() {
        return prisma.category.findMany({
            include: { posts: true },
        });
    }

    @Post("/")
    async createCategory(@Body() request: CreateCategoryRequest) {
        return prisma.category.create({
            data: request,
        });
    }
}