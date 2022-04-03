class MarketPolicy < ApplicationPolicy

  class Scope < Scope
    def resolve
      if current_user.role == "admin"
         scope.all
      else
        raise Pundit::NotAuthorizedError, "没有权限" 
      end
    end
  end

end