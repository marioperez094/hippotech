json.admissions do
  json.array! @admissions do |admission|
    json.id admission.id
    json.phone_number admission.phone_number
    json.address admission.address
    json.occupation admission.occupation
    json.diagnosis admission.diagnosis
    json.code_status admission.code_status
    json.diet admission.diet
    json.emergency_contact admission.emergency_contact
    json.emergency_relationship admission.emergency_relationship
    json.emergency_phone admission.emergency_phone
    json.discharge admission.discharge
    json.created_at admission.created_at

    json.patient do
      json.patient_id admission.patient.id
      json.first_name admission.patient.first_name
      json.last_name admission.patient.last_name

      if admission.patient.allergies.length < 1
        json.allergies nil
      else
        json.allergies do
          json.array! admission.patient.allergies do |allergy|
            json.name allergy.name
          end
        end
      end

      if admission.patient.histories.length < 1
        json.histories nil
      else
        json.histories do
          json.array! admission.patient.histories do |history|
            json.diagnosis history.diagnosis
          end
        end
      end
    end
  end
end