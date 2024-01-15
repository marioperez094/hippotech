Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "static_pages#landing_page"

  #Redirects all wildcard paths except for ones using active storage
  get "*path" => redirect('/patient_list'), constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
