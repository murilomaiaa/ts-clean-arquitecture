import { Controller, Post, Req, Res } from '@nestjs/common'
import { adaptRoute } from '../adapter/expressRouteAdapter'
import { makeSignUpController } from '../factories/signup'
@Controller('signup')
export class SignUpRoute {
  @Post()
  async signup(@Req() request, @Res() response) {
    return adaptRoute(makeSignUpController())(request, response)
  }
}
