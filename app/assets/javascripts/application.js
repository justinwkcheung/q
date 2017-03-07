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
//= require turbolinks
//= require_tree .
//= require playlists.js

$(document).on("turbolinks:load", function(){

  $(".suggest_song").on('click', function (event){
      console.log($(this));
      console.log($(this).siblings('div').attr('name'));
      console.log($(this).siblings('div').html());

       event.preventDefault();

       $.ajax({
          url:'/playlists/4/suggestedsongs',
          method:'POST',
          data:{
           song_id: $(this).siblings('div').attr('name'),
           name: $(this).siblings('div').html(),
           playlist_id: 4
         }
       }).done(function(data){
         console.log(data)
       });
  });



  $(".upvote").on('click', function() {

    $.ajax({
      url:"/playlists/1/suggestedsongs/4/votes",
      method: 'POST',
      data: {
        suggested_song_id: 1,
        user_id: 1,
        playlist_id: 4,
        status: 'up'
      }
    });
  });

  $(".downvote").on('click', function() {

    $.ajax({
      url:"/playlists/1/suggestedsongs/4/votes",
      method: 'POST',
      data: {
        suggested_song_id: 1,
        user_id: 1,
        playlist_id: 4,
        status: 'down'
      }
    });
  });
 });
