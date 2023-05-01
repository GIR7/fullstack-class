// import { Entity,ManyToOne, Property } from "@mikro-orm/core";
//
// import { User } from "./User.js";
//
// @Entity()
// export class Match{
//
//     //compsite primary key: owner&matchee
//
//     //one owner can have many matches
//     @ManyToOne( {primary:true})
//     //the person who performed the swiped right
//     owner!: User;
//
//     //one user can be matched with many others
//     @ManyToOne({primary:true})
//     //the account was swiped right on
//     matchee!: User;
//
//     @Property()
//     created_at:Date = new Date();
// }
import { Entity, Property, Unique, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { User } from "./User.js";


@Entity()
export class Match {
    
    // The person who performed the match/swiped right
    @ManyToOne({primary: true})
    owner!: User;
    
    // The account whose profile was swiped-right-on
    @ManyToOne({primary: true})
    matchee!: User;
    
    @Property()
    created_at = new Date();
    
}
