import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { HashingService } from '../common/hashing/hashing.service.js';
@Injectable()
export class UsersService {
constructor(
  private readonly prismaService: PrismaService,
  private readonly hashingService: HashingService
){}
  async create(createUserDto: CreateUserDto) {
    const emailExisted = await this.prismaService.user.findUnique({ where: { email: createUserDto.email } });
    if (emailExisted) throw new ConflictException('EMAIL EXISTED');

    const passwordHash = await this.hashingService.hash(createUserDto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: passwordHash,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return newUser;
  }

  findAll() {
    return this.prismaService.user.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
