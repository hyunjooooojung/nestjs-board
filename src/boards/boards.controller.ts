// 컨트롤러 생성 : $nest g controller boards --no-spec
// --no-spec : 테스트 코드 생성 X
import { Controller, Get } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}


    @Get('/')
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }
}
