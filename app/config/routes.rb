# frozen_string_literal: true

# == Route Map
#
#                                   Prefix Verb   URI Pattern                                                                                       Controller#Action
#                            markets_index GET    /markets/index(.:format)                                                                          markets#index
#                         new_user_session GET    /login(.:format)                                                                                  users/sessions#new
#                             user_session POST   /login(.:format)                                                                                  users/sessions#create
#                     destroy_user_session DELETE /logout(.:format)                                                                                 users/sessions#destroy
#                        new_user_password GET    /password/new(.:format)                                                                           devise/passwords#new
#                       edit_user_password GET    /password/edit(.:format)                                                                          devise/passwords#edit
#                            user_password PATCH  /password(.:format)                                                                               devise/passwords#update
#                                          PUT    /password(.:format)                                                                               devise/passwords#update
#                                          POST   /password(.:format)                                                                               devise/passwords#create
#                 cancel_user_registration GET    /signup/cancel(.:format)                                                                          users/registrations#cancel
#                    new_user_registration GET    /signup/sign_up(.:format)                                                                         users/registrations#new
#                   edit_user_registration GET    /signup/edit(.:format)                                                                            users/registrations#edit
#                        user_registration PATCH  /signup(.:format)                                                                                 users/registrations#update
#                                          PUT    /signup(.:format)                                                                                 users/registrations#update
#                                          DELETE /signup(.:format)                                                                                 users/registrations#destroy
#                                          POST   /signup(.:format)                                                                                 users/registrations#create
#                       authenticated_root GET    /                                                                                                 home#index
#                                  markets GET    /markets(.:format)                                                                                markets#index
#                                          POST   /markets(.:format)                                                                                markets#create
#                                   market PATCH  /markets/:id(.:format)                                                                            markets#update
#                                          PUT    /markets/:id(.:format)                                                                            markets#update
#                                          DELETE /markets/:id(.:format)                                                                            markets#destroy
#                             current_user GET    /current_user(.:format)                                                                           current_user#index
#                           category_index GET    /category(.:format)                                                                               category#index
#                                          POST   /category(.:format)                                                                               category#create
#                                 category PATCH  /category/:id(.:format)                                                                           category#update
#                                          PUT    /category/:id(.:format)                                                                           category#update
#                                          DELETE /category/:id(.:format)                                                                           category#destroy
#                                     root GET    /                                                                                                 home#index
#                                          GET    /*path(.:format)                                                                                  home#index
#         turbo_recede_historical_location GET    /recede_historical_location(.:format)                                                             turbo/native/navigation#recede
#         turbo_resume_historical_location GET    /resume_historical_location(.:format)                                                             turbo/native/navigation#resume
#        turbo_refresh_historical_location GET    /refresh_historical_location(.:format)                                                            turbo/native/navigation#refresh
#            rails_postmark_inbound_emails POST   /rails/action_mailbox/postmark/inbound_emails(.:format)                                           action_mailbox/ingresses/postmark/inbound_emails#create
#               rails_relay_inbound_emails POST   /rails/action_mailbox/relay/inbound_emails(.:format)                                              action_mailbox/ingresses/relay/inbound_emails#create
#            rails_sendgrid_inbound_emails POST   /rails/action_mailbox/sendgrid/inbound_emails(.:format)                                           action_mailbox/ingresses/sendgrid/inbound_emails#create
#      rails_mandrill_inbound_health_check GET    /rails/action_mailbox/mandrill/inbound_emails(.:format)                                           action_mailbox/ingresses/mandrill/inbound_emails#health_check
#            rails_mandrill_inbound_emails POST   /rails/action_mailbox/mandrill/inbound_emails(.:format)                                           action_mailbox/ingresses/mandrill/inbound_emails#create
#             rails_mailgun_inbound_emails POST   /rails/action_mailbox/mailgun/inbound_emails/mime(.:format)                                       action_mailbox/ingresses/mailgun/inbound_emails#create
#           rails_conductor_inbound_emails GET    /rails/conductor/action_mailbox/inbound_emails(.:format)                                          rails/conductor/action_mailbox/inbound_emails#index
#                                          POST   /rails/conductor/action_mailbox/inbound_emails(.:format)                                          rails/conductor/action_mailbox/inbound_emails#create
#        new_rails_conductor_inbound_email GET    /rails/conductor/action_mailbox/inbound_emails/new(.:format)                                      rails/conductor/action_mailbox/inbound_emails#new
#       edit_rails_conductor_inbound_email GET    /rails/conductor/action_mailbox/inbound_emails/:id/edit(.:format)                                 rails/conductor/action_mailbox/inbound_emails#edit
#            rails_conductor_inbound_email GET    /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                                      rails/conductor/action_mailbox/inbound_emails#show
#                                          PATCH  /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                                      rails/conductor/action_mailbox/inbound_emails#update
#                                          PUT    /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                                      rails/conductor/action_mailbox/inbound_emails#update
#                                          DELETE /rails/conductor/action_mailbox/inbound_emails/:id(.:format)                                      rails/conductor/action_mailbox/inbound_emails#destroy
# new_rails_conductor_inbound_email_source GET    /rails/conductor/action_mailbox/inbound_emails/sources/new(.:format)                              rails/conductor/action_mailbox/inbound_emails/sources#new
#    rails_conductor_inbound_email_sources POST   /rails/conductor/action_mailbox/inbound_emails/sources(.:format)                                  rails/conductor/action_mailbox/inbound_emails/sources#create
#    rails_conductor_inbound_email_reroute POST   /rails/conductor/action_mailbox/:inbound_email_id/reroute(.:format)                               rails/conductor/action_mailbox/reroutes#create
# rails_conductor_inbound_email_incinerate POST   /rails/conductor/action_mailbox/:inbound_email_id/incinerate(.:format)                            rails/conductor/action_mailbox/incinerates#create
#                       rails_service_blob GET    /rails/active_storage/blobs/redirect/:signed_id/*filename(.:format)                               active_storage/blobs/redirect#show
#                 rails_service_blob_proxy GET    /rails/active_storage/blobs/proxy/:signed_id/*filename(.:format)                                  active_storage/blobs/proxy#show
#                                          GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                                        active_storage/blobs/redirect#show
#                rails_blob_representation GET    /rails/active_storage/representations/redirect/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations/redirect#show
#          rails_blob_representation_proxy GET    /rails/active_storage/representations/proxy/:signed_blob_id/:variation_key/*filename(.:format)    active_storage/representations/proxy#show
#                                          GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format)          active_storage/representations/redirect#show
#                       rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                                       active_storage/disk#show
#                update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                               active_storage/disk#update
#                     rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                                    active_storage/direct_uploads#create

Rails.application.routes.draw do
  get "markets/index"
  devise_for :users,
    path: "",
    path_names: {
      sign_in: "login",
      sign_out: "logout",
      registration: "signup"
    },
    controllers: {
      sessions: "users/sessions",
      registrations: "users/registrations"
    }

  devise_scope :user do
    authenticated :user do
      root "home#index", as: :authenticated_root
    end
    # get 'update_account', to: 'devise/registrations#update'
    # unauthenticated do
    #   root 'home#index', as: :unauthenticated_root
    # end
  end

  resources :markets, only: [:index, :create, :update, :destroy]

  get "/current_user", to: "current_user#index"
  resources :category, only: [:index, :create, :update, :destroy]

  # Defines the root path route ("/")
  root to: "home#index"
  get "*path", to: "home#index", via: :all
end
