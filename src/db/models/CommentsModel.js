import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"

class CommentsModel extends BaseModel {
  static tableName = "comments"

  static get relationMappings() {
    return {
      posts: {
        relation: BaseModel.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
      users: {
        relation: BaseModel.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: "comments.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default CommentsModel
