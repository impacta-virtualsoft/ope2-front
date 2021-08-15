// Junta nomes de classes condicionalmente
function joinClasses(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export { joinClasses }
