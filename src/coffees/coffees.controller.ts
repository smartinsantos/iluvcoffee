import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all the coffees';
  }

  @Get('paginated')
  findAllPaginated(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns paginated coffees limit: ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  findOne(@Param() params) {
    const { id } = params;

    return `This action returns coffee with id: ${id}`;
  }

  @Post()
  create(@Body() body) {
    return `This action returns the passed body: ${JSON.stringify(
      body,
      null,
      2,
    )}`;
  }

  @Post('gone')
  @HttpCode(HttpStatus.GONE)
  gone() {
    return `This action is gone! look for Http Status: ${HttpStatus.GONE}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates coffee with id: ${id} with body ${JSON.stringify(
      body,
      null,
      2,
    )}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action deletes coffee with id: ${id}`;
  }
}
