class MarketsController < ApplicationController
  before_action :find_params, only: [:update, :destroy]

  def index
    markets = Market.all
    render json: {
      status: {code: 200, message: '获取成功'},
      data: { markets: MarketSerializer.new(markets)[:data][:attributes]}
    }
  end

  def create
    market = Market.new(market_params)
    if market.save
      render json: {
        status: {code: 200, message: '创建成功'},
        data: {market: MarketSerializer.new(market).[:data][:attributes]}
      }
    else
      error = market.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def update

  end

  def destroy

  end

  private

 
  def market_params
    params.require(:market).permit(:name, :id, :type, :is_show, :address, :remark)
  end

  def find_params
    @market = Market.find(params[:id])
  end
end
