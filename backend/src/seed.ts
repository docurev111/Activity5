import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { PostsService } from './posts/posts.service';
import { UserRole } from './users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const postsService = app.get(PostsService);

  try {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@wutheringwaves.com';
    const existingAdmin = await usersService.findByEmail(adminEmail);

    let admin;
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || 'admin123',
        10,
      );
      admin = await usersService.create({
        email: adminEmail,
        password: hashedPassword,
        username: process.env.ADMIN_USERNAME || 'WutheringAdmin',
        role: UserRole.ADMIN,
        bio: 'Admin and content creator for Wuthering Waves Blog',
      });
      console.log('✅ Admin user created:', admin.email);
    } else {
      admin = existingAdmin;
      console.log('ℹ️  Admin user already exists:', admin.email);
    }

    // Create sample posts
    const samplePosts = [
      {
        title: 'Welcome to Wuthering Waves Blog',
        content: `Welcome to the ultimate Wuthering Waves community hub! 

This blog is dedicated to bringing you the latest news, guides, character analyses, and tips for Wuthering Waves. Whether you're a new Rover or a seasoned veteran, you'll find valuable content here.

Stay tuned for:
- Character build guides
- Combat mechanics breakdowns
- Event coverage
- Lore discussions
- And much more!

Join our community and let's explore the world of Wuthering Waves together!`,
        coverImage: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',
        category: 'Announcements',
        tags: ['welcome', 'introduction', 'community'],
        published: true,
      },
      {
        title: 'Top 5 Characters for Beginners',
        content: `Starting your journey in Wuthering Waves? Here are the top 5 characters that will help you progress smoothly:

1. **Rover** - Your main character with versatile abilities
2. **Yangyang** - Excellent support with crowd control
3. **Baizhi** - Essential healer for team survival
4. **Chixia** - Strong DPS for early game content
5. **Sanhua** - Great sub-DPS with freeze mechanics

Each of these characters brings unique value to your team and can carry you through the early to mid-game content. Focus on building them first!`,
        coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
        category: 'Guides',
        tags: ['beginners', 'characters', 'tier-list'],
        published: true,
      },
      {
        title: 'Understanding Echo System',
        content: `The Echo system is one of the core mechanics in Wuthering Waves. Here's everything you need to know:

**What are Echoes?**
Echoes are abilities you can absorb from defeated enemies and equip to enhance your characters.

**Echo Rarity:**
- 2-star: Common echoes
- 3-star: Uncommon echoes
- 4-star: Rare echoes
- 5-star: Legendary echoes

**Tips for Echo Farming:**
1. Focus on main stats first
2. Sub-stats become important in late game
3. Match echo sets with character playstyle
4. Don't waste resources on low-rarity echoes early on

Master the Echo system to maximize your team's potential!`,
        coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
        category: 'Guides',
        tags: ['echo', 'mechanics', 'tutorial'],
        published: true,
      },
    ];

    for (const postData of samplePosts) {
      try {
        await postsService.create(postData, admin);
        console.log(`✅ Created post: ${postData.title}`);
      } catch (error) {
        console.log(`ℹ️  Post may already exist: ${postData.title}`);
      }
    }

    console.log('🎉 Seeding completed successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
