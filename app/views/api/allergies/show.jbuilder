json.allergy do
  json.id @allergy.id
  json.name @allergy.name
  json.reaction @allergy.reaction
  json.symptoms @allergy.symptoms

  json.user do
    json.user_first_name @allergy.user.first_name
    json.user_last_name @allergy.user.last_name
  end
end