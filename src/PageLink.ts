export interface PageLink {
  /**
   * The name or label shown in menu or drawer of the navigation bar
   */
  name: string
  /**
   * The link the user is navigated to when clicking the item in menu or drawer.
   * **Note:** Currently only relative links are supported
   */
  path: string

  /**
   * If **true** this link will be hidden when the user is not logged in.
   */
  protected?: boolean

  /**
   * **Not used**
   * Only applies to drawers allowing to add dividers between links.
   * The divider will be added below this link, thus the `name` and `path` will still be required
   */
  divider?: boolean

  /**
   * When using drawer you can specify an icon which will be shown to the left of the link
   */
  icon?: React.ReactNode
}
