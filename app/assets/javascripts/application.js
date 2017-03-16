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
//= require materialize



function getRandomInt() {
  min = Math.ceil(1);
  max = Math.floor(7);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  var num = getRandomInt()
  if (num === 1) {
    return 'pink lighten-3'
  } else if (num === 2){
    return 'purple accent-2'
  } else if (num === 3) {
    return 'indigo accent-1'
  } else if (num === 4) {
    return 'green accent-4'
  } else if (num === 5) {
    return 'teal lighten-1'
  } else if (num === 6) {
    return 'orange lighten-1'
  }
};

function randomPhrase() {
  var num = getRandomInt()
  if (num === 1) {
    return "Your song was added. Let's party!"
  } else if (num === 2){
    return "Woohoo! Song added!"
  } else if (num === 3) {
    return 'Nice taste in music! Song added.'
  } else if (num === 4) {
    return 'Achievement unlocked! Just kidding. Your song was still added though!'
  } else if (num === 5) {
    return 'Song added, sweet pick!'
  } else if (num === 6) {
    return 'Your song was successfully added, now go vote it up the Q!'
  }
};


$(document).on("ready", function(){

  if ($('.song-list').html().trim() === '') {
    $('.search-container').css('display','none');
  }

  var regExp = /\d+/
  var playlistId = parseInt(regExp.exec(window.location.pathname)[0])


  $('.add-search-container').on('click', function(){
    $('.search-container').toggleClass('hidden');
    $('.search-container').css('z-index',3);
    $('.search-container').fadeIn(800).addClass('search-container-show');
    $('.add-search-container').addClass('hidden');
    $('.upvote').css('z-index', 1);
    $('.downvote').css('z-index', 1);
  })

  $('.back').on('click', function(){
    $('.search-container').css('display','none');
    $('.search-container').css('z-index', -1).fadeOut(800);
    $('.add-search-container').toggleClass('hidden');
    $('.upvote').css('z-index', 1);
    $('.downvote').css('z-index', 1);
  })

  var notify = $("<div>").attr('class', 'notify').css('background-color', 'red').css('display', 'hidden').css('text-align', 'center');

  $("body").delegate('.suggest_song1', 'click', function (event){
    Materialize.toast(randomPhrase(), 3000, randomColor());
       event.preventDefault();
       console.log("this button was clicked");
       $.ajax({
          url:'/playlists/' + playlistId + '/suggestedsongs',
          method:'POST',
          data:{
           song_id: $(this).parent().attr('song_id'),
           name: $(this).parent().attr('song_name'),
           artist: $(this).parent().attr('artist')
         }
       }).done(function(data){
         console.log(data);
         console.log("Added song");
         $('body').prepend((notify).css('display', 'block').html(data.message))
         Materialize.toast(randomPhrase(), 3000, randomColor());

         $(this).addClass('suggest_song1-active');

         setTimeout(function(){
           $(notify).fadeOut('slow');
         }, 2000);
       }).fail(function(data){
       })
  });

  $("body").delegate('.search-submit','click',function(event) {
    event.preventDefault();
    var searchValue = $('#search').val();
    // console.log(searchValue);
    $.ajax({
      url: '/playlists/' + playlistId + '/suggestedsongs/',
      method: 'get',
      data: {q: searchValue},
      dataType: 'json'
    }).done(function(data){
      console.log(data);
      var albumsContainer = $('<div>').attr('id', 'search_results_albums')
      var albumsHeader = $('<div>').addClass('header').html('Albums');
      $(albumsContainer).append(albumsHeader);

      var artistsContainer = $('<div>').attr('id', 'search_results_artists');
      var artistsHeader = $('<div>').addClass('header').html('Artists');
      $(artistsContainer).append(artistsHeader);


      var tracksContainer = $('<div>').attr('id', 'search_results_tracks')
      var tracksHeader = $('<div>').addClass('header').html('Tracks');
      $(tracksContainer).append(tracksHeader);

      var allAlbums = $('div').addClass('all-albums').css('display', 'none')

      var allArtists = $('div').addClass('all-artists').css('display', 'none')



      $('#search_results').html('').append(albumsContainer).append(artistsContainer).append(tracksContainer);

      for (var i = 0; i < data['tracks']['data'].length; i++){
        var button = $('<button>')
        var button = $(button).attr('class', 'suggest_song1');
        var button = $(button).html('+');
        var div = $('<div>').attr('class','song-listing').attr('song_id', data["tracks"]['data'][i]['id']).attr('song_name', data["tracks"]['data'][i]['title']).attr('artist', data["tracks"]['data'][i]["artist"]["name"]);



        $(div).html(data["tracks"]['data'][i]["title"]).append(' - ').append(data["tracks"]['data'][i]["artist"]["name"]).append('&nbsp;').append(button);
        $('#search_results_tracks').append(div);
      }

      var contain = $('<div>').addClass('contain');
      for (var i = 0; i < 5; i++){
        var div = $('<div>').addClass('album').attr('album_title', data["albums"]['data'][i]['title']).attr('album-id', data["albums"]['data'][i]['id']);
        var image_container = $('<div>').addClass('album-img-container');
        var img = $('<img>').attr('src',data["albums"]['data'][i]["cover_medium"]).addClass('album-img');
        image_container =$(image_container).append(img);
        var album_title = $('<div>').addClass('album-title').html(data["albums"]['data'][i]["title"]);

        $(contain).append((div).append(image_container).append(album_title));

      }
        $('#search_results_albums').append(contain);

      var contain = $('<div>').addClass('contain');
      for (var i = 0; i < 5; i++){

        var div = $('<div>').addClass('artist').attr('artist-name', data["artists"]['data'][i]['name']).attr('artist-id', data["artists"]['data'][i]['id']);
        var image_container = $('<div>').addClass('artist-img-container');
        var img = $('<img>').attr('src',data["artists"]['data'][i]["picture_medium"]).addClass('artist-img');
        image_container =$(image_container).append(img);
        var artist_title = $('<div>').addClass('artist-title').html(data["artists"]['data'][i]["name"]);

        $(contain).append((div).append(image_container).append(artist_title));

      }
        $('#search_results_artists').append(contain);
    })
   })



   $("body").delegate('.album','click',function(event) {
     event.preventDefault();

     var album_id = parseInt($(this).attr('album-id'));

     $.ajax({
       url: '/playlists/' + playlistId + '/suggestedsongs/get_album',
       method: 'get',
       data: {album: album_id},
       dataType: 'json'
     }).done(function(data){
       console.log(data);
      $('#search_results_tracks').html("");
      for (var i = 0; i < data['albums']["tracks"]['data'].length; i++){
        var button = $('<button>')
        var button = $(button).attr('class', 'suggest_song1');
        var button = $(button).html('+');
        var div = $('<div>').attr('class','song-listing').attr('song_id', data["albums"]["tracks"]["data"][i]['id']).attr('song_name', data["albums"]["tracks"]['data'][i]['title_short']).attr('artist', data["albums"]["tracks"]['data'][i]["artist"]["name"]);
        $(div).html(data["albums"]["tracks"]['data'][i]['title_short']).append(' - ').append( data["albums"]["tracks"]['data'][i]["artist"]["name"]).append(button);
        $('#search_results_tracks').append(div);
      }

     })
   })

   $("body").delegate('.artist','click',function(event) {
     event.preventDefault();

     console.log("this button was clicked!");
    //  console.log($(this).parent().text());
     var artist_id = parseInt($(this).attr('artist-id'));

     console.log(artist_id);

     $.ajax({
       url: '/playlists/' + playlistId + '/suggestedsongs/get_artist',
       method: 'get',
       data: {artist: artist_id},
       dataType: 'json'
     }).done(function(data){

       console.log(data);

      $('#search_results_tracks').html("");
      for (var i = 0; i < data['artists']['data'].length; i++){
        var button = $('<button>')
        var button = $(button).attr('class', 'suggest_song1');
        var button = $(button).html('+');
        var div = $('<div>').attr('class','song-listing').attr('song_id', data["artists"]["data"][i]['id']).attr('song_name', data["artists"]["data"][i]['title']).attr('artist', data["artists"]["data"][i]['artist']["name"]);
        $(div).html(data["artists"]["data"][i]['title']).append(' - ').append(data["artists"]["data"][i]['artist']["name"]).append(button);
        $('#search_results_tracks').append(div);
      }

     })
   })


  $('#make-public').on('click', function(){
    var status = $('#make-public').html().trim();
    console.log('clicked');
    $.ajax({
      url: '/playlists/' + playlistId + '/update_publicity',
      method: 'post'
    })
  });

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
    }).done(function(data){

      $('body').prepend((notify).css('display', 'block').html(data.message))
      setTimeout(function(){
        $(notify).fadeOut('slow');
      }, 2000);

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
    }).done(function(data){

      $('body').prepend((notify).css('display', 'block').html(data.message))
      setTimeout(function(){
        $(notify).fadeOut('slow');
      }, 2000);

      $.ajax({
        url:"/playlists/" + playlist_id + "/suggestedsongs/" + suggestedsong_id,
        method: 'GET',
      }).done(function(data){
        $(replacement).html(data.net_vote);
      })
    });
  });
 });
