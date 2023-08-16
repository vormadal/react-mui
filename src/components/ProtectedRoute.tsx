import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface Props {
  /**
   * The components to be rendered if user is logged in
   */
  children?: React.ReactElement
  /**
   * If **false** the user will be redirected to '/' with the current location in the **returnUrl** query parameter
   */
  isLoggedIn?: boolean
}

/**
 * Hides the child routes if the user is not logged in
 * @param props
 * @returns
 */
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
