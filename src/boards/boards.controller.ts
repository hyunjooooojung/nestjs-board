// 컨트롤러 생성 : $nest g controller boards --no-spec
// --no-spec : 테스트 코드 생성 X
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import type { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}


    @Get('/')
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post()
    createBoards(
        @Body() createBoardDTO: CreateBoardDTO
    ): Board {
        return this.boardsService.createBoard(createBoardDTO);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board | undefined {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id') id: string): void {
        this.boardsService.deleteBoardById(id);
    }

    @Patch('/:id')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status') status: BoardStatus,
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
