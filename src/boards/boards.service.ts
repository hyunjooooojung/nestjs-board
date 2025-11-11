// Board Service 생성 : $nest g service boards --no-spec
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDTO } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    // Service에 Repository 주입(Inject Repository to Service)
    constructor(
        private readonly BoardRepository: BoardRepository,
    ) {}

    // Create
    async createBoard(CreateBoardDTO: CreateBoardDTO, user: User) : Promise<Board> {
        return this.BoardRepository.createBoard(CreateBoardDTO, user);
    }

    // GetAll
    async getAllBoards(): Promise <Board[]> {
        return this.BoardRepository.find();
    }

    // GetAllByUser
    async getAllBoardsByUser(user: User): Promise <Board[]> {
        const query = this.BoardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });

        const boards = await query.getMany();
        return boards;
    }
    
    // GetById: typeOrm에서 제공하는 findOneBy 메서드 사용
    async getBoardById(id: number): Promise<Board> {
        const found = await this.BoardRepository.findOneBy({ id });

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        return found;
    }

    // remove : 아이템 존재 확인 + 지우기(무조건 존재해야함)
    // delete : 아이템이 존재하면 지우고 존재하지 않으면 작업X
    async deleteBoard(id: number, user: User) : Promise<void> {
        const result = await this.BoardRepository.delete({id, user});
        
        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        console.log(result);
    }

    // status patch
    async updateBoardStatus(id: number, status: BoardStatus):  Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.BoardRepository.save(board);

        return board;
    }

    /* 로컬 메모리에 데이터를 저장하고 조작하던 방식 */
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDTO: CreateBoardDTO) {
    //     const {title, description } = createBoardDTO;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    // getBoardById(id: string) : Board | undefined {
    //     const found = this.boards.find((board) => board.id === id);
        
    //     if(!found) {
    //         throw new NotFoundException(`${id}번 게시물을 찾을 수 없습니다.`);
    //     }
    //     return found;
    // }

    // deleteBoardById(id: string) : void {
    //     const found = this.getBoardById(id);
        
    //     if(!found) {
    //         throw new NotFoundException(`${id}번 게시물을 찾을 수 없습니다.`);
    //     }
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board | undefined{
    //     const board = this.getBoardById(id);
    //     if (!board) {
    //         throw new NotFoundException(`Board with id ${id} not found`);
    //     }
    //     board.status = status;
    //     return board;
    // }
}
