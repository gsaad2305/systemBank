import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service.js';
import { PrismaService } from '../database/prisma.service.js';
import { HashingService } from '../common/hashing/hashing.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import {vi} from 'vitest';

describe('UsersService', () =>{
  //  Variáveis do serviços que serão utilizados no testes
  let usersService: UsersService
  let hashService: HashingService;
  let prismaService: PrismaService
  const createUserDto: CreateUserDto = {
    name: "Ame",
    password: "124356",
    email: "marsi32a@gmail.com",
  }
  //Executar antes
  beforeEach(async ()=>{
    const module:TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
         useValue:{
          user:{
              create: vi.fn(),
              findUnique: vi.fn()
          }
          }
        },
        {
          provide:HashingService,
          useValue:{
            hash: vi.fn(),
          },
        }
      ]
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
    hashService = module.get<HashingService>(HashingService);

  });

  describe('create',()=>{
    it('create New User',async ()=>{
      const passwodHash = '322222';
      const newUser = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: passwodHash,
      };

      vi.spyOn(prismaService.user,'create').mockResolvedValue(newUser as any);
      vi.spyOn(hashService, 'hash').mockResolvedValue(passwodHash);
      vi.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null)

      const result = await usersService.registerUser(createUserDto)
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where:{
          email: createUserDto.email
        }
      });

      expect(hashService.hash).toHaveBeenCalledWith(createUserDto.password)
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          password: passwodHash
        },
        select:{
          name:true,
          email:true
        }
      });
      expect(result).toEqual(newUser);
    });
  })
});
