import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  createdAt: integer({ mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  email: text().notNull().unique(),
  id: integer().primaryKey({ autoIncrement: true }),
  passwordHash: text().notNull(),
  screenName: text().notNull(),
  screenNameKey: text().notNull().unique(),
});
