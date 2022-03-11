# frozen_string_literal: true

class MarketsController < ApplicationController
  before_action :find_params, only: [:update, :destroy]

  def index
    markets = Market.all
    render(
      status: :ok,
      json: { markets: }
)
  end

  def create
    market = Market.new(market_params)
    if market.save
      render(
        status: :ok,
        json: { data: market }
      )
    else
      error = market.errors.full_messages.to_sentence
      render(status: :unprocessable_entity, json: { error: })
    end
  end

  def update
  end

  def destroy
  end

  private

    def market_params
      params.require(:market).permit(:name, :area, :is_show, :address, :remark)
    end

    def find_params
      @market = Market.find(params[:id])
    end
end
