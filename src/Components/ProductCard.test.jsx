import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";

const { mockDispatch, mockNavigate } = vi.hoisted(() => ({
  mockDispatch: vi.fn(),
  mockNavigate: vi.fn(),
}));

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector) =>
    selector({ favorite: { items: [] } }),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

import { addToCart } from "../Redux/cartSlice";
import { addToFavorite } from "../Redux/FavoriteSlice";

const product = {
  id: 1,
  title: "Test Smartphone",
  price: 500,
  discountPercentage: 10,
  thumbnail: "https://example.com/phone.jpg",
  rating: 4.5,
  stock: 10,
};

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays product information", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText("Test Smartphone")).toBeInTheDocument();
    expect(screen.getByText("$500.00")).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
  });

  it("adds product to cart when clicked", () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<ProductCard product={product} />);

    fireEvent.click(screen.getByRole("button", {
      name: "Add to Cart",
    }));

    expect(mockDispatch).toHaveBeenCalledWith(addToCart(product));
  });

  it("adds product to favorites when clicked", () => {
    render(<ProductCard product={product} />);

    fireEvent.click(screen.getByRole("button", {
      name: "🤍",
    }));

    expect(mockDispatch).toHaveBeenCalledWith(
      addToFavorite(product)
    );
  });
});