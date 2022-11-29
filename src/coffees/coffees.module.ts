import { TypeOrmModule } from '@nestjs/typeorm';
import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesService } from 'src/coffees/coffees.service';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import {
  COFFEE_BRANDS_BY_FACTORY,
  COFFEE_BRANDS_BY_FACTORY_2,
  COFFEE_BRANDS_BY_VALUE,
  COFFEE_BRANDS_VALUES,
} from 'src/coffees/coffees.contants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from 'src/coffees/coffees.config';

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return COFFEE_BRANDS_VALUES;
  }
}

@Module({
  imports: [
    ConfigModule.forFeature(coffeesConfig),
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
  ],
  exports: [CoffeesService],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory, // <- notice that we need to list this provider to be able to use it below
    {
      inject: [CoffeeBrandsFactory],
      provide: COFFEE_BRANDS_BY_FACTORY,
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(),
    },
    {
      // another way of achieving the same result using factory
      provide: COFFEE_BRANDS_BY_FACTORY_2,
      useFactory: () => COFFEE_BRANDS_VALUES,
    },
    {
      provide: COFFEE_BRANDS_BY_VALUE,
      useFactory: () => COFFEE_BRANDS_VALUES,
    },
  ],
})
export class CoffeesModule {}
