function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

function upload(file, url, currPath, e) {
  e.preventDefault()
  let form = new FormData()
  form.append("file", file)
  form.append("path", currPath)
  fetch(url + "/upload", {
    method: "POST",
    body: form
  })
  .then(function() {
    alert("Upload successful")
  })
}

export { formatBytes, upload }
