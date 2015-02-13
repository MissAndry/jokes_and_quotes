module PostHelper
  def no_posts?
    Post.all.empty?
  end
end

