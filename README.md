## How to produce the tgif table

1) add the new tgifs to the appropriate `data.json` file
1) get the new emoji urls:
    1) uncomment the `getEmojis` bit in `run.js` to get a console output of all the new emoji tags
    1) copy this output into `emojis.json` and do some multi-cursor fiddling to line these all up as object keys
    1) paste the output into slack somewhere so that you can copy the URLs into the appropriate slots in the `emojis.json` file
1) uncomment the `theWholePage` bit in `run.js` and run it again.
    1) if you get the error `no person pic for x`, add a new entry to `folks.json`, copying their profile pic url from slack