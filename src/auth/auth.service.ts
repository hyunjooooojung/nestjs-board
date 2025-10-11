import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    // Service에 Repository 주입(Inject Repository to Service)
    constructor(
        private readonly UserRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    // 회원가입
    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<User> {
        return this.UserRepository.createUser(authCredentialsDto);
    }

    // 로그인
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.UserRepository.findOneBy({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 (Secret + Payload)
            const paylaod = { username };
            const accessToken = await this.jwtService.sign(paylaod);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed')
        }
    }
}
