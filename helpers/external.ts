import Fuse from 'fuse.js'

function fuzzySearch(options: any) {
  const fuse = new Fuse(options, {
    keys: ['name', 'groupName', 'items.name'],
    threshold: 0.3,
  })

  return (value: any) => {
    if (!value.length) {
      return options
    }

    return fuse.search(value)
  }
}

export { fuzzySearch }
