# frozen_string_literal: true

class CategoryController < ApplicationController
  def index
    categories = Category.all
    render status: :ok, json: { categories: categories }
  end
end
