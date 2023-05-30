import { Entity, ManyToOne } from "@mikro-orm/core";
import { DoggrCompositeEntity } from "./DoggrBaseEntity.js";
import { User } from "./User.js";
import type  {Ref} from '@mikro-orm/core'
;
@Entity()
export class Pass extends DoggrCompositeEntity{
	
	//compsite primary key: owner&passee
	@ManyToOne({primary:true})
	owner!:Ref<User>
	
	@ManyToOne({primary:true})
	passee!:Ref<User>
	
}
