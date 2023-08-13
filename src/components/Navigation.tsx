import { Menu as MenuIcon } from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Toolbar,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageLink } from '../PageLink'
import { UserInfo } from '../UserInfo'
import ResponsiveDrawer from './Drawer'
import * as React from 'react'

interface Props {
  title?: string
  Icon?: (props: { sx: SxProps<Theme> }) => React.ReactNode
  pages?: PageLink[]
  avatarOptions?: PageLink[]
  user?: UserInfo
  isLoggedIn?: boolean
  drawer?: boolean
  drawerWidth?: number
  children?: React.ReactNode
}

const defaultDrawerWidth = 240
function NavigationBar({ title, Icon, pages, avatarOptions, user, isLoggedIn, drawer, drawerWidth, children }: Props) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [showDrawer, setShowDrawer] = useState(false)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (drawer) {
      setShowDrawer(true)
    } else {
      setAnchorElNav(event.currentTarget)
    }
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = async () => {
    setAnchorElUser(null)
  }

  const showMenu = !!(pages && pages.length)
  const showAvatarOptions = !!(avatarOptions && avatarOptions.length)
  return (
    <>
      <AppBar position="static">
        <Container
          maxWidth="xl"
          sx={drawer ? { pl: { sm: `${drawerWidth || defaultDrawerWidth}px` } } : {}}
        >
          <Toolbar disableGutters>
            {/* show on large screen */}
            {Icon && <Icon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1, ml: 2 }} />}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                ml: 1,
                display: { xs: 'none', sm: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              {title}
            </Typography>

            {/* Navigation menu (burger menu) show on small screen */}
            {showMenu && (
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', sm: 'none' }
                  }}
                >
                  {(pages || [])
                    .filter((x) => isLoggedIn || !x.protected)
                    .map((page) => (
                      <MenuItem
                        key={page.name}
                        component={Link}
                        to={page.path}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                    ))}
                </Menu>
              </Box>
            )}
            {/* show on small screen */}
            {Icon && <Icon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }} />}

            {/* title - show on small screen */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', sm: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              {title}
            </Typography>

            {/* pages link - show on large screens */}
            {!drawer && (
              <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                {(pages || [])
                  .filter((x) => isLoggedIn || !x.protected)
                  .map((page) => (
                    <Button
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to={page.path}
                      variant="text"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.name}
                    </Button>
                  ))}
              </Box>
            )}
            {/* avatar if logged - show on large AND small screens */}
            {isLoggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    alt={user?.name}
                    src={user?.imageUrl}
                  />
                </IconButton>

                {showAvatarOptions && (
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {(avatarOptions || []).map((option) => (
                      <MenuItem
                        key={option.name}
                        component={Link}
                        to={option.path}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">{option.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {drawer && (
        <ResponsiveDrawer
          drawerWidth={drawerWidth || defaultDrawerWidth}
          mobileOpen={showDrawer}
          onMobileClose={() => setShowDrawer(false)}
          items={pages}
        >
          {children}
        </ResponsiveDrawer>
      )}
      {!drawer && children}
    </>
  )
}

export default NavigationBar
