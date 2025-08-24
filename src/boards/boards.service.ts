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
        return this.boards.find((board) => board.id === id);
    }

    deleteBoardById(id: string) : void {
        this.boards = this.boards.filter((board) => board.id !== id);
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
