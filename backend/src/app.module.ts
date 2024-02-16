import { Module } from '@nestjs/common';
import { PublisherModule } from './publisher/publisher.module';
import { DomainModule } from './domain/domain.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PublisherModule,
    DomainModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
