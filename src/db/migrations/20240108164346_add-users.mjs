export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("email").notNullable().unique()
    table.text("username").notNullable().unique()
    table.enu("role", ["admin", "user"]).defaultTo("user").notNullable()
    table.boolean("active").defaultTo(true).notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("users")
}
