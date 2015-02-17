function showMainCommentInputForm(button){
  var url, request;
  
  url = button.find('a').attr('href');
  request = $.get( url );

  request.done(function(response){
    $('#main-add-comment-input').append(response);
    button.hide();
    if ( $('.edit_post_button') ) {
      $('.edit_post_button').hide();
    }
  });
}

function addComment(form){
  var url, comment;
  url = form.attr('action');
  comment = form.serialize();
  request = $.post( url, comment );

  request.done(function(response){
    $('.add-comment.button').show();
    form.hide();
    $('#comments-container').append(response);
  });
}

function showCommentInputForm(button){
  var buttonID, url, request
  
  buttonID = button.attr('id');
  url = button.find('a').attr('href');
  request = $.get( url );

  request.done(function(response){
    $('#comment-' + buttonID + '-input').append(response);
    button.hide();
  });
}

function addSubComment(form){
  var url, comment;
  url = form.attr('action');
  comment = form.serialize();

  request = $.post( url, comment );

  request.done(function(response){
    form.hide();
    $('.sub-comment-link').show();
    form.parent().parent().siblings('ul').append(response);
  });
  
}

$(document).ready(function(){
  
  $('.add-comment').on('click', function(e){
    e.preventDefault();
    showMainCommentInputForm($(this));
  });

  $('#main-add-comment-input').on('submit', '.add-comment', function(e){
    e.preventDefault();
    addComment($(this));
    return false;
  });

  $('#comments-container').on('click', '.sub-comment-link', function(e){
    e.preventDefault();
    showCommentInputForm($(this));
  });

  $('#comments-container').on('submit', '.add-comment', function(e){
    e.preventDefault();
    addSubComment($(this));
    return false;
  });

});