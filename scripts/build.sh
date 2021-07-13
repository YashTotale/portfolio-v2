#!/usr/bin/env bash

set -e

export NODE_ENV=production

create-sitemap() {
  react-snap-sitemap --base-url=http://yashtotale.web.app/ --change-frequency=weekly
}

clean-up-error() {
  if [ "$1" -gt 3 ]; then
    exit 1
  fi

  # Remove the changed build folder
  rm -rf build

  # Copy the original build folder
  cp -R temp-build build
}

# Remove existing build directory
rm -rf build temp-build

# Build
react-scripts build --stats

# Copy the build folder
cp -R build temp-build

# Pre-render
n=0
until [ "$n" -ge 5 ]; do
  react-snap && create-sitemap && break || clean-up-error "$n"
  n=$((n + 1))
done

# Remove the temp folder
rm -rf temp-build
