require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Q
  class Application < Rails::Application
    RSpotify::authenticate("7b84666333254bcb8261dd489df945b0", "9d0a24a9e90d437bb8a0d620ecf5e7a4")
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
