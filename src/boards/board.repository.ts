// TypeORM 0.3 버전 이후부터는 @EntityRepository 는 deprecated 됨!!
// import { EntityRepository, Repository } from "typeorm";
// import { Board } from "./board.entity";

// @EntityRepository(Board)
// export class BoardRepository extends Repository<Board> {

// }


//  DataSource 객체를 통해 리포지토리를 직접 가져오도록 변경된 버전
import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Board } from "./board.entity";
import { BoardStatus } from "./board-status.enum";
import { CreateBoardDTO } from "./dto/create-board.dto";
import { User } from "src/auth/user.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDTO, user: User) : Promise<Board> {
        const { title, description } = createBoardDto;
        
        const board = this.create({
            title, 
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.save(board);
        return board;
    }
}
