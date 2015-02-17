class Comment < ActiveRecord::Base
	include PostCommentLibrary

  belongs_to :user
  has_many   :votes, as: :voteable

  belongs_to :commentable, polymorphic: true
  has_many   :comments, as: :commentable

  validates_length_of :text, minimum: 1

  default_scope { order(vote_total: :desc) }

  def author
    self.user.username
  end

  def depth(comment=self)
    return parent_count if comment.commentable.is_a? Post

    increase_parent_count
    new_comment = comment.commentable
    depth(new_comment)
  end

  def parent_count
    @parent_count ||= 0
  end

  def increase_parent_count
    @parent_count = parent_count
    @parent_count += 1
  end

  def has_comments?
    !self.comments.empty?
  end

  def stringify_class
    self.class.to_s
  end
end
