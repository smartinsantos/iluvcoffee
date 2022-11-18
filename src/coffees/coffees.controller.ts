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

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll() {
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params) {
    const { id } = params;

    const coffee = this.coffeesService.findOne(id);

    if (!coffee) {
      throw new NotFoundException(`coffee #${id} not found.`);
    }

    return coffee;
  }

  @Post()
  create(@Body() body) {
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }

  // Testing nest-js additional functionality
  @Get('paginated')
  findAllPaginated(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns paginated coffees limit: ${limit}, offset: ${offset}`;
  }

  @Post('gone')
  @HttpCode(HttpStatus.GONE)
  gone() {
    return `This action is gone! look for Http Status: ${HttpStatus.GONE}`;
  }
}
