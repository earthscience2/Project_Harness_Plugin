import React from 'react';

/**
 * Lightweight data table. `columns`: {key,header,align?,mono?,width?,render?}.
 * `rows`: array of objects. Optional row selection + click.
 */
export function DataTable({ columns = [], rows = [], getRowId, selectedId, onRowClick, className = '', ...rest }) {
  return (
    <div className={['hns-table-wrap', className].filter(Boolean).join(' ')} {...rest}>
      <table className="hns-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={c.align === 'right' ? 'hns-th--num' : ''} style={c.width ? { width: c.width } : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const id = getRowId ? getRowId(row) : i;
            const selected = selectedId != null && id === selectedId;
            return (
              <tr
                key={id}
                className={selected ? 'is-selected' : ''}
                onClick={onRowClick ? () => onRowClick(row, id) : undefined}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {columns.map((c) => {
                  const tdCls = [
                    c.mono ? 'hns-td--mono' : '',
                    c.align === 'right' ? 'hns-td--num' : '',
                    c.primary ? 'hns-table__primary' : '',
                  ].filter(Boolean).join(' ');
                  return <td key={c.key} className={tdCls}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
