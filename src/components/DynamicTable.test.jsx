import React from "react";
import { render, screen } from "@testing-library/react";
import DynamicTable from "./DynamicTable";

describe("DynamicTable", () => {
  const columns = ["ID", "Name", "Points"];
  const data = [
    { ID: "C001", Name: "Alice", Points: 120 },
    { ID: "C002", Name: "Bob", Points: 90 }
  ];

  test("renders all column headers", () => {
    render(<DynamicTable columns={columns} data={data} />);
    columns.forEach((col) => {
      expect(screen.getByText(col)).toBeInTheDocument();
    });
  });

  test("renders all data rows", () => {
    render(<DynamicTable columns={columns} data={data} />);
    expect(screen.getByText("C001")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();

    expect(screen.getByText("C002")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
  });

  test("handles empty data gracefully", () => {
    render(<DynamicTable columns={columns} data={[]} />);
    expect(screen.queryByText("C001")).not.toBeInTheDocument();
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });

  test("renders no table if columns are empty", () => {
    const { container } = render(<DynamicTable columns={[]} data={data} />);
    expect(container.querySelector("table")).toBeInTheDocument();
    expect(container.querySelectorAll("th").length).toBe(0);
    expect(container.querySelectorAll("td").length).toBe(0);
  });
});
