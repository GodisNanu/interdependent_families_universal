import { Redirect } from "expo-router";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Redirect href="/" />;
  }
  return children;
}

export default ProtectedRoute;
