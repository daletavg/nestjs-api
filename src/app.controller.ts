import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/storage/:folder/:image')
  seeUploadedFile(@Param('folder') folder, @Param('image') image, @Res() res) {
    const path = './storage/' + folder;
    return res.sendFile(image, { root: path });
  }
}
