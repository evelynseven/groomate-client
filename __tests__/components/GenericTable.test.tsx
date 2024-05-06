import GenericTable from "../../app/components/GenericTable";
import { render, screen } from "@testing-library/react";
import Link from "next/link";

describe("GenericTable", () => {
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

  interface Item {
    id: string;
    name: string;
    key: string;
  }

  it("should render no data when the array is empty", () => {
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        render: (text: string, record: Item) => (
          <Link href={`items/${record.id}`} className="text-blue-500">
            {text}
          </Link>
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
    ];

    render(<GenericTable<Item> dataSource={[]} columns={columns} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it("should render data with links when the array is not empty", () => {
    const items: Item[] = [
      { id: "1a", name: "evelyn", key: "1a" },
      { id: "2a", name: "mark", key: "2a" },
    ];

    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        render: (text: string, record: Item) => (
          <Link href={`items/${record.id}`} className="text-blue-500">
            {text}
          </Link>
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
    ];

    render(<GenericTable<Item> dataSource={items} columns={columns} />);
    items.forEach((item) => {
      expect(screen.getByText(item.id)).toBeInTheDocument();
    });
  });
});
