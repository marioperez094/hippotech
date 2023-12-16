Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "static_pages#landing_page"

  get '/login' => 'static_pages#login'
  get '/patient_list' => 'static_pages#patient_list'
  get '/new_patient' => 'static_pages#new_patient'
  get '/patient/:id' => 'static_pages#patient'

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create]
    resources :patients, only: [:create, :index, :show, :update]
    resources :vitals, only: [:create, :show, :update]
    resources :admissions, only: [:create, :index, :show, :update]

    #Vitals API
    get '/patients/:id/vitals' => 'vitals#index_by_patient'

    #Admission API
    get '/patients/:id/admissions' => 'admissions#index_by_patient'
    put '/admissions/:id/discharge' => 'admissions#discharge'

    #Session APIs
    delete '/sessions' => 'sessions#destroy'
    get '/authenticated' => 'sessions#authenticated'
  end

  get '*path', to: 'static_pages#patient_list'
end
