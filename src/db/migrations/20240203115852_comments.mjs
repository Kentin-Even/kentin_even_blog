export const up = async (db) => {
  await db.schema.createTable("comments", (table) => {
    table.increments("id").primary()
    table.text("text").notNullable()
    table.integer("userId").unsigned().references("id").inTable("users")
    table.integer("postId").unsigned().references("id").inTable("posts")
    table.timestamps(true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTableIfExists("comments")
}
