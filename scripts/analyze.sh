#!/usr/bin/env bash

set -e

export NODE_ENV=production

# Remove existing bundle-report directory
rm -rf bundle-report

# Create new bundle-report directory
mkdir bundle-report

# Analyze the bundle
webpack-bundle-analyzer ./build/bundle-stats.json --mode static --report bundle-report/index.html --no-open
