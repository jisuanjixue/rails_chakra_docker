# frozen_string_literal: true

class CategoryController < ApplicationController
  def index
    @categories = Category.all
  end
end
