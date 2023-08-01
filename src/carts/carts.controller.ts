import { Controller, UseFilters } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CartsService } from "./carts.service";
import { ExceptionFilter } from "src/filters/rpc-exception.filter";

@Controller()
@UseFilters(new ExceptionFilter())
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @MessagePattern("carts.get")
  get(@Payload() username: string) {
    return this.cartsService.get(username);
  }

  @MessagePattern("carts.update")
  update(@Payload() updateCartDto: any) {
    return this.cartsService.update(updateCartDto.username, updateCartDto.carts);
  }

  @MessagePattern("carts.remove")
  remove(@Payload() username: string) {
    return this.cartsService.remove(username);
  }
}
