import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../comments/entities/comment.entity';

@Entity({
  name: 'posts',
  schema: 'sys',
})
export class Post {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true,
  })
  id: number;

  // this is a foreign key to the users table
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  body: string;

  // its not working

  @OneToMany(() => Comment, (comment) => comment.postId, { cascade: true })
  comments: Comment[];
}
