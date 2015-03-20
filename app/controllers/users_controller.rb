require 'securerandom'
require 'digest'

class UsersController < ApplicationController
	def index
		if session[:user]
			@user = User.find session[:user]
		else
			@user = nil
		end
		if @user
			render :index
		else
			render :before
		end
	end

	def create
		username = params[:username]
		password = params[:password]
		if not (5 <= username.length and username.length <= 20)
			#에러코드 -1
			render json: { error_code: -1 }
		elsif not (8 <= password.length and password.length <= 20)
			#에러코드 -2
			render json: { error_code: -2 }
		else
			@user = User.new
			@user.username = username
			@user.salt = SecureRandom.hex
			@user.password = Digest::SHA2.hexdigest(password + @user.salt)
			@user.count = 1

			if @user.save
				#성공
				#유저네임과 카운트 반환
				session[:user] = @user.id
				render json: { user_name: @user.username, login_conut: @user.count }
			else
				#에러코드 -3
				render json: { error_code: -3 }
			end
		end
	end

	def clear
		User.all.each do |x|
			x.destroy
		end
	end
end
