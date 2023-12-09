Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "static_pages#landing_page"

  get '/login' => 'static_pages#login'
  get '/patient_list' => 'static_pages#patient_list'
  get '/new_patient' => 'static_pages#new_patient'
  get '/patient/:id' => 'static_pages#patient'

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]

    delete '/sessions' => 'sessions#destroy'
    get '/authenticated' => 'sessions#authenticated'
  end

  get '*path', to: 'static_pages#patient_list'
end
