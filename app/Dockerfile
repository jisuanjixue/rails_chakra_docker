FROM ruby:3.1.0

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y build-essential nodejs yarn libpq-dev libsqlite3-dev imagemagick postgresql-client

# 设置 gem 中国镜像，并安装 rails
RUN gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/ &&\
    bundle config mirror.https://rubygems.org https://gems.ruby-china.com 

RUN mkdir /app
COPY . /app

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN mkdir -p /app/log && touch /app/log/development.log

RUN gem install bundler
RUN bundle install

RUN gem install foreman


CMD ["foreman", "start", "-f", "Procfile"]