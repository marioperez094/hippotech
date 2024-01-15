Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "static_pages#landing_page"

  #Routes external paths back to patient list while still allowing active storage for images
  get "*path" => redirect('/patient_list'), constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
