# budget-tracker-2
App to track monthly expenses across multiple users


Until I figure out a better way to handle this, the way to backfill recurring transactions that don't populate because the server is down on the first of the month is to manually run the cron job like so:

Grab the cron job's hash from:
`python manage.py crontab show`

and run
`python manage.py crontab run <hash>`
