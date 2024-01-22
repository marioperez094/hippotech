json.authenticated true

json.user do
  json.id @user.id
  json.first_name @user.first_name
  json.last_name @user.last_name
  json.username @user.username
  json.email @user.email
  json.password_3_months_old @user.needs_new_password
end