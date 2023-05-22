import type { EntityManager,Dictionary } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../entities/User.js";
import bcrypt from "bcrypt";


export class UserSeeder extends Seeder {

  async run(em: EntityManager,/*context:Dictionary*/): Promise<void> {
    
    const hashedPw = await bcrypt.hash("password", 10);
    
    // context.user1=
      em.create(User, {
      name: "Spot",
      email: "email@email.com",
      password: hashedPw,
      petType: "Dog"
    });
    
    // context.user2=
      em.create(User, {
      name: "Dogbert",
      email: "email2@email.com",
      password: hashedPw,
      petType: "Dog"
    });
    
    // context.user3=
      em.create(User, {
      name: "Doglord",
      email: "email3@email.com",
      password: hashedPw,
      petType: "Dog"
    });
    
    // context.user4=
      em.create(User, {
      name: "NotaDog",
      email: "email4@email.com",
      password: hashedPw,
      petType: "Cat"
    });
  }

}
