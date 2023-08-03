import { CacheModule, CacheStore } from "@nestjs/cache-manager";
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: config.get("REDIS_HOST"),
            port: +config.get("REDIS_PORT"),
          },
          // password: config.get("REDIS_PASSWORD"),
        });

        return {
          store: store as unknown as CacheStore,
          isGlobal: true,
        };
      },
    }),
  ],
})
export class RedisModule {}
