function voteDirection(voteObject, response){
    if ($('.logged-in').length === 0){
      sweetAlert("You must be logged in to do that!", "Please log in or sign up");
    } else {
    $("#" + voteObject.countId).parent().replaceWith(response);
    $("#" + voteObject.upvoteId).addClass(voteObject.direction);
    $("#" + voteObject.countId).addClass(voteObject.direction);
  }
  
}

function upvote(voted){
  var url, method, voteObject;
  voteObject = {};
  url = voted.attr("href");
  method = voted.attr("data-method");
  
  voteObject.upvoteId = voted.attr("id");
  voteObject.countId = voted.parent().children('div').attr("id");
  voteObject.direction = "upvoted";

  $.ajax({
    url: url,
    type: method,
    success: function(response){
      voteDirection(voteObject, response);
    }
  });
}

function downvote(voted){
  var url, method, voteObject;
  voteObject = {};
  url = voted.attr("href");
  method = voted.attr("data-method");

  voteObject.upvoteId = voted.attr("id");
  voteObject.countId = voted.parent().children(':first-child').next().attr("id");
  voteObject.direction = "downvoted";

  $.ajax({
    url: url,
    type: method,
    success: function(response){
      voteDirection(voteObject, response);
    }
  });
}

$(document).ready(function(){

  $(".post-index-individual").on("click", ".upvote", function(event){
    event.preventDefault();
    upvote($(this));
    return false;
  });

  $(".post-index-individual").on("click", ".downvote", function(event){
    event.preventDefault();
    downvote($(this));
    return false;
  });

  $("#comments-container").on("click", ".comment-upvote", function(event){
    event.preventDefault();
    upvote($(this));
    return false;
  });

  $("#comments-container").on("click", ".comment-downvote", function(event){
    event.preventDefault();
    downvote($(this));
    return false;
  });
});
