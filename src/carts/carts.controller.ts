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
    console.log("username", username);
    return this.cartsService.get(username);
  }

  @MessagePattern("carts.update")
  update(@Payload() updateCartDto: any) {
    console.log("updateCartDto", updateCartDto);
    return this.cartsService.update(updateCartDto.username, updateCartDto.carts);
  }

  @MessagePattern("carts.orders.clean")
  remove(@Payload() username: string) {
    console.log("clean cart", username);
    return this.cartsService.remove(username);
  }
}
