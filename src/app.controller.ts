import { Controller, Get, Req, Res } from "@nestjs/common";

@Controller()
export class AppController {

  @Get()
  redirect(@Res() res) {
    return res.redirect('/swagger');
  }

  @Get("test")
  test() {
    return { message: 'Oh, hi Mark!' };
  }
}
