export function truncateId (id) {
  return `${id.slice(0, 6)}...${id.slice(id.length - 3, id.length)}`
}
