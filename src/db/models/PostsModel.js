import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"
import CommentsModel from "@/db/models/CommentsModel"


class PostsModel extends BaseModel {
  static tableName = "posts"

  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
      comments : {
        relation: BaseModel.HasManyRelation,
        modelClass: CommentsModel,
        join: {
          from: "posts.id",
          to: "comments.postId"
        }
      }
    }
  }
}

export default PostsModel