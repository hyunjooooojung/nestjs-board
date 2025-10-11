// 컨트롤러 생성 : $nest g controller boards --no-spec
// --no-spec : 테스트 코드 생성 X
import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import type { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Post()
    @UsePipes(ValidationPipe) // 핸들러 레벨의 pipe
    createBoard(
        @Body() createBoardDTO: CreateBoardDTO
    ): Promise<Board> {
        return this.boardsService.createBoard(createBoardDTO);
    }

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    // ParseIntPipe : 파마리터가 JavaScript의 Integer 타입으로 들어왔는지 확인해주는 pipe
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus, // 파라미터 레벨 pipe
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }

    /* 로컬 메모리에 데이터를 저장하고 조작하던 방식 */
    // @Get('/')
    // getAllBoards(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe) // 핸들러 레벨의 pipe
    // createBoards(
    //     @Body() createBoardDTO: CreateBoardDTO
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDTO);
    // }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board | undefined {
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoardById(@Param('id') id: string): void {
    //     this.boardsService.deleteBoardById(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus, // 파라미터 레벨 pipe
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}
