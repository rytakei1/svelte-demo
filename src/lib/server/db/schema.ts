import { relations } from 'drizzle-orm';
import { pgTable, integer, text, varchar, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	googleId: varchar('googleId')
});

export const usersRelations = relations(users, ({ many }) => ({
	movies: many(ratings)
}));

export const ratings = pgTable('ratings', {
	id: serial('id').primaryKey(),
	rating: integer('rating').default(0),
	movieId: integer('movie_id').notNull(),
	userId: integer('user_id')
});

export const ratingsRelations = relations(ratings, ({ one }) => ({
	user: one(users, {
		fields: [ratings.userId],
		references: [users.id]
	})
}));
