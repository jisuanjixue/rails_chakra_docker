# frozen_string_literal: true

class HardWorker
  include Sidekiq::Worker

  def perform(*_args)
    # Do something
  end
end
