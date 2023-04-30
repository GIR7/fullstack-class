import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../entities/User.js';

export class UserSeeder extends Seeder {

  //make some defualt data to db table
  async run(em: EntityManager): Promise<void> {
    em.create(User,{
      name: "Spot",
      email:"spot@email.com",
      petType:"Cat"
    })
  }

}
