// Board Service 생성 : $nest g service boards --no-spec
import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDTO: CreateBoardDTO) {
        const {title, description } = createBoardDTO;
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string) : Board | undefined {
        const found = this.boards.find((board) => board.id === id);
        
        if(!found) {
            throw new NotFoundException(`${id}번 게시물을 찾을 수 없습니다.`);
        }
        return found;
    }

    deleteBoardById(id: string) : void {
        const found = this.getBoardById(id);
        
        if(!found) {
            throw new NotFoundException(`${id}번 게시물을 찾을 수 없습니다.`);
        }
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board | undefined{
        const board = this.getBoardById(id);
        if (!board) {
            throw new NotFoundException(`Board with id ${id} not found`);
        }
        board.status = status;
        return board;
    }
}
