// Board Module 생성 : $nest g module boards
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board])
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository], // TypeORM 0.3+부터는 BoardRepository를 Provider로 직접 등록해야함.
  exports: [BoardsService],
})
export class BoardsModule {}

