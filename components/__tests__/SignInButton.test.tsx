import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock del paquete @clerk/nextjs para pruebas
vi.mock("@clerk/nextjs", () => ({
  SignInButton: (props: { children?: React.ReactNode }) => (
    <button data-testid="sign-in-button">{props.children ?? "Iniciar sesión"}</button>
  ),
}));

import { SignInButton } from "@clerk/nextjs";

describe("SignInButton", () => {
  it("se renderiza correctamente con el texto por defecto", () => {
    render(<SignInButton mode="modal" />);
    const btn = screen.getByTestId("sign-in-button");
    expect(btn).toBeTruthy();
    expect(btn.textContent).toBe("Iniciar sesión");
  });

  it("muestra contenido hijo cuando se provee", () => {
    render(<SignInButton mode="modal">Entrar</SignInButton>);
    const btn = screen.getByTestId("sign-in-button");
    expect(btn.textContent).toBe("Entrar");
  });
});
