import { PrismaClient } from "@prisma/client";
import { Get, Post, Route, Body, Tags } from "tsoa";
import prisma from "../../prisma/client";

interface CreateUserRequest {
    name: string;
    email: string;
}

interface UserResponse {
    id: number;
    name: string;
    email: string;
    posts: {
      id: number;
      title: string;
      content: string;
      userId: number;
    }[];
}

@Route("users")
export class UserController {
    @Get("/")
    async getUsers() {
        return prisma.user.findMany({
            include: { posts: true }
        })
    }

    @Post("/")
    async createUser(@Body() request: CreateUserRequest) {
        return prisma.user.create({ 
            data: request
        });
    }
}
