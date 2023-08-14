import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface Props {
  children?: React.ReactElement
  isLoggedIn?: boolean
}

function ProtectedRoute({ isLoggedIn, children }: Props) {
  const location = useLocation()

  if (!isLoggedIn) {
    return (
      <Navigate
        to={{
          pathname: '/',
          search: `returnUrl=${encodeURIComponent(location.pathname)}`
        }}
        replace
      />
    )
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
