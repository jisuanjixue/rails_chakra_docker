# frozen_string_literal: true

class CategoryController < ApplicationController
  before_action :find_params, only: [:update, :destroy]

  def index
    categories = []
    root_list = Category.roots
    root_list.each do |item|
      child_arr = item.children
      new_item = { name: item.name, id: item.id, parent_id: item.parent_id, subRows: arr_map(child_arr) }
      categories << new_item
    end
    render(status: :ok, json: { categories: })
  end

  def create
    if category_params[:id].blank?
      category = Category.find_or_create_by_path(category_params[:name])
      if category
        render(status: :ok, json: { success: "category was successfully created" })
      else
        error = category.errors.full_messages.to_sentence
        render(status: :unprocessable_entity, json: { error: })
      end
    else
      category_child = Category.find(category_params[:id])
      if category_child
        new_child = category_child.find_or_create_by_path(category_params[:name])
        if new_child
          render(status: :ok, json: { success: "child category was successfully created" })
        else
          error = category.errors.full_messages.to_sentence
          render(status: :unprocessable_entity, json: { error: })
        end
      end
    end
  end

  def update
    if @category.update(category_params)
      render(status: :ok, json: { success: "category was updated created" })
    else
      render(status: :unprocessable_entity, json: { error: @category.errors.full_messages.to_sentence })
    end
  end

  def destroy
    if @category.destroy
      render(status: :ok, json: { success: "Successfully deleted category." })
    else
      render(status: :unprocessable_entity, json: { error: @category.errors.full_messages.to_sentence })
    end
  end

  private

    def category_params
      params.require(:category).permit(:name, :id)
    end

    def arr_map(arr)
      arr.map do |child|
        two_child_arr = child.children
        { name: child.name, id: child.id, parent_id: child.parent_id, subRows: arr_map(two_child_arr) }
      end
    end

    def find_params
      @category = Category.find(params[:id])
    end
end
