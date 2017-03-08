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
      var div = $('<div>').attr('class', 'song-in-queue').attr('data-playlist-id', 6).attr('data-user-id', 4).attr('data-suggested-song-id', data[0].id);
      var div_replace = $(div).html(data[0].name)
      $('.song-list').append(div_replace);
      console.log(div_replace);


      // <div class="song-in-queue" data-playlist-id=<%=@playlist_q.id%> data-user-id=<%=session[:user_id]%> data-suggested-song-id=<%= song.id %>>
      // <%= song.name %>&nbsp
      // <span class="buttons"><button type="button" name="button" class="upvote btn waves-effect waves-light blue darken-2"><i class="material-icons">thumb_up</i></button>&nbsp<button type="button" name="button" class="downvote  btn waves-effect waves-light red"><i class="material-icons">thumb_down</i></button></span> &nbsp
      // <span class="heart"><%= song.net_vote %>&nbsp<i class="fa fa-heart" style="font-size:12px"></i></span>
      // </div>




    }

  });

});
