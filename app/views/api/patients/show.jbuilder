json.patient do
  json.id @patient.id
  json.first_name @patient.first_name
  json.last_name @patient.last_name
  json.date_of_birth @patient.date_of_birth
  json.bio_sex @patient.bio_sex

  if @patient.image.attached?
    json.image url_for(@patient.image)
  else 
    json.image nil
  end

  json.user do
    json.user_first_name @patient.user.first_name
    json.user_last_name @patient.user.last_name
  end
end