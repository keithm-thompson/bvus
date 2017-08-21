class Url < ActiveRecord::Base
  validates :short_url, :long_url, presence: true
  validates :short_url, :long_url, uniqueness: true
end
