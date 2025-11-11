import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    } // ValidationPipe : 요청이 컨트롤러에 있는 핸들러로 들어왔을 때 DTO의 유효성 체크

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialsDto);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard()) //@nestjs/passport에서 가져온 AuthGuard()
    // test(@Req() req) {
    //     console.log(req)
    // }

    // CustomDecorator 사용
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user)
    }
}
