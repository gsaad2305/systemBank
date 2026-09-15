import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UsersService } from './users.service.js';
import { PrismaService } from '../database/prisma.service.js';

describe('UsersService', () =>{
  let userService: UsersService
  let prismaService: PrismaService
  
});
