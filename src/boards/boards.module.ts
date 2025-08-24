// Board Module 생성 : $nest g module boards
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';

@Module({
  controllers: [BoardsController]
})
export class BoardsModule {}

