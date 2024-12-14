import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SuppliesModule } from './supplies/supplies.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { PricingModule } from './pricing/pricing.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BusinessModule } from './business/business.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    SuppliesModule,
    ProductsModule,
    SalesModule,
    PricingModule,
    UsersModule,
    BusinessModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
