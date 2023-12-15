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

  it 'of GET /vitals/:patient' do
    expect(:get => '/api/patients/:id/vitals').to route_to(:controller => 'api/vitals', :action => 'index_by_patient', :id => ':id')
  end
end