import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PizzaSchemas } from './schemas/pizza-schemas';
import { Model } from 'mongoose';
import { CartSchemas } from './schemas/cart-schemas';
import { MailgunService } from 'nestjs-mailgun';
import { EmailOptions } from 'nestjs-mailgun';

@Injectable()
export class PizzaService {
  constructor(
    @InjectModel(PizzaSchemas.name)
    private readonly pizzaModel: Model<PizzaSchemas>,
    @InjectModel(CartSchemas.name)
    private readonly cartModel: Model<CartSchemas>,
    private mailgunService: MailgunService,
  ) {}

  async addPizza(pizzaObj) {
    return await new this.pizzaModel({
      ...pizzaObj,
    }).save();
  }
  async findAllPizza() {
    return await this.pizzaModel.find({});
  }

  async addToCart(cartObj) {
    return await new this.cartModel({
      ...cartObj,
    }).save();
  }

  async removeFromCart(id) {
    return await this.cartModel.findByIdAndDelete({ _id: id });
  }

  async showCartItems(email) {
    return await this.cartModel.find({ email: email });
  }

  async sendEmail() {
    const domain = 'sandbox793981e4ffe0491aaa51afd79cb954dc.mailgun.org';
    const data = {
      from: 'sandbox793981e4ffe0491aaa51afd79cb954dc.mailgun.org',
      to: 'sandbox793981e4ffe0491aaa51afd79cb954dc.mailgun.org',
      subject: 'Testing Mail',
      text: 'This is a test email',
    };
    console.log(domain);
    console.log(data);
    return await this.mailgunService.createEmail(domain, data);
  }
}
