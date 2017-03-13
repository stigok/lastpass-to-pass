const parse = require('csv-parse')
const es = require('event-stream')
const execSync = require('child_process').execSync

// Returns match of first capture group, or false if it wasn't found
function get (pattern, str) {
  let match
  str.replace(pattern, function () {
    match = arguments[1]
  })
  return match || false
}

let keys

process.stdin
  .pipe(parse())
  .pipe(es.map((raw, next) => {
    // Interpret first row as column keys
    if (!keys) {
      keys = raw
      return next(null)
    }

    // Convert array to object with proper key names
    const record = {}
    for (let k of keys) {
      record[k] = raw[keys.indexOf(k)]
    }

    // Use domain as name if a record doesn't have one
    if (!record.username.length) {
      record.name = get(/https?:\/\/([^/]+)/, record.url)
    }

    execSync(`pass insert --multiline "lastpass/${record.name}"`, {
      input: `${record.username}\n${record.password}\n${record.extra}\n\n${keys}\n${raw}`,
      encoding: 'utf-8'
    })

    next(null, `Imported ${record.name}\n`)
  }))
  .pipe(process.stdout)
