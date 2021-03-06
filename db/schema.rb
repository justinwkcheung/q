# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170316154148) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authorizations", force: :cascade do |t|
    t.integer  "playlist_id"
    t.integer  "user_id"
    t.string   "status"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "playlists", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "uri"
    t.string   "description"
    t.string   "theme"
    t.integer  "access_code"
    t.boolean  "public",      default: false
    t.integer  "song_limit"
  end

  create_table "suggested_songs", force: :cascade do |t|
    t.integer  "song_id"
    t.integer  "playlist_id"
    t.integer  "user_id"
    t.string   "name"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "net_vote",    default: 0
    t.string   "artist"
    t.string   "user_name"
    t.string   "status"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "votes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "suggestedsong_id"
    t.string   "status"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

end
