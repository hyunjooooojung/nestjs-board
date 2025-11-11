// 컨트롤러 생성 : $nest g controller boards --no-spec
// --no-spec : 테스트 코드 생성 X
import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import type { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // 토큰 확인 후 접근 권한 부여해줌.
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Post()
    @UsePipes(ValidationPipe) // 핸들러 레벨의 pipe
    createBoard(
        @Body() createBoardDTO: CreateBoardDTO,
        @GetUser() user: User
    ): Promise<Board> {
        return this.boardsService.createBoard(createBoardDTO, user);
    }

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get('/users')
    getAllBoardsByUser(
        @GetUser() user: User
    ): Promise<Board[]> {
        return this.boardsService.getAllBoardsByUser(user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    // ParseIntPipe : 파마리터가 JavaScript의 Integer 타입으로 들어왔는지 확인해주는 pipe
    deleteBoard(@Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
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
