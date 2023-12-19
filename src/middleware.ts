/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const ContentSecurityPolicy = `
    default-src 'self' ${process.env.NEXT_PUBLIC_API_URL} ${process.env.NEXT_PUBLIC_CSP_DEFAULT_SRC} blob:;
    style-src 'self'  'unsafe-inline';
    script-src 'self'  'unsafe-eval'  blob:;
    font-src 'self' data:; 
    img-src 'self' data: ${process.env.NEXT_PUBLIC_AWS_URL} ${process.env.NEXT_PUBLIC_CSP_IMG_SRC} blob:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;

  const response = NextResponse.next();

  response.headers.set(
    "Content-Security-Policy",
    ContentSecurityPolicy.replace(/\n/g, "")
  );
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.delete("x-powered-by");

  return response;
}
