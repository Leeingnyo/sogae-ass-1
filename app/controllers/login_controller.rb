require 'securerandom'
require 'digest'

class LoginController < ApplicationController
	def login
		username = params[:username]
		password = params[:password]
		@user = User.find_by username: username
		if @user and @user.password == Digest::SHA2.hexdigest(password + @user.salt)
			@user.count += 1
			@user.save
			session[:user] = @user.id
			render json: { user_name: @user.username, login_conut: @user.count }
		else
			#login fail
			render json: { error_code: -4 }
		end
	end
end
