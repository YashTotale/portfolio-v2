#!/usr/bin/env bash

set -e

pipx run --no-cache goodreads-user-scraper --user_id 54739262 --output_dir scripts/books/data --skip_user_info True
