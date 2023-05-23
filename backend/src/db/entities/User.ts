import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { DoggrBaseEntity } from "./DoggrBaseEntity.js";
import { Match } from "./Match.js";
import { SoftDeletable } from "mikro-orm-soft-delete";


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
	/* HW 1 NOTE!  We do NOT add Messages here!  This is the reason
	some of you needed Rel<> in your submission.  I gave an
	exhaustive explanation in Discord here:
	https://discord.com/channels/1092372291112931330/1092372291670786110/1103471051926667384
 */
}
