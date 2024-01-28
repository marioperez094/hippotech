json.admissions do
  json.array! @admissions do |admission| 
    json.id admission.id
    json.admission_diagnosis admission.admission_diagnosis
    json.discharge admission.discharge
    json.created_at admission.created_at
    json.updated_at admission.updated_at
  end
end