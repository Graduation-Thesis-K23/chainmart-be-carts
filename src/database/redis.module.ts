import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import type { RedisClientOptions } from "redis";

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get<string>("REDIS_HOST"));
        return {
          host: configService.get<string>("REDIS_HOST"),
          port: +configService.get<number>("REDIS_PORT"),
          // password: configService.get<string>("REDIS_PASSWORD"),
          isGlobal: true,
          // store: redisStore,
        };
      },
    }),
  ],
})
export class RedisModule {}
