import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { DoggrBaseEntity } from "./DoggrBaseEntity.js";
import { Match } from "./Match.js";
import { SoftDeletable } from "mikro-orm-soft-delete";

import { Enum } from "@mikro-orm/core";
import { Message } from "./Message.js";

export enum UserRole {
	ADMIN = 'Admin',
	USER = 'User'
}

// https://github.com/TheNightmareX/mikro-orm-soft-delete
// Yes it's really that easy.
@SoftDeletable(() => User, "deleted_at", () => new Date())
@Entity({ tableName: "users"})
export class User extends DoggrBaseEntity {
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string;
	
	@Property()
	password!: string;
	
	@Property()
	petType!: string;
	
	@Enum(() => UserRole)
	role!: UserRole; // string enum
	
	
	//These do NOT exist in the db itself, these fields are derived fields.
	@OneToMany(
		() => Match,
		match => match.owner,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	matches!: Collection<Match>;
	
	@OneToMany(
		() => Match,
		match => match.matchee,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	matched_by!: Collection<Match>;
	
	// Orphan removal used in our Delete All Sent Messages route to single-step remove via Collection
	@OneToMany(
		() => Message,
		message => message.sender,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	messages_sent!: Collection<Message>;
	
	@OneToMany(
		() => Message,
		message => message.receiver,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	messages_received!: Collection<Message>;
	
}
