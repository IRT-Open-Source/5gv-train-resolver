import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCacheUrl(@Query('url') upstreamUrl: string): string {
    return this.appService.getCacheUrl(upstreamUrl);
  }
}
