import { render, screen } from "@testing-library/react";
import EditCustomer from "./EditCustomer";
import { expect } from "vitest";

const mockCustomer = {
  id: "123customer",
  firstName: "Evelyn",
  lastName: "Sun",
  fullName: "Evelyn Sun",
  phoneNumber: "4373407590",
  email: "evelynsun166@gmail.com",
  address: "test address",
  remarks: "test remarks",
};

const closeDrawer = vitest.fn;
const actionAfter = vitest.fn;

describe("EditCustomer", () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  it("should render no data when the object is empty", () => {
    render(
      <EditCustomer
        openStatus={true}
        closeDrawer={closeDrawer}
        getCustomers={actionAfter}
      />
    );
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("Evelyn")).toBeNull();
  });

  it("should render data when the object is not empty", () => {
    render(
      <EditCustomer
        openStatus={true}
        closeDrawer={closeDrawer}
        getCustomers={actionAfter}
        fieldsValue={mockCustomer}
      />
    );
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockCustomer.firstName)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockCustomer.lastName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockCustomer.email)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockCustomer.phoneNumber)
    ).toBeInTheDocument();
  });
});
