// 컨트롤러 생성 : $nest g controller boards --no-spec
// --no-spec : 테스트 코드 생성 X
import { Controller, Get, Post, Body } from '@nestjs/common';
import type { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}


    @Get('/')
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post()
    createBoards(
        @Body('title') title: string,
        @Body('description') description: string
    ): Board {
        return this.boardsService.createBoard(title, description);
    }
}
