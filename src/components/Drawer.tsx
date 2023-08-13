import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PageLink } from '../PageLink'
import { Fragment } from 'react'

interface Props {
  children?: React.ReactNode
  drawerWidth: number
  items?: PageLink[]
  mobileOpen?: boolean
  onMobileClose?: () => void | Promise<void>
}

export default function ResponsiveDrawer({ children, drawerWidth, items, mobileOpen, onMobileClose }: Props) {
  const navigate = useNavigate()

  const goto = (path: string) => () => {
    navigate(path)
  }

  const itemSections = (items || []).reduce<PageLink[][]>((previous, current) => {
    if (!previous.length || current.divider) {
      previous.push([current])
    } else {
      previous[previous.length - 1].push(current)
    }
    return previous
  }, [])
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {itemSections.map((section, index) => (
        <Fragment key={index}>
          <List key={`section-${index}`}>
            {section.map(({ name, icon, path }) => (
              <ListItem
                key={name}
                disablePadding
              >
                <ListItemButton onClick={goto(path)}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider key={`divider-${index}`} />
        </Fragment>
      ))}
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          //   container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {children}
      </Box>
    </Box>
  )
}
