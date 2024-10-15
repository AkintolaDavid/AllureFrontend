import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // or use Expo router for React Native

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
