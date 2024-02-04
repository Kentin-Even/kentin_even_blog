export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id").primary()
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.integer("userId").unsigned().references("id").inTable("users")
    table.timestamps(true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTableIfExists("posts")
}
