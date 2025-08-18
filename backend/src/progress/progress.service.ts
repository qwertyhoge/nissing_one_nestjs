import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService){
  }

  create(createProgressDto: CreateProgressDto) {
    return this.prisma.progress.create({
      data: createProgressDto,
    })
  }

  findAll() {
    return this.prisma.progress.findMany();
  }

  findOne(id: number) {
    return this.prisma.progress.findUnique({
      where: { id },
    });
  }

  update(id: number, updateProgressDto: UpdateProgressDto) {
    return this.prisma.progress.update({
      where: { id },
      data: updateProgressDto,
    });
  }

  remove(id: number) {
    return this.prisma.progress.delete({
      where: { id },
    });
  }
}
