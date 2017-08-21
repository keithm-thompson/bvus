require 'base64'
require 'uri'

class Api::UrlsController < ApplicationController
  DOMAINS_FOR_ENV = {
    'development' => ['localhost.com'],
    'production' => ['bvurlshortener.herokuapp.com']
  }
  before_action :verify_long_url, only: [:long_to_short]
  before_action :verify_short_url, only: [:short_to_long]

  def create
    url = Url.where(long_url: params['long_url'])[0]
    if url
      update(url)
    else
      Url.transaction do
        url_params = { long_url: params['long_url'] }
        last_id = ActiveRecord::Base.connection.select_value(
                          'select last_value from urls_id_seq'
                            ).to_i
        url_params['short_url'] = Base64.urlsafe_encode64((last_id + 1).to_s)
        url = Url.new(url_params)
        url.save!
      end
      render status: 200, json: url.to_json
    end
  end

  def index
    urls = Url.order(num_times_shortened: :desc).limit(100)
    render status: 200, json: urls.to_json
  end

  def redir_to
    short_hash = params['hash']
    url = Url.where(short_url: short_hash)[0]

    if url
      if url.long_url.index("http") != 0
        url.long_url = "http://" + url.long_url
      end

      redirect_to url.long_url
    else
      render status: 404, html: 'public/404.html'
    end
  end

  def short_to_long
    short_hash = extract_short_hash(params['short_url'])
    url = Url.where(short_url: short_hash)[0]
    if url
      render status: 200, json: url.to_json
    else
      render status: 404, json: "URL not found"
    end
  end

private
  def create_uri(url)
    if url.index("http") != 0
      url = "http://" + url
    end
    URI(url)
  end

  def extract_short_hash(url)
    uri = create_uri(url)
    uri.path.split("/")[1]
  end

  def update(url)
    url.num_times_shortened += 1
    url.save!
    render status: 200, json: url.to_json
  end

  def verify_long_url
    unless params['long_url'] =~ URI::regexp
      render status: 422, json: "Invalid URL"
    end
  end

  def verify_short_url
    unless params['short_url'] =~ URI::regexp
      render status: 422, json: "Invalid URL"
    end
  end

  def valid_short_url_host?(url)
    url = create_uri(url)
    DOMAINS_FOR_ENV[Rails.env].includes?(uri.host)
  end
end
