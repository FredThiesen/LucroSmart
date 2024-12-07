import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuppliesModule } from './supplies/supplies.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { PricingModule } from './pricing/pricing.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    SuppliesModule,
    ProductsModule,
    SalesModule,
    PricingModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
