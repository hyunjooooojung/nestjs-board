// 컨트롤러 생성 : $nest g controller boards --no-spec
// --no-spec : 테스트 코드 생성 X
import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {}
