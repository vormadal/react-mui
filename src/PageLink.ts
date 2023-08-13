export interface PageLink {
  name: string
  path: string
  protected?: boolean

  // only applies to drawer
  divider?: boolean
  icon?: React.ReactNode
}
