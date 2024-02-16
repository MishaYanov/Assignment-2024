import { Module } from '@nestjs/common';
import { PublisherModule } from './publisher/publisher.module';
import { DomainModule } from './domain/domain.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PublisherModule,
    DomainModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
