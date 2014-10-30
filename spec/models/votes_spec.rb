require 'rails_helper'

describe Vote do
  let(:vote) { Vote.new }
  
  let(:post) { Post.new }
  let(:current_user) { User.new }

  before do 
    allow(post).to receive(:id).and_return(1)
    allow(post).to receive(:user).and_return(current_user)
  end

  describe '#upvote' do 
    it 'should change the value to 1' do
      expect{ vote.upvote }.to change{ vote.value }.by(1)
    end

    it 'should not change the value more than once' do
      vote.upvote
      expect{ vote.upvote }.not_to change{ vote.value }
    end
  end

  describe '#downvote' do
    it 'should change the value to -1' do
      expect{ vote.downvote }.to change{ vote.value }.by(-1)
    end

    it 'should not change the value more than once' do
      vote.downvote
      expect{ vote.downvote }.not_to change{ vote.value }
    end
  end

  describe '.tally' do
    before do
      post.votes = [ Vote.new(user: current_user, voteable_id: post.id).upvote, 
                     Vote.new(user: current_user, voteable_id: post.id).upvote, 
                     Vote.new(user: current_user, voteable_id: post.id).downvote ]
    end

    it "should return an object's total points for the object" do
      expect(Vote.tally(post.id)).to eq(1)
    end

    it "should be responsive" do
      post.votes << Vote.new(user: current_user, voteable_id: post.id).downvote
      post.votes << Vote.new(user: current_user, voteable_id: post.id).downvote
      post.votes << Vote.new(user: current_user, voteable_id: post.id).downvote
      expect(Vote.tally(post.id)).to eq(-2)
    end
  end
end
