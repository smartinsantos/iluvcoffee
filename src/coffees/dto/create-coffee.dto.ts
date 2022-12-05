import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee', example: 'my-coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee', example: 'chimp-bucks' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: ['pumpkin', 'caramel'] })
  @IsString({ each: true })
  readonly flavors: string[];
}
