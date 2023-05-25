import type { EntityManager,Dictionary } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User,UserRole} from "../entities/User.js";
import bcrypt from "bcrypt";


export class UserSeeder extends Seeder {

  async run(em: EntityManager,context:Dictionary): Promise<void> {
    
    //number of salt round: 10
    const hashedPw = await bcrypt.hash("password", 10);
    
    //other seeder can also use(share) these users
     context.user1=
      em.create(User, {
      name: "Spot",
      email: "email@email.com",
      password: hashedPw,
      petType: "Dog",
        role: UserRole.ADMIN,
    });
    
     context.user2=
      em.create(User, {
      name: "Dogbert",
      email: "email2@email.com",
      password: hashedPw,
      petType: "Dog",
        role: UserRole.USER,
    });
     context.user3=
      em.create(User, {
      name: "Doglord",
      email: "email3@email.com",
      password: hashedPw,
      petType: "Dog",
        role: UserRole.USER,
    });
    
    context.user4=
      em.create(User, {
      name: "NotaDog",
      email: "email4@email.com",
      password: hashedPw,
      petType: "Cat",
        role: UserRole.USER,
    });
  }

}
