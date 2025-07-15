import { createMiddleware } from "@mfe/cc-front-shared";

export const config = {
  matcher: ["/", "/op/:path*", "/op/api/:path*"],
};

const middlewareConfig = {
  publicRoutes: [
  ],
  protectedRoutes: [
  ],
  defaultRedirect: "/valida-token",
};

export const middleware = createMiddleware(middlewareConfig);