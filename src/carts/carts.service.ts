import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Cart } from "./entities/cart.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class CartsService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async healthCheck() {
    return "carts service is working";
  }

  async get(username: string) {
    // if not exist in redis, get from db

    const cart: string = await this.cacheManager.get(username);

    if (cart) {
      console.log("from redis");
      return JSON.parse(cart);
    }

    const result = await this.cartRepository.findOneBy({ username });

    if (!result) {
      console.log("empty carts from db");
      return [];
    }

    const carts = result.carts;

    this.cacheManager.set(username, carts);

    console.log("from db");

    return JSON.parse(carts);
  }

  async update(username: string, carts: string) {
    // update db and emit to kafka for update redis
    // create or update

    const newCart = this.cartRepository.create({
      username,
      carts,
    });

    const result = await this.cartRepository.save(newCart);

    // update redis here
    this.cacheManager.set(username, carts);

    return JSON.parse(result.carts);
  }

  async remove(username: string) {
    // remove from db and emit to kafka for remove from redis
    const result = await this.cartRepository.delete({ username });

    // remove from redis here
    this.cacheManager.del(username);

    if (!result.affected) {
      throw new BadRequestException("username not have carts");
    }

    return {
      status: "success",
    };
  }
}
