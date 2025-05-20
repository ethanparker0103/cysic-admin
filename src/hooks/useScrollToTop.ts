import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 在路由变化时自动滚动到页面顶部
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }, [pathname]);
};

export default useScrollToTop; 