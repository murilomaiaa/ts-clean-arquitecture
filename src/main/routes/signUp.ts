import { Controller, Post } from '@nestjs/common'

@Controller('signup')
export class SignUpRoute {
  @Post()
  signup() {
    return {}
  }
}
