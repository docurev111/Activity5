import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Reactions')
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add or update reaction to a post' })
  create(@Body() createReactionDto: CreateReactionDto, @CurrentUser() user: User) {
    return this.reactionsService.create(createReactionDto, user);
  }

  @Public()
  @Get('post/:postId')
  @ApiOperation({ summary: 'Get reactions for a post' })
  findByPost(@Param('postId') postId: string) {
    return this.reactionsService.findByPost(postId);
  }

  @Delete('post/:postId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Remove reaction from a post' })
  remove(@Param('postId') postId: string, @CurrentUser() user: User) {
    return this.reactionsService.remove(postId, user);
  }
}
