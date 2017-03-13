window.dzAsyncInit = function() {
DZ.init({
  appId  : '226822',
  channelUrl : 'http://localhost:3000/playlist/player',
  player : {
    container: 'd_player',
    height : 90,
    color: '0ab091',
    onload : function(){}
  }
})
};

(function() {
  var e = document.createElement('script');
  e.src = 'http://e-cdn-files.deezer.com/js/min/dz.js';
  e.async = true;
  document.getElementById('dz-root').appendChild(e);
}());
