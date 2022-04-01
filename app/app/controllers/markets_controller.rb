# frozen_string_literal: true

class MarketsController < ApplicationController
  before_action :find_params, only: [:update, :destroy]
  after_action :verify_authorized, only: [:create, :update, :destroy]

  def index
    markets = Market.all
    render(
      status: :ok,
      json: { markets: }
    )
  end

  def create
    market = Market.new(market_params)
    authorize market
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
    if @market.update(market_params)
      render(
        status: :ok,
        json: { data: @market }
      )
    else
      error = @market.errors.full_messages.to_sentence
      render(status: :unprocessable_entity, json: { error: })
    end
  end

  def destroy
    if @market.destroy
      render(status: :ok, json: { success: "Successfully deleted market." })
    else
      render(status: :unprocessable_entity, json: { error: @market.errors.full_messages.to_sentence })
    end
  end

  private

    def market_params
      params.require(:market).permit(:name, :area, :is_show, {address: []}, :remark)
    end

    def find_params
      @market = Market.find(params[:id])
      authorize @market
    end
end
