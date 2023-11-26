import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { Member } from '../entity/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    console.log(
      '🚀 ~ file: member.service.ts:21 ~ MembersService ~ create ~ createMemberDto:',
      createMemberDto,
    );
    // Validate the required fields
    if (!createMemberDto.name || !createMemberDto.email) {
      throw new BadRequestException('Name and email are required');
    }

    const member = this.memberRepository.create(createMemberDto);
    return await this.memberRepository.save(member);
  }

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  async findOne(id: number): Promise<Member> {
    return await this.memberRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException();
    }

    Object.assign(member, updateMemberDto);
    return await this.memberRepository.save(member);
  }

  async remove(id: number): Promise<void> {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException();
    }

    await this.memberRepository.remove(member);
  }
}
