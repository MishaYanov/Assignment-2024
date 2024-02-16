import { Module } from "@nestjs/common";
import { PublisherController } from "./publisher.controller";
import { PublisherService } from "./publisher.service";
import { Prisma } from "@prisma/client";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PublisherController],
  providers: [PublisherService],
})
export class PublisherModule {
  constructor() {}
}