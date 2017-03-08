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

function upVote(songid,playlistid) {
  $.ajax({
    url:"/playlists/" + playlistid + "/suggestedsongs/" + songid + "/votes",
    method: 'POST',
    data: {
      status: 'up',
    }
  }).done(function(){
    $.ajax({
      url:"/playlists/" + playlistid + "/suggestedsongs/" + songid,
      method: 'GET',
    }).done(function(data){
      $('#'+songid).html(data.net_vote);
    });
  });
}

function downVote(songid,playlistid) {
      $.ajax({
        url:"/playlists/" + playlistid + "/suggestedsongs/" + songid + "/votes",
        method: 'POST',
        data: {
          status: 'down'
        }
      }).done(function(){
        $.ajax({
          url:"/playlists/" + playlistid + "/suggestedsongs/" + songid,
          method: 'GET',
        }).done(function(data){
          $('#'+songid).html(data.net_vote);
        });
      });
    }

$(document).on("ready", function(){

  $(".suggest_song").on('click', function (event){
      console.log($(this));
      console.log($(this).siblings('div').attr('name'));
      console.log($(this).siblings('div').html());

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
         console.log(data)
         console.log($(this).siblings('div').data('playlist-id'));
       });
  });



  $(".upvote").on('click', function() {

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

  $(".downvote").on('click', function() {

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
