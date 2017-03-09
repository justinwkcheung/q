// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


$(document).on("ready", function(){

  var regExp = /\d+/
  var playlistId = parseInt(regExp.exec(window.location.pathname)[0])

  $(".suggest_song").on('click', function (event){
       event.preventDefault();
       $.ajax({
          url:'/playlists/' + $(this).siblings('div').data('playlist-id') + '/suggestedsongs',
          method:'POST',
          data:{
           song_id: $(this).siblings('div').attr('name'),
           name: $(this).siblings('div').html(),
           user_id: $(this).siblings('div').data('user-id')
         }
       }).done(function(data){
       });
  });

  // Let's add this in when we want the host to be able to add songs while the playlist is playing.

  // response = HTTParty.get("https://connect.deezer.com/oauth/access_token.php?app_id=#{ENV["deezer_application_id"]}&secret=#{ENV["deezer_secret_key"]}&code=&output=json")
  // access_token = response["access_token"]



  $("body").delegate('#search-submit','click',function(event) {
    event.preventDefault();
    var searchValue = $('#search').val();
    console.log(searchValue);
    $.ajax({
      crossDomain: false,
      url: 'http://api.deezer.com/search/album?q=' + searchValue +"&",
      method: 'get'
    }).done(function(responseData){
      console.log(responseData);
    })
   })


  // # @albums = HTTParty.get("http://api.deezer.com/search/album?q=#{params[:search]}")
  // # @tracks = HTTParty.get("http://api.deezer.com/search/track?q=#{params[:search]}&#{access_token}")
  // # @artists = HTTParty.get("http://api.deezer.com/search/artist?q=#{params[:search]}&#{access_token}")



  $("body").delegate('.upvote','click', function() {
    var playlist_id = $(this).parents('.song-in-queue').data('playlist-id');
    var suggestedsong_id = $(this).parents('.song-in-queue').data('suggested-song-id');
    var replacement = $(this).parents('.contain').children('.heart').children('.netvote');

    $.ajax({
      url:"/playlists/" + $(this).parents('.song-in-queue').data('playlist-id') + "/suggestedsongs/" + $(this).parents('.song-in-queue').data('suggested-song-id') + "/votes",
      method: 'POST',
      data: {
        status: 'up',
      }
    }).done(function(){
      $.ajax({
        url:"/playlists/" + playlist_id + "/suggestedsongs/" + suggestedsong_id,
        method: 'GET',
      }).done(function(data){
        $(replacement).html(data.net_vote);
      });
    });
  });

  $("body").delegate('.downvote','click', function() {
    var playlist_id = $(this).parents('.song-in-queue').data('playlist-id');
    var suggestedsong_id = $(this).parents('.song-in-queue').data('suggested-song-id');
    var replacement = $(this).parents('.contain').children('.heart').children('.netvote')
    $.ajax({
      url:"/playlists/" + $(this).parents('.song-in-queue').data('playlist-id') + "/suggestedsongs/" + $(this).parents('.song-in-queue').data('suggested-song-id') + "/votes",
      method: 'POST',
      data: {
        status: 'down'
      }
    }).done(function(){
      $.ajax({
        url:"/playlists/" + playlist_id + "/suggestedsongs/" + suggestedsong_id,
        method: 'GET',
      }).done(function(data){
        $(replacement).html(data.net_vote);
      })
    });
  });
 });
