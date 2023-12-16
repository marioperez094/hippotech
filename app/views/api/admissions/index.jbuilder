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
    end
  end
end