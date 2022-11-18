import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';

// import { IsString } from 'class-validator';
//
// export class UpdateCoffeeDto {
//   @IsString()
//   readonly name?: string;
//   @IsString()
//   readonly brand?: string;
//   @IsString({ each: true })
//   readonly flavors?: string[];
// }

// -> this one liner does the same thing as the code above
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
