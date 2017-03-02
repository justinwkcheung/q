# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create(first_name: 'Rich', last_name: 'Strauss', email: 'ricardo@gmail.com', password: '1234')
Playlist.create(name: 'the greatest')
SuggestedSong.create(song_id: 30003271, playlist_id: 1, user_id: 1, name: 'wow')
Authorization.create(playlist_id: 1, user_id: 1, status: "host")
Vote.create(user_id: 1, suggested_song_id: 1, status: 'up')

User.create(first_name: 'Justin', last_name: 'C', email: 'justin@gmail.com', password: '1234')
Playlist.create(name: 'the worst')
SuggestedSong.create(song_id: 30003379, playlist_id: 1, user_id: 2, name: 'crap')
Authorization.create(playlist_id: 1, user_id: 2, status: "guest")
Vote.create(user_id: 2, suggested_song_id: 2, status: 'down')

User.create(first_name: 'Stephen', last_name: 'A', email: 'stephen@gmail.com', password: '1234')
Playlist.create(name: 'mediocre')
SuggestedSong.create(song_id: 30001971, playlist_id: 2, user_id: 3, name: 'mediocre')
Authorization.create(playlist_id: 2, user_id: 3, status: "co-host")
Vote.create(user_id: 3, suggested_song_id: 3, status: 'up')
