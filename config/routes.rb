Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "static_pages#landing_page"

  get "login" => "static_pages#login"

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create]

    #Session APIs
    delete "/sessions" => "sessions#destroy"
    get "/authenticated" => "sessions#authenticated"

    #User change password
    put "/user/password_reset" => "users#password_reset"
  end

  #Redirects all wildcard paths except for ones using active storage
  get "*path" => redirect("/patient_list"), constraints: lambda { |req|
    req.path.exclude? "rails/active_storage"
  }
end
