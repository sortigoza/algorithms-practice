#!/bin/bash

set -e

bundle exec rubocop --auto-correct

mix format
mix credo list *.exs --strict