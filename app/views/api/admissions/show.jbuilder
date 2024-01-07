json.admission do
  json.id @admission.id
  json.phone_number @admission.phone_number
  json.address @admission.address
  json.occupation @admission.occupation
  json.diagnosis @admission.diagnosis
  json.code_status @admission.code_status
  json.diet @admission.diet
  json.emergency_contact @admission.emergency_contact
  json.emergency_relationship @admission.emergency_relationship
  json.emergency_phone @admission.emergency_phone
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

    if @admission.patient.allergies.length < 1
      json.allergies 'NKDA'
    else
      json.allergies do
        json.array! @admission.patient.allergies do |allergy|
          json.name allergy.name
          json.reaction allergy.reaction
          json.symptoms allergy.symptoms
        end
      end
    end

    if @admission.patient.histories.length < 1
      json.histories 'No Past Medical History'
    else
      json.histories do
        json.array! @admission.patient.histories do |history|
          json.diagnosis history.diagnosis
          json.diagnosis_date history.diagnosis_date
        end
      end
    end
  end

  json.user do
    json.first_name @admission.user.first_name
    json.last_name @admission.user.last_name
  end
end