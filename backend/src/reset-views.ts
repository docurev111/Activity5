import { DataSource } from 'typeorm';
import { Post } from './posts/entities/post.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  entities: [Post],
  synchronize: false,
});

async function resetViews() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const postRepository = AppDataSource.getRepository(Post);
    
    // Reset all post views to 0
    await postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ views: 0 })
      .execute();

    console.log('✅ All post view counts have been reset to 0');

    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error resetting views:', error);
    process.exit(1);
  }
}

resetViews();
