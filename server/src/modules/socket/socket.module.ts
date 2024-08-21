import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';

@Module({
  providers: [SocketService, SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
