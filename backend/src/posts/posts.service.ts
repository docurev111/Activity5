import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can create posts');
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      authorId: user.id,
    });
    return this.postsRepository.save(post);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    
    const [posts, total] = await this.postsRepository.findAndCount({
      where: { published: true },
      relations: ['author', 'reactions', 'comments'],
      order: { createdAt: 'DESC' },
      skip,
      take: limitNum,
    });

    return {
      data: posts.map(post => ({
        ...post,
        author: {
          id: post.author.id,
          username: post.author.username,
          avatar: post.author.avatar,
        },
        reactionsCount: post.reactions?.length || 0,
        commentsCount: post.comments?.length || 0,
      })),
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  async findOne(id: string, incrementViews: boolean = false): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'reactions', 'comments', 'comments.user'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Only increment views when explicitly requested
    if (incrementViews) {
      post.views += 1;
      await this.postsRepository.save(post);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, user: User): Promise<Post> {
    const post = await this.findOne(id);

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can update posts');
    }

    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async remove(id: string, user: User): Promise<void> {
    const post = await this.findOne(id);

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can delete posts');
    }

    await this.postsRepository.remove(post);
  }

  async findByCategory(category: string, page: number = 1, limit: number = 10) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    
    const [posts, total] = await this.postsRepository.findAndCount({
      where: { category, published: true },
      relations: ['author', 'reactions', 'comments'],
      order: { createdAt: 'DESC' },
      skip,
      take: limitNum,
    });

    return {
      data: posts,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  async incrementView(id: string): Promise<{ views: number }> {
    const post = await this.postsRepository.findOne({ where: { id } });
    
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.views += 1;
    await this.postsRepository.save(post);

    return { views: post.views };
  }
}
