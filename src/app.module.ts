import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { configValidationSchema } from "./config/validate-env";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CartsModule } from "./carts/carts.module";
import { PostgresModule } from "./database/postgres.module";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "./database/redis.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env", `.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    CartsModule,
    PostgresModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
