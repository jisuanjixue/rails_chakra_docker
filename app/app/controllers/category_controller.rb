# frozen_string_literal: true

class CategoryController < ApplicationController
  before_action :find_params, only: [:create, :update, :destroy]

  def index
    categories = Category.roots
    render status: :ok, json: { categories: categories }
  end
  
  def create
    if @category.nil?
      category = Category.find_or_create_by_path(category_params[:name])
      if category
        render status: :ok, json: { success: 'category was successfully created' }
      else
        error = category.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: error  }
      end
    else
      category = @category.find_or_create_by_path(category_params[:name])
      render status: :ok, json: { success: 'child category was successfully created' }
    end
  end

  def update
    if @category.update(category_params)
      render status: :ok, json: { success: 'category was updated created' }
    else
      render status: :unprocessable_entity, json: { error: @category.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if  @category.destroy
       render status: :ok, json: { success: 'Successfully deleted category.' }
    else
       render status: :unprocessable_entity, json: { error: @category.errors.full_messages.to_sentence }
    end
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

  def find_params
    @category = Category.find(params[:id])
  end

end
