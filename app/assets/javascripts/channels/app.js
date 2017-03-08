$('document').ready(function(){
  App.app = App.cable.subscriptions.create('AppChannel', {

    connected: function(){
      console.log("connected");
    },

    disconnected: function(){
      console.log("disconnected");
    },

    received: function(data){
      console.log(data);
      console.log(data[0].name);
      // $('.song-list').html('');
      // for (var i = 0; i < data.length; i++){
      var regExp = /\d/
      var playlist_id = parseInt(regExp.exec(window.location.pathname)[0])

      var divContainer = $('<div>').attr('class', 'song-in-queue').attr('data-playlist-id', playlist_id).attr('data-suggested-song-id', data[0].id);

      var span = $('<span>').attr('class',"buttons")

      var buttonUp = $('<button>').attr('type',"button").attr('name','button').attr('class','upvote btn waves-effect waves-light blue darken-2')
      var iconUp = $('<i>').attr('class','material-icons').html('thumb_up')

      var upButton = $(buttonUp).append(iconUp)

      var buttonDown = $('<button>').attr('type',"button").attr('name','button').attr('class','downvote btn waves-effect waves-light red')
      var iconDown = $('<i>').attr('class','material-icons').html('thumb_down')

      var downButton = $(buttonDown).append(iconDown)

      var spanHeart = $('<span>').attr('class','heart').html(data[0].net_vote)

      var iconHeart = $('<i>').attr('class','fa fa-heart').attr('style','font-size:12px')

      var heart = $(spanHeart).append(iconHeart)

      var votes = $(span).append(upButton).append(downButton)

      var div_replace = $(divContainer).html(data[0].name)

      $(div_replace).append(votes).append(heart)

      $('.song-list').append(div_replace);
      console.log(div_replace);




      // <div class="song-in-queue" data-playlist-id=<%=@playlist_q.id%> data-user-id=<%=session[:user_id]%> data-suggested-song-id=<%= song.id %>>
      // <%= song.name %>&nbsp
      // <span class="buttons"><button type="button" name="button" class="upvote btn waves-effect waves-light blue darken-2"><i class="material-icons">thumb_up</i></button>&nbsp<button type="button" name="button" class="downvote  btn waves-effect waves-light red"><i class="material-icons">thumb_down</i></button></span> &nbsp
      //
      // </div>




    }

  });

});