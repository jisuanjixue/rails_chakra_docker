namespace :devise do
    desc "Send welcome reset password instructions to all users.
    This will lockout all users until they reset their password."
    task send_welcome_reset_password_instructions_to_all_users: :environment do
    #    users = User.where.not(email: nil)
        User.find_each do |user|
          # Send instructions so user can enter a new password:
          UserMailer.welcome_reset_password_instructions(user).deliver
          p user.id
        end
     end
end