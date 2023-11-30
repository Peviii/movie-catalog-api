import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({
    summary: 'Login de usuarios, para adquirir a bearer token de autorização',
  })
  @ApiBody({})
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async Login(@Request() req: any) {
    return await this.authService.login(req.user);
  }
}
