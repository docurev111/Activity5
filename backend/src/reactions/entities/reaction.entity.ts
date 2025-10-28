import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

export enum ReactionType {
  LIKE = 'like',
  LOVE = 'love',
  FIRE = 'fire',
}

@Entity('reactions')
@Unique(['userId', 'postId'])
export class Reaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    default: ReactionType.LIKE,
  })
  type: ReactionType;

  @Column()
  userId: string;

  @Column()
  postId: string;

  @ManyToOne(() => User, (user) => user.reactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Post, (post) => post.reactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}
