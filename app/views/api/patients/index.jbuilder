json.patients do
  json.array! @patients do |patient|
    json.id patient.id
    json.first_name patient.first_name
    json.last_name patient.last_name
    json.date_of_birth patient.date_of_birth
    json.bio_sex patient.bio_sex

    if patient.image.attached?
      json.image url_for(patient.image)
    else 
      json.image nil
    end
  end
end