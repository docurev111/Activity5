import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reaction } from './entities/reaction.entity';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private reactionsRepository: Repository<Reaction>,
  ) {}

  async create(createReactionDto: CreateReactionDto, user: User): Promise<Reaction> {
    // Check if user already reacted to this post
    const existingReaction = await this.reactionsRepository.findOne({
      where: {
        userId: user.id,
        postId: createReactionDto.postId,
      },
    });

    if (existingReaction) {
      // Update existing reaction
      existingReaction.type = createReactionDto.type;
      return this.reactionsRepository.save(existingReaction);
    }

    const reaction = this.reactionsRepository.create({
      ...createReactionDto,
      userId: user.id,
    });
    return this.reactionsRepository.save(reaction);
  }

  async findByPost(postId: string) {
    const reactions = await this.reactionsRepository.find({
      where: { postId },
      relations: ['user'],
    });

    // Group reactions by type
    const grouped = reactions.reduce((acc, reaction) => {
      if (!acc[reaction.type]) {
        acc[reaction.type] = [];
      }
      acc[reaction.type].push({
        id: reaction.user.id,
        username: reaction.user.username,
        avatar: reaction.user.avatar,
      });
      return acc;
    }, {});

    return {
      total: reactions.length,
      byType: grouped,
    };
  }

  async remove(postId: string, user: User): Promise<void> {
    const reaction = await this.reactionsRepository.findOne({
      where: {
        userId: user.id,
        postId,
      },
    });

    if (!reaction) {
      throw new NotFoundException('Reaction not found');
    }

    await this.reactionsRepository.remove(reaction);
  }

  async getUserReaction(postId: string, userId: string): Promise<Reaction | null> {
    return this.reactionsRepository.findOne({
      where: {
        userId,
        postId,
      },
    });
  }
}
