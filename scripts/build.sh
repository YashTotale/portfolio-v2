#!/usr/bin/env bash

set -e

export NODE_ENV=production

pre-render() {
  set -e

  # Copy the build folder
  cp -R build temp-build

  # Pre-render HTML files
  react-snap

  # Generate Sitemap
  react-snap-sitemap --base-url=http://yashtotale.web.app/ --change-frequency=weekly

  # Remove the temp folder
  rm -rf temp-build
}

clean-up-error() {
  # Remove the changed build folder
  rm -rf build

  # Copy the original build folder
  cp -R temp-build build

  # Remove the temp folder
  rm -rf temp-build
}

# Remove existing build directory
rm -rf build temp-build

# Build
react-scripts build

# Pre-render
for i in {1..5}; do pre-render && break || clean-up-error; done
