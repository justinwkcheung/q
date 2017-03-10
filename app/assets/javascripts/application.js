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

  if ($('.song-list').html().trim() === '') {
    $('.search-container').css('display','none');
  }

  var regExp = /\d+/
  var playlistId = parseInt(regExp.exec(window.location.pathname)[0])

  // $(".suggest_song").on('click', function (event){
  //      event.preventDefault();
  //      $.ajax({
  //         url:'/playlists/' + $(this).siblings('div').data('playlist-id') + '/suggestedsongs',
  //         method:'POST',
  //         data:{
  //          song_id: $(this).siblings('div').attr('name'),
  //          name: $(this).siblings('div').html(),
  //          user_id: $(this).siblings('div').data('user-id')
  //        }
  //      }).done(function(data){
  //      });
  // });

  $('.add-search-container').on('click', function(){
    $('.search-container').removeClass('hidden');
    $('.search-container').fadeIn(800).addClass('search-container-show');
    $('.add-search-container').addClass('hidden');
    $('.upvote').css('z-index', 1);
    $('.downvote').css('z-index', 1);
  })

  $('.back').on('click', function(){
    $('.search-container').css('display','none');
    $('.search-container').css('z-index', -1).fadeOut(800);
    $('.add-search-container').removeClass('hidden');
    $('.upvote').css('z-index', 1);
    $('.downvote').css('z-index', 1);
  })

  $("body").delegate('.suggest_song1', 'click', function (event){
       event.preventDefault();
       $.ajax({
          url:'/playlists/' + playlistId + '/suggestedsongs',
          method:'POST',
          data:{
           song_id: $(this).parent().attr('song_id'),
           name: $(this).parent().attr('song_name'),
           artist: $(this).parent().attr('artist')
         }
       }).done(function(data){
         $(this).addClass('suggest_song1-active')
       }).fail(function(){
       })
  });

  $("body").delegate('#search-submit','click',function(event) {
    event.preventDefault();
    var searchValue = $('#search').val();
    console.log(searchValue);
    $.ajax({
      url: '/playlists/' + playlistId + '/suggestedsongs/',
      method: 'get',
      data: {q: searchValue},
      dataType: 'json'
    }).done(function(data){



      for (var i = 0; i < data['data'].length; i++){
        var button = $('<button>')
        var button = $(button).attr('class', 'suggest_song1');
        var button = $(button).html('+');

        var div = $('<div>').attr('class','song-listing').attr('song_id', data["data"][i]['id']).attr('song_name', data["data"][i]['title']).attr('artist', data["data"][i]["artist"]["name"]);

        $(div).html(data["data"][i]["title"]).append(' - ').append(data["data"][i]["artist"]["name"]).append(button);

        $('#search_results').append(div);
      }
    })
   })

  $('#make-public').on('click', function(){
    var status = $('#make-public').html().trim();
    console.log('clicked');
    $.ajax({
      url: '/playlists/' + playlistId + '/update_publicity',
      method: 'post'
    }).done(function(){
      if (status ==  "Public"){
        $('#make-public').html('Private');
        $('.buttons').removeClass('hidden');

        $('.add-search-container').css('display','inherit')
        $('#make-public').toggleClass('active');

      }
      else {
        $('#make-public').html('Public');
        $('.buttons').addClass('hidden');
        $('.add-search-container').css('display','none')
        $('#make-public').toggleClass('active');;
      }
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
