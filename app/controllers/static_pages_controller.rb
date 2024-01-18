class StaticPagesController < ApplicationController
  def landing_page
    render "landing_page"
  end

  def login
    render "login"
  end
end
