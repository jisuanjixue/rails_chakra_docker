class MarketPolicy
  attr_reader :current_user, :market

  def initialize(current_user, market)
    @current_user = current_user
    @market = market
  end

  def create?
    current_user.role == 'admin'
  end

  def update?
    current_user.role == 'admin'
  end

  def destroy?
    current_user.role == 'admin'
  end
end