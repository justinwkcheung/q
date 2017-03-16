$(function() {

var regExp = /\d+/
var playlistId = parseInt(regExp.exec(window.location.pathname)[0])

var nextSongId
var nextSongRecord

$.ajax({
  url: '/playlists/' + playlistId + '/next_song',
  method: 'get',
}).done(function(data){
  nextSongId = data['song_id'];
  nextSongRecord = data['song_record'];
  setTimeout(function(){DZ.player.playTracks([nextSongId])},3000);
  $.ajax({
    url: '/playlists/' + playlistId + '/update_song_playing?song_id=' + nextSongRecord,
    method: 'get',
  }).done(function(data){
    console.log("Update song to playing");  
  });
  setTimeout(function(){DZ.Event.subscribe('track_end', function(){
    console.log("Track has ended");
    $.ajax({
      url: '/playlists/' + playlistId + '/update_song?song_id=' + nextSongRecord,
      method: 'get',
    }).done(function(data){
      console.log("Update song to playing");
      console.log("Load next song");
      console.log(data);
      DZ.player.playTracks([data['song_id']]);
      // $('.que').first().addClass('playing');
      // $('.que').first().find('.btn').addClass('hidden').removeClass('que');
      nextSongRecord = data['song_record'];
      })
    })},3000);
  })
})
