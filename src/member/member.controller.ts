import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MembersService } from './member.service';
import { CreateMemberDto } from '../dto/create-member.dto';
import { Member } from '../entity/member.entity';

@Controller('member')
export class MemberController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async getAllMembers(): Promise<Member[]> {
    return await this.membersService.findAll();
  }

  @Get(':id')
  async getMember(@Param('id') id: number): Promise<Member> {
    return await this.membersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMember(
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<Member> {
    return await this.membersService.create(createMemberDto);
  }
}
