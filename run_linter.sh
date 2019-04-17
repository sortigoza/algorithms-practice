#!/bin/bash

set -e

# Ruby
echo "linting ruby"
bundle exec rubocop --auto-correct

# Elixir
echo "linting elixir"
mix format
mix credo list **/*.exs --strict

# Nodejs
echo "linting nodejs"
npm run lint