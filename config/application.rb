require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Q
  class Application < Rails::Application
    RSpotify::authenticate("442452f96c8d4907a8f290c96c787354", "51f603cfe25f48c188fb675bf8ef2ea8")
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
