import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import {
  COFFEE_BRANDS_BY_FACTORY,
  COFFEE_BRANDS_BY_VALUE,
} from './coffees.contants';
import coffeesConfig from './coffees.config';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        { provide: COFFEE_BRANDS_BY_VALUE, useValue: {} },
        { provide: COFFEE_BRANDS_BY_FACTORY, useValue: {} },
        { provide: coffeesConfig.KEY, useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the coffee object', async () => {
      const coffeeId = '1';
      const expectedCoffee = {};
      coffeeRepository.findOne.mockReturnValue(expectedCoffee);
      const coffee = await service.findOne(coffeeId);
      expect(coffee).toEqual(expectedCoffee);
    });

    it('should throw the "NotFoundException"', async () => {
      const coffeeId = '1';
      const expectedCoffee = null;
      coffeeRepository.findOne.mockReturnValue(expectedCoffee);
      try {
        await service.findOne(coffeeId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Coffee #${coffeeId} not found.`);
      }
    });
  });
});
