json.admissions do
  json.array! @admissions do |admission| 
    json.id admission.id
    json.diagnosis admission.diagnosis
    json.discharge admission.discharge
    json.created_at admission.created_at
    json.updated_at admission.updated_at
  end
end