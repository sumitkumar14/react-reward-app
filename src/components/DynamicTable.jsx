import React from 'react';
import PropTypes from 'prop-types';

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
};

const containerStyle = {
  maxHeight: '400px',
  overflowY: 'auto',
  border: '1px solid #ddd',
  marginTop: '1rem',
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
  position: 'sticky',
  top: 0,
  backgroundClip: 'padding-box',
  zIndex: 1,
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};

/**
 * Renders a dynamic table inside a scrollable container with fixed height,
 * useful for enabling infinite scroll or large datasets.
 *
 * @component
 */
const DynamicTable = ({ columns, data }) => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

DynamicTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DynamicTable;
