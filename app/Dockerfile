FROM ruby:3.0.2

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y build-essential nodejs yarn libpq-dev libsqlite3-dev imagemagick postgresql-client

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