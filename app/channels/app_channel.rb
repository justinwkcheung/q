class AppChannel < ApplicationCable::Channel
  def subscribed
    # puts "SUBSCRIBED"
    # transmit "Hello"
    stream_from :app
  end

  def unsubscribed

  end

  def receive(data)
    # puts "DATA"
    puts data
    # puts "FINISHED"
  end

end
