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

    em.create(User,{
      name: "Adam",
      email:"Adam@email.com",
      petType:"Cat"
    })

    em.create(User,{
      name: "Hammer",
      email:"Hammer@email.com",
      petType:"Cat"
    })

    em.create(User,{
      name: "Ady",
      email:"Ady@email.com",
      petType:"dog"
    })

  }
}
