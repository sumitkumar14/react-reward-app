import React from 'react';
import PropTypes from 'prop-types';

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};

/**
 * Renders a dynamic table based on provided column headers and row data.
 *
 * @component
 * @param {Object} props
 * @param {string[]} props.columns - Array of column headers to display in the table.
 * @param {Object[]} props.data - Array of data rows, where each object maps keys to column names.
 *
 * @example
 * const columns = ['Name', 'Points'];
 * const data = [{ Name: 'Alice', Points: 150 }, { Name: 'Bob', Points: 200 }];
 *
 * <DynamicTable columns={columns} data={data} />
 */

const DynamicTable = ({ columns, data }) => {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} style={thStyle}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col} style={tdStyle}>
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
DynamicTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default DynamicTable;
