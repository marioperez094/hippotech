json.admission do
  json.id @admission.id
  json.phone_number @admission.phone_number
  json.address @admission.address
  json.occupation @admission.occupation
  json.admission_diagnosis @admission.admission_diagnosis
  json.code_status @admission.code_status
  json.diet @admission.diet
  json.emergency_contact_name @admission.emergency_contact_name
  json.relationship_to_patient @admission.relationship_to_patient
  json.emergency_contact_number @admission.emergency_contact_number
  json.discharge @admission.discharge
  json.created_at @admission.created_at

  json.patient do
    json.id @admission.patient.id
    json.first_name @admission.patient.first_name
    json.last_name @admission.patient.last_name
    json.date_of_birth @admission.patient.date_of_birth
    json.bio_sex @admission.patient.bio_sex

    if @admission.patient.image.attached?
      json.image url_for(@admission.patient.image)
    else 
      json.image nil
    end
  end

  json.user do
    json.first_name @admission.user.first_name
    json.last_name @admission.user.last_name
  end
end