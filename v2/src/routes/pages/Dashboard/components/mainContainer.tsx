import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import clsx from "clsx";
import { useMatches, useNavigate } from "react-router-dom";
import { router } from "@/router";

const MainContainer = ({ titleClassName, noRoute, title, children, className }: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const matches = useMatches();

  // 获取路由配置中的所有有效路径（有实际页面的路由）
  const getValidRoutes = (routes: any[], parentPath = ''): Array<{path: string; hasIndex: boolean}> => {
    return routes.reduce((acc: Array<{path: string; hasIndex: boolean}>, route) => {
      const fullPath = parentPath + '/' + (route.path || '');
      const normalizedPath = fullPath.replace(/\/+/g, '/');
      
      // 检查是否有index路由或实际页面组件
      if (route.element) {
        const hasIndex = route.children?.some((child: any) => child.index && child.element);
        acc.push({ 
          path: normalizedPath, 
          hasIndex: hasIndex 
        });
      }
      
      if (route.children) {
        acc.push(...getValidRoutes(route.children, normalizedPath));
      }
      
      return acc;
    }, []);
  };

  const validRoutes = getValidRoutes(router.routes);
  const currentPath = matches[matches.length - 1].pathname;

  // 判断是否为一级路由
  const isFirstLevel = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    if (pathParts.length === 1) return true;

    // 检查父路径是否有实际页面
    const parentPath = '/' + pathParts.slice(0, -1).join('/');
    const parentRoute = validRoutes.find(route => route.path === parentPath);
    
    // 如果父路径不存在或没有index页面，则当前路径视为一级路由
    return !parentRoute || !parentRoute.hasIndex;
  };

  // 获取上一级有效路径
  const getParentPath = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // 如果是一级路由，返回根路径
    if (isFirstLevel()) return '/';
    
    // 如果最后一部分包含 :，说明是详情页
    if (pathParts[pathParts.length - 1].includes(':')) {
      return '/' + pathParts.slice(0, -1).join('/');
    }
    
    // 返回父级路径
    return '/' + pathParts.slice(0, -1).join('/');
  };

  const parentPath = getParentPath();

  return (
    <div className={clsx(isMobile ? "gap-4" : "gap-8", "flex flex-col")}>
      <div className="flex items-center gap-2">
        {(!isFirstLevel() && !noRoute) ? (
          <div className="cursor-pointer" onClick={() => navigate(parentPath)}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4288 26.0003L6.09554 16.6665M6.09554 16.6665L15.4288 7.14415M6.09554 16.6665L26.0955 16.6665"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : null}
        <div className={clsx("Gemsbuck text-3xl font-semibold", titleClassName)}>
          {typeof title === 'string' ? t(title) : title}
        </div>
      </div>

      <div className={clsx(className, "flex flex-col gap-10 text-sm")}>
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
