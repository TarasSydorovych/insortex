// src/app/login/layout.js
import React from "react";

export default function LoginLayout({ children }) {
  return (
    <div>
      <header>{/* Ваш хедер */}</header>
      <main>{children}</main>
      <footer>{/* Ваш футер */}</footer>
    </div>
  );
}
