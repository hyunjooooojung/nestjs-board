import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import config from 'config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  await app.listen(port ?? 3000);
  logger.log(`Application running on port ${port}`)
}
bootstrap();



/*
모듈 : @Module() 데코레이터로 주석이 달린 클래스.
- Nest가 애플리케이션 구조를 구성하는 데 사용하는 메타 데이터를 제공한다.
- 각 응용 프로그램에는 하나 이상의 모듈이 있다. 루트 모듈은 Nest가 사용하는 시작점.
- 밀접하게 관련된 기능 집합으로 구성요소를 구성하는 방법이다.(기능별로 생성)
- 기본적으로 싱글 톤이므로 여러 모듈간에 쉽게 공급자의 동일한 인스턴스를 공유할 수 있다.

컨트롤러 : 들어오는 요청을 처리하고 클라이언트에 응답을 반환한다.
- @Controller 데코레이터로 클래스를 데코레이션해 정의한다.
- 데코레이터는 인자를 Controller에 의해서 처리되는 '경로'로 받는다.

핸들러 : @Get, @Post, @Delete 등과 같은 데코레이터로 장식된 컨트롤러 클래스 내의 메서드.

Providers : Nest의 기본 개념.
- 서비스, 리포지토리, 팩토리, 헬퍼 등
- 종속성으로 주입할 수 있다.
- 객체는 서로 다양한 관계를 만들 수 있다.
- module 파일의 providers 항목 안에 해당 모듈에서 사용하고자 하는 Provider를 넣어준다.

Service : 데이터베이스 관련 로직 처리. (소프트웨어 개발 내의 공통 개념)
- @Injectable 데코레이터로 감싸져 모듈에 제공됨.
- 애플리케이션 전체에서 사용될 수 있다.
- 컨트롤러에서 데이터의 유효성을 체크하거나 데이터베이스에 아이템을 생성하는 등의 작업을 한다.
*/
