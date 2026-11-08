import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart.jsx";

const { mockDispatch, mockNavigate } = vi.hoisted(() => ({
  mockDispatch: vi.fn(),
  mockNavigate: vi.fn(),
}));

let mockCartItems = [];

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector) =>
    selector({ cart: { items: mockCartItems } }),
}));

vi.mock("react-router-dom", () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => mockNavigate,
}));

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Redux/cartSlice.js";

const sampleProducts = [
  {
    id: 1,
    title: "Test Smartphone",
    price: 500,
    quantity: 2,
    thumbnail: "phone.jpg",
  },
  {
    id: 2,
    title: "Test Headphones",
    price: 100,
    quantity: 1,
    thumbnail: "headphones.jpg",
  },
];

describe("Cart Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCartItems = [];
  });

  it("shows empty cart message", () => {
    render(<Cart />);

    expect(screen.getByText("Your cart is empty!")).toBeInTheDocument();
  });

  it("displays cart products", () => {
    mockCartItems = sampleProducts;

    render(<Cart />);

    expect(screen.getByText("Test Smartphone")).toBeInTheDocument();
    expect(screen.getByText("Test Headphones")).toBeInTheDocument();
  });

  it("calculates the total amount correctly", () => {
    mockCartItems = sampleProducts;

    render(<Cart />);

    expect(screen.getByText("$1100.00")).toBeInTheDocument();
  });

  it("dispatches quantity increase and decrease", () => {
    mockCartItems = sampleProducts;

    render(<Cart />);

    fireEvent.click(screen.getAllByRole("button", { name: "+" })[0]);
    expect(mockDispatch).toHaveBeenCalledWith(increaseQuantity(1));

    fireEvent.click(screen.getAllByRole("button", { name: "−" })[0]);
    expect(mockDispatch).toHaveBeenCalledWith(decreaseQuantity(1));
  });

  it("removes a product from cart", () => {
    mockCartItems = sampleProducts;

    render(<Cart />);

    fireEvent.click(
      screen.getAllByRole("button", { name: "Remove from Cart" })[0]
    );

    expect(mockDispatch).toHaveBeenCalledWith(removeFromCart(1));
  });

  it("navigates to checkout", () => {
    mockCartItems = sampleProducts;

    render(<Cart />);

    fireEvent.click(
      screen.getByRole("button", { name: "Proceed to Checkout" })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/checkout");
  });
});