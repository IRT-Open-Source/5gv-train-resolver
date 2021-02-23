import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  logger = new Logger(AppService.name);
  getCacheUrl(upstreamUrl: string): string {
    const url = new URL(upstreamUrl);
    const hostname = `http://${url.host}.cache.cache:8080`;
    const resolveUrl = `${hostname}${url.pathname}`;
    this.logger.debug(`Resolve: ${resolveUrl}`);
    return JSON.stringify({
      cdns: [
        {
          hostname,
          weight: 1,
        },
      ],
    });
  }
}
