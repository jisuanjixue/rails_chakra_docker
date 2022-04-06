# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :current_user, :record

  def initialize(current_user, record)
    @current_user = current_user
    @record = record
  end

  class Scope
    def initialize(current_user, scope)
      @current_user = current_user
      @scope = scope
    end

    private

      attr_reader :current_user, :scope
  end
end
