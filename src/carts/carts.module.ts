import { Module } from "@nestjs/common";
import { CartsService } from "./carts.service";
import { CartsController } from "./carts.controller";
import { Cart } from "./entities/cart.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), CacheModule.register()],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
