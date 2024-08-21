import { Module } from '@nestjs/common';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [SocketModule],
})
export class AppModule {}
