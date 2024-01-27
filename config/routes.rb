Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "static_pages#landing_page"

  get "login" => "static_pages#login"
  get "/patient_list" => "static_pages#patient_list"
  get "/reset_password" => "static_pages#reset_password"
  get "/new_patient" => "static_pages#new_patient"

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create]
    resources :patients, only: [:create, :index, :show, :update]

    #Patient Search
    get "patients/search/:searchRow/:search" => "patients#index_by_last_name"

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
