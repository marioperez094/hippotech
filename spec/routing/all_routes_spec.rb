require 'rails_helper'

RSpec.describe 'Route Definition', :type => :routing do
  it 'of POST /sessions' do
    expect(:post => '/api/sessions').to route_to(:controller => 'api/sessions', :action => 'create')
  end

  it 'of DELETE /sessions' do
    expect(:delete => '/api/sessions').to route_to(:controller => 'api/sessions', :action => 'destroy')
  end

  it 'of POST /users' do
    expect(:post => '/api/users').to route_to(:controller => 'api/users', :action => 'create')
  end

  it 'of POST /patients' do
    expect(:post => '/api/patients').to route_to(:controller => 'api/patients', :action => 'create')
  end

  it 'of GET /patients' do
    expect(:get => '/api/patients').to route_to(:controller => 'api/patients', :action => 'index')
  end

  it 'of GET /patients/:id' do
    expect(:get => '/api/patients/:id').to route_to(:controller => 'api/patients', :action => 'show', :id => ':id')
  end

  it 'of PUT /patients/:id' do
    expect(:put => '/api/patients/:id').to route_to(:controller => 'api/patients', :action => 'update', :id => ':id')
  end

  it 'of POST /vitals' do
    expect(:post => '/api/vitals').to route_to(:controller => 'api/vitals', :action => 'create')
  end

  it 'of GET /vitals/:id' do
    expect(:get => '/api/vitals/:id').to route_to(:controller => 'api/vitals', :action => 'show', :id => ':id')
  end

  it 'of PUT /vitals/:id' do
    expect(:put => '/api/vitals/:id').to route_to(:controller => 'api/vitals', :action => 'update', :id => ':id')
  end

  it 'of GET /patients/:id/vitals' do
    expect(:get => '/api/patients/:id/vitals').to route_to(:controller => 'api/vitals', :action => 'index_by_patient', :id => ':id')
  end

  it 'of POST /admissions' do
    expect(:post => '/api/admissions').to route_to(:controller => 'api/admissions', :action => 'create')
  end

  it 'of GET /admissions' do
    expect(:get => '/api/admissions').to route_to(:controller => 'api/admissions', :action => 'index')
  end

  it 'of GET /admissions/:id' do
    expect(:get => '/api/admissions/:id').to route_to(:controller => 'api/admissions', :action => 'show', :id => ':id')
  end

  it 'of GET /patients/:id/admissions' do
    expect(:get => '/api/patients/:id/admissions').to route_to(:controller => 'api/admissions', :action => 'index_by_patient', :id => ':id')
  end

  it 'of PUT /admissions/:id' do
    expect(:put => '/api/admissions/:id').to route_to(:controller => 'api/admissions', :action => 'update', :id => ':id')
  end

  it 'of PUT /admissions/:id/discharge' do
    expect(:put => '/api/admissions/:id/discharge').to route_to(:controller => 'api/admissions', :action => 'discharge', :id => ':id')
  end

  it 'of POST /allergies' do
    expect(:post => '/api/allergies').to route_to(:controller => 'api/allergies', :action => 'create')
  end

  it 'of GET /patients/:id/allergies' do
    expect(:get => '/api/patients/:id/allergies').to route_to(:controller => 'api/allergies', :action => 'index_by_patient', :id => ':id')
  end

  it 'of DELETE /allergies/:id' do
    expect(:delete => '/api/allergies/:id').to route_to(:controller => 'api/allergies', :action => 'destroy', :id => ':id')
  end

  it 'of POST /histories' do
    expect(:post => '/api/histories').to route_to(:controller => 'api/histories', :action => 'create')
  end

  it 'of GET /patients/:id/historiess' do
    expect(:get => '/api/patients/:id/histories').to route_to(:controller => 'api/histories', :action => 'index_by_patient', :id => ':id')
  end

  it 'of DELETE /histories/:id' do
    expect(:delete => '/api/histories/:id').to route_to(:controller => 'api/histories', :action => 'destroy', :id => ':id')
  end
end