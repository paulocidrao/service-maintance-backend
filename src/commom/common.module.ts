import { Module } from '@nestjs/common';
import { HashServer } from './Hash/hashService';
import { HashingService } from './Hash/hashing.service';

@Module({
  providers: [
    {
      provide: HashServer,
      useClass: HashingService,
    },
  ],
  exports: [HashServer],
})
export class CommonModule {}
