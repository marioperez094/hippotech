json.history do 
  json.id @history.id
  json.diagnosis @history.diagnosis
  json.diagnosis_date @history.diagnosis_date

  json.user do
    json.user_first_name @history.user.first_name
    json.user_last_name @history.user.last_name
  end
end