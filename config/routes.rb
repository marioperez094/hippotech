Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "static_pages#landing_page"

  get '/login' => 'static_pages#login'
  get '/patient_list' => 'static_pages#patient_list'
  get '/new_patient' => 'static_pages#new_patient'
  get '/patient/:id' => 'static_pages#patient'
  get '/patient/:id/allergies' => 'static_pages#allergies'
  get '/patient/:id/histories' => 'static_pages#histories'

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create]
    resources :patients, only: [:create, :index, :show, :update]
    resources :vitals, only: [:show, :update]
    resources :admissions, only: [:create, :index, :show, :update]
    resources :allergies, only: [:create, :destroy]
    resources :histories, only: [:create, :destroy]

    #Histories API
    get '/patients/:id/histories' => 'histories#index_by_patient'

    #Allergies API
    get '/patients/:id/allergies' => 'allergies#index_by_patient'

    #Vitals API
    get '/patients/:id/vitals' => 'vitals#index_by_patient'
    post '/patients/:id/vitals' => 'vitals#create'

    #Admission API
    get '/patients/:id/admissions' => 'admissions#index_by_patient'
    put '/admissions/:id/discharge' => 'admissions#discharge'

    #Session APIs
    delete '/sessions' => 'sessions#destroy'
    get '/authenticated' => 'sessions#authenticated'
  end

  get "*path" => redirect('/patient_list'), constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
