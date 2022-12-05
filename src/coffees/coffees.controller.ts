import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
  }

  // Testing nest-js additional functionality
  @Get('paginated')
  findAllPaginated(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns paginated coffees limit: ${limit}, offset: ${offset}`;
  }

  @Get('brands_value')
  findBrandsByValue() {
    return this.coffeesService.findCoffeeBrandsByValue();
  }

  @Get('brands_factory')
  findBrandsByFactory() {
    return this.coffeesService.findCoffeeBrandsByFactory();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const coffee = this.coffeesService.findOne('' + id);

    if (!coffee) {
      throw new NotFoundException(`coffee #${id} not found.`);
    }

    return coffee;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }

  @Post('gone')
  @HttpCode(HttpStatus.GONE)
  gone() {
    return `This action is gone! look for Http Status: ${HttpStatus.GONE}`;
  }
}
