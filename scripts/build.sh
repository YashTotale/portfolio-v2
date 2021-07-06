#!/usr/bin/env bash

set -e

export NODE_ENV=production

create-sitemap() {
  react-snap-sitemap --base-url=http://yashtotale.web.app/ --change-frequency=weekly
}

clean-up-error() {
  # Remove the changed build folder
  rm -rf build

  # Copy the original build folder
  cp -R temp-build build
}

# Remove existing build directory
rm -rf build temp-build

# Build
react-scripts build

# Copy the build folder
cp -R build temp-build

# Pre-render
for i in {1..5}; do
  react-snap && create-sitemap && break || clean-up-error
done

# Remove the temp folder
rm -rf temp-build
