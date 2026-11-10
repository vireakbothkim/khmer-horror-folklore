/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply to every route
        source: "/:path*",
        headers: [
          // Stop other sites from embedding this one in an iframe (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Stop browsers from guessing a file's type from its content
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send only the site origin, not full URLs, to other sites
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Turn off browser features this site does not use
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
