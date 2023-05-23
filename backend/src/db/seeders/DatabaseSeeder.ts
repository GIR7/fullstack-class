import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserSeeder } from './UserSeeder.js';
import { MessageSeeder } from "./MessageSeeder.js";

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    //calls "run" func in UserSeeder.ts to create some data
    return this.call(em,[
      UserSeeder,
      MessageSeeder
    ]);
  }
}
