import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from "../pages";
import store from "../redux/store";

const renderWithProvider = (ui: React.ReactElement) =>
    render(<Provider store={store}>{ui}</Provider>);

describe("Home Component", () => {
    it("should render user list", () => {
        renderWithProvider(<Home />);

        const listItems = screen.getAllByRole("listitem");
        expect(listItems.length).toBeGreaterThan(0);
    });

    it('should show modal when "Add User" button is clicked', () => {
        renderWithProvider(<Home />);

        const addButton = screen.getByRole("button", { name: /Add User/i });
        fireEvent.click(addButton);

        const modal = screen.getByRole("dialog");
        expect(modal).toBeInTheDocument();
    });

    it('should show modal when "Edit" button is clicked on a user card', () => {
        renderWithProvider(<Home />);

        const editButtons = screen.getAllByRole("button", { name: /Edit/i });
        if (editButtons.length > 0) {
            fireEvent.click(editButtons[0]);
        }

        const modal = screen.getByRole("dialog");
        expect(modal).toBeInTheDocument();
    });
});
