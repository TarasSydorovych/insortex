// // src/app/admin/layout.js
// import ProtectedRoute from "@/app/components/protectedRoute";

// export default function AdminLayout({ children }) {
//   return <ProtectedRoute>{children}</ProtectedRoute>;
// }
// src/app/admin/layout.js
import ProtectedRoute from "@/app/components/protectedRoute";
import "./globals.css";
// Layout для адміністративної частини сайту
export default function AdminLayout({ children }) {
  return (
    <>
      <html lang="uk">
        {" "}
        {/* Додаємо тег html з атрибутом lang */}
        <body>
          <ProtectedRoute>{children}</ProtectedRoute>
        </body>
      </html>
    </>
  );
}
