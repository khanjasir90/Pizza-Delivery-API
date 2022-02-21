import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-auth-guard';
import { PizzaService } from './pizza.service';

@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @UseGuards(JwtAuthGuard)
  @Get('menu-items')
  getMenu() {
    return this.pizzaService.findAllPizza();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addPizza(@Body() body) {
    return await this.pizzaService.addPizza(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('cart')
  async addToCart(@Body() body) {
    return await this.pizzaService.addToCart(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-cart-items')
  async deleteFromCart(@Body() body) {
    return await this.pizzaService.removeFromCart(body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('show-cart')
  async showCart(@Body() body) {
    return await this.pizzaService.showCartItems(body.email);
  }
  @Get('email')
  async sendEmailToUser() {
    return await this.pizzaService.sendEmail();
  }
}
