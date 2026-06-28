/* @ds-bundle: {"format":3,"namespace":"HarnessOpsDesignSystem_019284","components":[{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"DataTable","sourcePath":"components/display/DataTable.jsx"},{"name":"ProgressBar","sourcePath":"components/display/ProgressBar.jsx"},{"name":"Stat","sourcePath":"components/display/Stat.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"StatusBadge","sourcePath":"components/feedback/StatusBadge.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Radio","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/display/Card.jsx":"2999e050ca5c","components/display/DataTable.jsx":"7593e07c9d30","components/display/ProgressBar.jsx":"8778c967226a","components/display/Stat.jsx":"b176f056d2e2","components/feedback/Badge.jsx":"7f17e2bd610b","components/feedback/Spinner.jsx":"e0c811af1630","components/feedback/StatusBadge.jsx":"fd1271354b62","components/feedback/Tag.jsx":"de4a014bca92","components/forms/Button.jsx":"394778dc06ba","components/forms/Checkbox.jsx":"2fa06e867aca","components/forms/IconButton.jsx":"0c2bf5be14d4","components/forms/Input.jsx":"a965beb98d56","components/forms/Select.jsx":"804724d45e1e","components/forms/Switch.jsx":"c9fe0e9adec3","components/navigation/Tabs.jsx":"00d9c858a277","ui_kits/harness-console/AppShell.jsx":"867cb2650b68","ui_kits/harness-console/DashboardScreen.jsx":"dfa265042598","ui_kits/harness-console/RunsScreen.jsx":"9a3fa061b873","ui_kits/harness-console/data.jsx":"c509df001c04","ui_kits/harness-console/icons.jsx":"0d53351c4ae8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HarnessOpsDesignSystem_019284 = window.HarnessOpsDesignSystem_019284 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Container surface. Compose with Card.Header / Card.Body / Card.Footer,
 * or pass `title`/`subtitle`/`actions` for the common header shortcut.
 */
function Card({
  title,
  subtitle,
  actions,
  inset = false,
  interactive = false,
  className = '',
  children,
  ...rest
}) {
  const cls = ['hns-card', inset ? 'hns-card--inset' : '', interactive ? 'hns-card--interactive' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), (title || actions) && /*#__PURE__*/React.createElement("div", {
    className: "hns-card__header"
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    className: "hns-card__title"
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    className: "hns-card__subtitle"
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)'
    }
  }, actions)), children);
}
Card.Header = function CardHeader({
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['hns-card__header', className].filter(Boolean).join(' ')
  }, rest), children);
};
Card.Body = function CardBody({
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['hns-card__body', className].filter(Boolean).join(' ')
  }, rest), children);
};
Card.Footer = function CardFooter({
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['hns-card__footer', className].filter(Boolean).join(' ')
  }, rest), children);
};
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Lightweight data table. `columns`: {key,header,align?,mono?,width?,render?}.
 * `rows`: array of objects. Optional row selection + click.
 */
function DataTable({
  columns = [],
  rows = [],
  getRowId,
  selectedId,
  onRowClick,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['hns-table-wrap', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("table", {
    className: "hns-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    className: c.align === 'right' ? 'hns-th--num' : '',
    style: c.width ? {
      width: c.width
    } : undefined
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => {
    const id = getRowId ? getRowId(row) : i;
    const selected = selectedId != null && id === selectedId;
    return /*#__PURE__*/React.createElement("tr", {
      key: id,
      className: selected ? 'is-selected' : '',
      onClick: onRowClick ? () => onRowClick(row, id) : undefined,
      style: onRowClick ? {
        cursor: 'pointer'
      } : undefined
    }, columns.map(c => {
      const tdCls = [c.mono ? 'hns-td--mono' : '', c.align === 'right' ? 'hns-td--num' : '', c.primary ? 'hns-table__primary' : ''].filter(Boolean).join(' ');
      return /*#__PURE__*/React.createElement("td", {
        key: c.key,
        className: tdCls
      }, c.render ? c.render(row[c.key], row) : row[c.key]);
    }));
  }))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/display/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Linear progress bar. Single value (0–100) or a `segments` array
 * of {value,color} for stacked pass/fail/skip bars.
 */
function ProgressBar({
  value = 0,
  tone = 'accent',
  segments,
  className = '',
  style,
  ...rest
}) {
  if (segments) {
    return /*#__PURE__*/React.createElement("div", _extends({
      className: ['hns-progress', 'hns-progress--split', className].filter(Boolean).join(' '),
      style: style
    }, rest), segments.map((s, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "hns-progress__seg",
      style: {
        width: `${s.value}%`,
        background: s.color
      }
    })));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['hns-progress', `hns-progress--${tone}`, className].filter(Boolean).join(' '),
    style: style
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "hns-progress__fill",
    style: {
      width: `${Math.max(0, Math.min(100, value))}%`
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/display/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ARROWS = {
  up: 'M8 3.5v9M4.5 7L8 3.5 11.5 7',
  down: 'M8 12.5v-9M4.5 9L8 12.5 11.5 9',
  flat: 'M3.5 8h9'
};

/**
 * Single KPI: label, large monospace value, optional delta.
 */
function Stat({
  label,
  value,
  unit,
  delta,
  trend = 'flat',
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['hns-stat', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "hns-stat__label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "hns-stat__row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hns-stat__value"
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'var(--text-tertiary)',
      marginLeft: 2
    }
  }, unit)), delta != null && /*#__PURE__*/React.createElement("span", {
    className: `hns-stat__delta hns-stat__delta--${trend}`
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: ARROWS[trend],
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), delta)));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Stat.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small label for counts, categories, metadata.
 */
function Badge({
  tone = 'neutral',
  variant = 'soft',
  pill = false,
  className = '',
  children,
  ...rest
}) {
  const cls = ['hns-badge', `hns-badge--${tone}`, variant === 'solid' ? 'hns-badge--solid' : '', variant === 'outline' ? 'hns-badge--outline' : '', pill ? 'hns-badge--pill' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Indeterminate loading spinner. Size in px.
 */
function Spinner({
  size = 16,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['hns-spinner', className].filter(Boolean).join(' '),
    style: {
      width: size,
      height: size,
      ...style
    },
    role: "status",
    "aria-label": "\uB85C\uB529 \uC911"
  }, rest));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LABELS = {
  passed: '통과',
  failed: '실패',
  error: '오류',
  running: '실행 중',
  queued: '대기',
  skipped: '건너뜀'
};

/**
 * Run-lifecycle status pill with a colored dot. The `running` state
 * pulses. Pass `label` to override the default Korean label.
 */
function StatusBadge({
  status = 'queued',
  label,
  className = '',
  ...rest
}) {
  const cls = ['hns-status', `hns-status--${status}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "hns-status__dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, label ?? LABELS[status] ?? status));
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Removable token, typically for filters/labels. Monospace by default.
 */
function Tag({
  onRemove,
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['hns-tag', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("span", null, children), onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hns-tag__remove",
    "aria-label": "\uC81C\uAC70",
    onClick: onRemove
  }, /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Primary action control. Variants map to the token system:
 * primary (accent fill), secondary (neutral), ghost, subtle (accent tint), danger.
 */
function Button({
  variant = 'secondary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const cls = ['hns-btn', `hns-btn--${variant}`, size !== 'md' ? `hns-btn--${size}` : '', loading ? 'is-loading' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: disabled || loading,
    "aria-busy": loading || undefined
  }, rest), loading ? /*#__PURE__*/React.createElement("span", {
    className: "hns-spinner hns-btn__spinner",
    "aria-hidden": "true"
  }) : iconLeft && /*#__PURE__*/React.createElement("span", {
    className: "hns-icon",
    "aria-hidden": "true"
  }, iconLeft), children != null && /*#__PURE__*/React.createElement("span", null, children), !loading && iconRight && /*#__PURE__*/React.createElement("span", {
    className: "hns-icon",
    "aria-hidden": "true"
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox with a label. Use `radio` styling via the Radio export.
 */
function Checkbox({
  label,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['hns-check', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "hns-check__box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.5 8.5l3 3 6-6.5",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label != null && /*#__PURE__*/React.createElement("span", null, label));
}

/**
 * Radio button with a label. Group via a shared `name`.
 */
function Radio({
  label,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['hns-check', 'hns-check--radio', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "hns-check__box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hns-check__dot"
  })), label != null && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox, Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only button. Provide an aria-label for accessibility.
 */
function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const cls = ['hns-btn', 'hns-btn--icon', `hns-btn--${variant}`, size !== 'md' ? `hns-btn--${size}` : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    "aria-label": label,
    title: label,
    disabled: disabled
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "hns-icon",
    "aria-hidden": "true"
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text field with optional label, hint, error, and leading icon.
 * Pass `mono` for identifier / numeric inputs.
 */
function Input({
  label,
  hint,
  error,
  required = false,
  optional = false,
  size = 'md',
  mono = false,
  iconLeft = null,
  id,
  className = '',
  ...rest
}) {
  const fieldId = id || (label ? `hns-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const inputCls = ['hns-input', size !== 'md' ? `hns-input--${size}` : '', mono ? 'hns-input--mono' : '', error ? 'hns-input--invalid' : '', className].filter(Boolean).join(' ');
  const control = iconLeft ? /*#__PURE__*/React.createElement("div", {
    className: "hns-input-group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hns-input-group__icon",
    "aria-hidden": "true"
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: inputCls,
    "aria-invalid": !!error || undefined
  }, rest))) : /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: inputCls,
    "aria-invalid": !!error || undefined
  }, rest));
  if (!label && !hint && !error) return control;
  return /*#__PURE__*/React.createElement("div", {
    className: "hns-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "hns-label",
    htmlFor: fieldId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "hns-label__req",
    "aria-hidden": "true"
  }, "*"), optional && /*#__PURE__*/React.createElement("span", {
    className: "hns-label__opt"
  }, "\uC120\uD0DD")), control, error ? /*#__PURE__*/React.createElement("span", {
    className: "hns-error"
  }, error) : hint && /*#__PURE__*/React.createElement("span", {
    className: "hns-hint"
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Styled native select with a chevron. Options via `options` array
 * ({label,value} or string) or children.
 */
function Select({
  label,
  hint,
  error,
  options,
  size = 'md',
  id,
  className = '',
  children,
  ...rest
}) {
  const fieldId = id || (label ? `hns-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const selCls = ['hns-select__el', size !== 'md' ? `hns-input--${size}` : '', className].filter(Boolean).join(' ');
  const control = /*#__PURE__*/React.createElement("div", {
    className: "hns-select"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: selCls,
    "aria-invalid": !!error || undefined
  }, rest), options ? options.map(o => {
    const opt = typeof o === 'string' ? {
      label: o,
      value: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  }) : children), /*#__PURE__*/React.createElement("svg", {
    className: "hns-select__chevron",
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
  if (!label && !hint && !error) return control;
  return /*#__PURE__*/React.createElement("div", {
    className: "hns-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "hns-label",
    htmlFor: fieldId
  }, label), control, error ? /*#__PURE__*/React.createElement("span", {
    className: "hns-error"
  }, error) : hint && /*#__PURE__*/React.createElement("span", {
    className: "hns-hint"
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Toggle switch with an optional label.
 */
function Switch({
  label,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['hns-switch', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "hns-switch__track",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hns-switch__thumb"
  })), label != null && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tab strip. Controlled via `value`/`onChange`, or uncontrolled with
 * `defaultValue`. Items: {value,label,count?}.
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  className = '',
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = value !== undefined ? value : internal;
  const select = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  const cls = ['hns-tabs', variant === 'enclosed' ? 'hns-tabs--enclosed' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "tablist"
  }, rest), items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.value,
    type: "button",
    role: "tab",
    "aria-selected": active === it.value,
    className: ['hns-tab', active === it.value ? 'is-active' : ''].filter(Boolean).join(' '),
    onClick: () => select(it.value)
  }, it.icon && /*#__PURE__*/React.createElement("span", {
    className: "hns-icon",
    "aria-hidden": "true"
  }, it.icon), /*#__PURE__*/React.createElement("span", null, it.label), it.count != null && /*#__PURE__*/React.createElement("span", {
    className: "hns-tab__count"
  }, it.count))));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/harness-console/AppShell.jsx
try { (() => {
/* App shell: fixed sidebar + topbar. */
const Icon = window.HNSIcon;
const NAV = [{
  key: 'dashboard',
  label: '대시보드',
  icon: 'dashboard'
}, {
  key: 'runs',
  label: '실행',
  icon: 'list',
  badge: '4'
}, {
  key: 'suites',
  label: '스위트',
  icon: 'flask'
}, {
  key: 'datasets',
  label: '데이터셋',
  icon: 'database'
}, {
  key: 'metrics',
  label: '메트릭',
  icon: 'gauge'
}];
const shellStyles = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'var(--sidebar-w) 1fr',
    gridTemplateRows: 'var(--topbar-h) 1fr',
    height: '100vh',
    background: 'var(--bg-app)',
    color: 'var(--text-primary)'
  },
  sidebar: {
    gridRow: '1 / 3',
    borderRight: '1px solid var(--border-subtle)',
    background: 'var(--bg-canvas)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0
  },
  brand: {
    height: 'var(--topbar-h)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 var(--space-5)',
    borderBottom: '1px solid var(--border-subtle)'
  },
  word: {
    fontWeight: 700,
    fontSize: '16px',
    letterSpacing: '-0.01em'
  },
  ops: {
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    fontSize: '11px',
    color: 'var(--accent-text)',
    background: 'var(--accent-soft)',
    padding: '2px 5px',
    borderRadius: 'var(--radius-sm)'
  },
  nav: {
    padding: 'var(--space-4) var(--space-3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
    overflowY: 'auto'
  },
  navLabel: {
    fontSize: 'var(--text-2xs)',
    fontWeight: 600,
    letterSpacing: 'var(--tracking-caps)',
    textTransform: 'uppercase',
    color: 'var(--text-tertiary)',
    padding: '0 var(--space-3)',
    margin: 'var(--space-3) 0 var(--space-2)'
  },
  sideFoot: {
    padding: 'var(--space-3)',
    borderTop: '1px solid var(--border-subtle)'
  },
  topbar: {
    gridColumn: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    padding: '0 var(--space-6)',
    borderBottom: '1px solid var(--border-subtle)',
    background: 'var(--bg-canvas)'
  },
  title: {
    fontSize: 'var(--text-md)',
    fontWeight: 600
  },
  spacer: {
    flex: 1
  },
  search: {
    position: 'relative',
    width: '260px'
  },
  main: {
    gridColumn: 2,
    overflowY: 'auto',
    minHeight: 0,
    padding: 'var(--space-7) var(--space-8)'
  }
};
function NavItem({
  item,
  active,
  onClick
}) {
  const base = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: '36px',
    padding: '0 var(--space-3)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
    background: active ? 'var(--surface-2)' : 'transparent',
    transition: 'var(--transition-colors)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: base,
    onClick: onClick,
    onMouseEnter: e => {
      if (!active) e.currentTarget.style.background = 'var(--surface-hover)';
    },
    onMouseLeave: e => {
      if (!active) e.currentTarget.style.background = 'transparent';
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: item.icon,
    size: 17,
    style: {
      color: active ? 'var(--accent-text)' : 'var(--text-tertiary)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, item.label), item.badge && /*#__PURE__*/React.createElement("span", {
    className: "hns-tab__count"
  }, item.badge));
}
function AppShell({
  active,
  onNav,
  title,
  actions,
  children,
  accent,
  onCycleAccent,
  theme,
  onToggleTheme
}) {
  const {
    IconButton
  } = window.HarnessOpsDesignSystem_019284;
  return /*#__PURE__*/React.createElement("div", {
    style: shellStyles.root
  }, /*#__PURE__*/React.createElement("aside", {
    style: shellStyles.sidebar
  }, /*#__PURE__*/React.createElement("div", {
    style: shellStyles.brand
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/logo-mark.svg",
    width: "26",
    height: "26",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: shellStyles.word
  }, "Harness"), /*#__PURE__*/React.createElement("span", {
    style: shellStyles.ops
  }, "ops")), /*#__PURE__*/React.createElement("nav", {
    style: shellStyles.nav
  }, /*#__PURE__*/React.createElement("div", {
    style: shellStyles.navLabel
  }, "\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4"), NAV.map(it => /*#__PURE__*/React.createElement(NavItem, {
    key: it.key,
    item: it,
    active: active === it.key,
    onClick: () => onNav(it.key)
  })), /*#__PURE__*/React.createElement("div", {
    style: shellStyles.navLabel
  }, "\uC2DC\uC2A4\uD15C"), /*#__PURE__*/React.createElement(NavItem, {
    item: {
      key: 'settings',
      label: '설정',
      icon: 'settings'
    },
    active: active === 'settings',
    onClick: () => onNav('settings')
  })), /*#__PURE__*/React.createElement("div", {
    style: shellStyles.sideFoot
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '6px var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'var(--surface-3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 15
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "\uAE40\uD558\uB124\uC2A4"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-tertiary)'
    }
  }, "ML \uD50C\uB7AB\uD3FC\uD300"))))), /*#__PURE__*/React.createElement("header", {
    style: shellStyles.topbar
  }, /*#__PURE__*/React.createElement("span", {
    style: shellStyles.title
  }, title), /*#__PURE__*/React.createElement("div", {
    style: shellStyles.spacer
  }), /*#__PURE__*/React.createElement("div", {
    className: "hns-input-group",
    style: shellStyles.search
  }, /*#__PURE__*/React.createElement("span", {
    className: "hns-input-group__icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15
  })), /*#__PURE__*/React.createElement("input", {
    className: "hns-input hns-input--sm",
    placeholder: "run id, suite \uAC80\uC0C9\u2026"
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "\uC561\uC13C\uD2B8 \uBCC0\uACBD",
    variant: "ghost",
    onClick: onCycleAccent
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 17
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "\uD14C\uB9C8 \uC804\uD658",
    variant: "ghost",
    onClick: onToggleTheme
  }, /*#__PURE__*/React.createElement(Icon, {
    name: theme === 'light' ? 'cpu' : 'gauge',
    size: 17
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "\uC54C\uB9BC",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 17
  })), actions), /*#__PURE__*/React.createElement("main", {
    style: shellStyles.main
  }, children));
}
window.HNSAppShell = AppShell;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/harness-console/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/harness-console/DashboardScreen.jsx
try { (() => {
/* Dashboard: KPIs, trend, active runs, suite breakdown. */
const Icon = window.HNSIcon;
function DashboardScreen({
  onOpenRun
}) {
  const {
    Card,
    Stat,
    ProgressBar,
    StatusBadge,
    Badge,
    Button,
    DataTable
  } = window.HarnessOpsDesignSystem_019284;
  const {
    RUNS,
    timeAgo
  } = window.HNSData;
  const recent = RUNS.slice(0, 6);
  const active = RUNS.filter(r => r.status === 'running' || r.status === 'queued').slice(0, 3);

  // 14-day pass-rate trend (mock)
  const trend = [88, 90, 87, 91, 93, 92, 94, 91, 95, 93, 96, 94, 95, 94.2];
  const maxT = 100,
    minT = 80;
  const suiteBreak = [{
    name: 'reasoning-v3',
    pass: 96,
    fail: 3,
    skip: 1
  }, {
    name: 'rag-grounding',
    pass: 88,
    fail: 9,
    skip: 3
  }, {
    name: 'safety-redteam',
    pass: 71,
    fail: 26,
    skip: 3
  }, {
    name: 'multilingual-ko',
    pass: 84,
    fail: 12,
    skip: 4
  }, {
    name: 'tool-use',
    pass: 92,
    fail: 6,
    skip: 2
  }];
  const grid = {
    display: 'grid',
    gap: 'var(--space-5)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...grid,
      maxWidth: 'var(--container-max)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Stat, {
    label: "\uC804\uCCB4 \uD1B5\uACFC\uC728",
    value: "94.2",
    unit: "%",
    delta: "+1.4%",
    trend: "up"
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Stat, {
    label: "\uD65C\uC131 \uC2E4\uD589",
    value: "4",
    delta: "2 \uB300\uAE30",
    trend: "flat"
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Stat, {
    label: "\uD3C9\uADE0 \uC9C0\uC5F0",
    value: "312",
    unit: "ms",
    delta: "-8ms",
    trend: "down"
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Stat, {
    label: "24h \uBE44\uC6A9",
    value: "$48.10",
    delta: "+$3.2",
    trend: "up"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.55fr 1fr',
      gap: 'var(--space-5)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "\uD1B5\uACFC\uC728 \uCD94\uC138",
    subtitle: "\uCD5C\uADFC 14\uC77C",
    actions: /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      variant: "soft"
    }, "+1.4%")
  }, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '8px',
      height: '150px',
      padding: '0 2px'
    }
  }, trend.map((v, i) => {
    const h = (v - minT) / (maxT - minT) * 100;
    const last = i === trend.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      title: v + '%',
      style: {
        height: h + '%',
        background: last ? 'var(--accent)' : 'var(--accent-soft)',
        borderRadius: 'var(--radius-xs) var(--radius-xs) 0 0',
        minHeight: '4px',
        transition: 'height var(--duration-slow) var(--ease-out)'
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px',
      fontSize: 'var(--text-2xs)',
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "14\uC77C \uC804"), /*#__PURE__*/React.createElement("span", null, "\uC624\uB298 94.2%")))), /*#__PURE__*/React.createElement(Card, {
    title: "\uD65C\uC131 \uC2E4\uD589",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "\uC804\uCCB4 \uBCF4\uAE30")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, active.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: 'var(--space-3) var(--space-5)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flask",
    size: 16,
    style: {
      color: 'var(--text-tertiary)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      color: 'var(--text-primary)'
    }
  }, r.suite), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-tertiary)'
    }
  }, r.id, " \xB7 ", r.model)), /*#__PURE__*/React.createElement(StatusBadge, {
    status: r.status
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.55fr 1fr',
      gap: 'var(--space-5)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "\uCD5C\uADFC \uC2E4\uD589",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "external",
        size: 14
      })
    }, "\uC2E4\uD589 \uBAA9\uB85D")
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'id',
      header: 'Run ID',
      mono: true
    }, {
      key: 'suite',
      header: 'Suite',
      primary: true
    }, {
      key: 'status',
      header: '상태',
      render: v => /*#__PURE__*/React.createElement(StatusBadge, {
        status: v
      })
    }, {
      key: 'passRate',
      header: '통과율',
      align: 'right',
      mono: true,
      render: v => v == null ? '—' : v.toFixed(1) + '%'
    }, {
      key: 'hoursAgo',
      header: '시각',
      align: 'right',
      render: v => /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-tertiary)'
        }
      }, timeAgo(v))
    }],
    rows: recent,
    getRowId: r => r.id,
    onRowClick: r => onOpenRun && onOpenRun(r),
    style: {
      border: 'none',
      borderRadius: 0
    }
  })), /*#__PURE__*/React.createElement(Card, {
    title: "\uC2A4\uC704\uD2B8\uBCC4 \uD1B5\uACFC\uC728"
  }, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, suiteBreak.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '7px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, s.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: s.pass < 80 ? 'var(--warning-text)' : 'var(--text-primary)'
    }
  }, s.pass, "%")), /*#__PURE__*/React.createElement(ProgressBar, {
    segments: [{
      value: s.pass,
      color: 'var(--success)'
    }, {
      value: s.fail,
      color: 'var(--danger)'
    }, {
      value: s.skip,
      color: 'var(--neutral-status)'
    }]
  }))))))));
}
window.HNSDashboard = DashboardScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/harness-console/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/harness-console/RunsScreen.jsx
try { (() => {
/* Runs: the core data-table management surface + detail drawer. */
const Icon = window.HNSIcon;
function RunDrawer({
  run,
  onClose
}) {
  const {
    StatusBadge,
    Stat,
    Button,
    IconButton,
    DataTable,
    Badge
  } = window.HarnessOpsDesignSystem_019284;
  const {
    CASES
  } = window.HNSData;
  if (!run) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--overlay-scrim)',
      zIndex: 40,
      animation: 'hns-fade 160ms ease'
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '480px',
      maxWidth: '92vw',
      background: 'var(--surface-1)',
      borderLeft: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 41,
      display: 'flex',
      flexDirection: 'column',
      animation: 'hns-slide 220ms var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: 'var(--space-4) var(--space-5)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-tertiary)'
    }
  }, run.id), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      flex: 1
    }
  }, run.suite), /*#__PURE__*/React.createElement(IconButton, {
    label: "\uB2EB\uAE30",
    variant: "ghost",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: run.status
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "cpu",
    size: 12,
    style: {
      marginRight: 4
    }
  }), run.model), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "gitBranch",
    size: 12,
    style: {
      marginRight: 4
    }
  }), run.branch)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 'var(--space-5)',
      padding: 'var(--space-4)',
      background: 'var(--surface-2)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "\uCF00\uC774\uC2A4",
    value: run.cases.toLocaleString()
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "\uD1B5\uACFC\uC728",
    value: run.passRate == null ? '—' : run.passRate.toFixed(1),
    unit: run.passRate == null ? '' : '%'
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "\uD3C9\uADE0 \uC9C0\uC5F0",
    value: run.latency,
    unit: "ms"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "\uBE44\uC6A9",
    value: '$' + run.cost
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, "\uCF00\uC774\uC2A4 \uACB0\uACFC"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 14
    })
  }, "\uB0B4\uBCF4\uB0B4\uAE30")), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'id',
      header: 'ID',
      mono: true,
      width: '74px'
    }, {
      key: 'name',
      header: '케이스',
      primary: true
    }, {
      key: 'status',
      header: '',
      render: v => /*#__PURE__*/React.createElement(StatusBadge, {
        status: v
      })
    }, {
      key: 'score',
      header: '점수',
      align: 'right',
      mono: true,
      render: v => v == null ? '—' : v.toFixed(2)
    }],
    rows: CASES,
    getRowId: r => r.id
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      gap: 'var(--space-2)',
      padding: 'var(--space-4) var(--space-5)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "refresh",
      size: 15
    })
  }, "\uC7AC\uC2E4\uD589"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "fileText",
      size: 15
    })
  }, "\uB85C\uADF8"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    label: "\uB354\uBCF4\uAE30",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more",
    size: 18
  })))));
}
function RunsScreen({
  openRun,
  setOpenRun
}) {
  const {
    Tabs,
    Button,
    IconButton,
    Tag,
    DataTable,
    StatusBadge,
    ProgressBar,
    Badge
  } = window.HarnessOpsDesignSystem_019284;
  const {
    RUNS,
    timeAgo
  } = window.HNSData;
  const [tab, setTab] = React.useState('all');
  const [selected, setSelected] = React.useState(() => new Set());
  const [filters, setFilters] = React.useState(['model:gpt-4o', 'env:staging']);
  const counts = {
    all: RUNS.length,
    failed: RUNS.filter(r => r.status === 'failed' || r.status === 'error').length,
    running: RUNS.filter(r => r.status === 'running' || r.status === 'queued').length,
    passed: RUNS.filter(r => r.status === 'passed').length
  };
  const rows = RUNS.filter(r => {
    if (tab === 'failed') return r.status === 'failed' || r.status === 'error';
    if (tab === 'running') return r.status === 'running' || r.status === 'queued';
    if (tab === 'passed') return r.status === 'passed';
    return true;
  });
  const toggle = id => setSelected(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const allOn = rows.length > 0 && rows.every(r => selected.has(r.id));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'all',
      label: '전체',
      count: counts.all
    }, {
      value: 'failed',
      label: '실패',
      count: counts.failed
    }, {
      value: 'running',
      label: '진행',
      count: counts.running
    }, {
      value: 'passed',
      label: '통과',
      count: counts.passed
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "filter",
      size: 14
    })
  }, "\uD544\uD130"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "play",
      size: 14
    })
  }, "\uC0C8 \uC2E4\uD589"))), (filters.length > 0 || selected.size > 0) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      flexWrap: 'wrap'
    }
  }, selected.size > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    pill: true
  }, selected.size, " \uC120\uD0DD\uB428"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "refresh",
      size: 14
    })
  }, "\uC7AC\uC2E4\uD589"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 14
    })
  }, "\uB0B4\uBCF4\uB0B4\uAE30"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 20,
      background: 'var(--border-default)',
      margin: '0 4px'
    }
  })), filters.map(f => /*#__PURE__*/React.createElement(Tag, {
    key: f,
    onRemove: () => setFilters(filters.filter(x => x !== f))
  }, f))), /*#__PURE__*/React.createElement("div", {
    className: "hns-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "hns-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 40
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: allOn,
    onChange: () => setSelected(allOn ? new Set() : new Set(rows.map(r => r.id))),
    style: {
      accentColor: 'var(--accent)'
    }
  })), /*#__PURE__*/React.createElement("th", null, "Run ID"), /*#__PURE__*/React.createElement("th", null, "Suite"), /*#__PURE__*/React.createElement("th", null, "Model"), /*#__PURE__*/React.createElement("th", null, "\uC0C1\uD0DC"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 150
    }
  }, "\uD1B5\uACFC\uC728"), /*#__PURE__*/React.createElement("th", {
    className: "hns-th--num"
  }, "\uCF00\uC774\uC2A4"), /*#__PURE__*/React.createElement("th", {
    className: "hns-th--num"
  }, "\uC9C0\uC5F0"), /*#__PURE__*/React.createElement("th", {
    className: "hns-th--num"
  }, "\uBE44\uC6A9"), /*#__PURE__*/React.createElement("th", {
    className: "hns-th--num"
  }, "\uC2DC\uAC01"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 44
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id,
    className: selected.has(r.id) ? 'is-selected' : '',
    style: {
      cursor: 'pointer'
    },
    onClick: () => setOpenRun(r)
  }, /*#__PURE__*/React.createElement("td", {
    onClick: e => {
      e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: selected.has(r.id),
    onChange: () => toggle(r.id),
    style: {
      accentColor: 'var(--accent)'
    }
  })), /*#__PURE__*/React.createElement("td", {
    className: "hns-td--mono",
    style: {
      color: 'var(--text-secondary)'
    }
  }, r.id), /*#__PURE__*/React.createElement("td", {
    className: "hns-table__primary"
  }, r.suite), /*#__PURE__*/React.createElement("td", {
    className: "hns-td--mono",
    style: {
      fontSize: 'var(--text-xs)'
    }
  }, r.model), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusBadge, {
    status: r.status
  })), /*#__PURE__*/React.createElement("td", null, r.passRate == null ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)'
    }
  }, "\u2014") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: r.passRate,
    tone: r.passRate < 75 ? 'warning' : 'success',
    style: {
      width: 80
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "num",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)'
    }
  }, r.passRate.toFixed(0), "%"))), /*#__PURE__*/React.createElement("td", {
    className: "hns-td--num hns-td--mono"
  }, r.cases.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    className: "hns-td--num hns-td--mono"
  }, r.latency, "ms"), /*#__PURE__*/React.createElement("td", {
    className: "hns-td--num hns-td--mono"
  }, "$", r.cost), /*#__PURE__*/React.createElement("td", {
    className: "hns-td--num",
    style: {
      color: 'var(--text-tertiary)'
    }
  }, timeAgo(r.hoursAgo)), /*#__PURE__*/React.createElement("td", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "\uD589 \uC635\uC158",
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more",
    size: 16
  })))))))), /*#__PURE__*/React.createElement(RunDrawer, {
    run: openRun,
    onClose: () => setOpenRun(null)
  }));
}
window.HNSRuns = RunsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/harness-console/RunsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/harness-console/data.jsx
try { (() => {
/* Mock data for the Harness Console UI kit. */
const SUITES = ['reasoning-v3', 'safety-redteam', 'rag-grounding', 'tool-use', 'multilingual-ko', 'summarization', 'code-gen', 'instruction-follow'];
const MODELS = ['gpt-4o', 'claude-3.7-sonnet', 'llama-3.1-70b', 'gemini-2.0', 'mistral-large'];
function mk(i) {
  const statuses = ['passed', 'passed', 'passed', 'failed', 'running', 'queued', 'skipped', 'error'];
  const status = statuses[i % statuses.length];
  const suite = SUITES[i % SUITES.length];
  const model = MODELS[i % MODELS.length];
  const cases = 80 + i * 37 % 1200;
  const passRate = status === 'running' || status === 'queued' ? null : 62 + i * 13 % 37 + (status === 'passed' ? 1 : 0);
  const id = 'r-' + (8842 - i);
  const dur = status === 'running' ? null : 8 + i * 7 % 220;
  const latency = 180 + i * 23 % 600;
  const cost = (0.4 + i % 9 * 0.27).toFixed(2);
  const hoursAgo = i === 0 ? 0 : i * 1.6;
  return {
    id,
    suite,
    model,
    status,
    cases,
    passRate,
    dur,
    latency,
    cost,
    branch: i % 4 === 0 ? 'main' : 'eval/' + suite.split('-')[0],
    hoursAgo
  };
}
const RUNS = Array.from({
  length: 22
}, (_, i) => mk(i));
function timeAgo(h) {
  if (h === 0) return '방금';
  if (h < 1) return Math.round(h * 60) + '분 전';
  if (h < 24) return Math.round(h) + '시간 전';
  return Math.round(h / 24) + '일 전';
}
const CASES = [{
  id: 'c-0481',
  name: '다단계 추론 — 수학 단어 문제',
  status: 'passed',
  score: 0.96,
  latency: 312,
  tokens: 1840
}, {
  id: 'c-0482',
  name: '도구 호출 — 날씨 API 체이닝',
  status: 'passed',
  score: 0.91,
  latency: 540,
  tokens: 2210
}, {
  id: 'c-0483',
  name: '안전성 — 탈옥 프롬프트 거부',
  status: 'failed',
  score: 0.42,
  latency: 288,
  tokens: 980
}, {
  id: 'c-0484',
  name: 'RAG — 출처 인용 정확도',
  status: 'passed',
  score: 0.88,
  latency: 410,
  tokens: 3120
}, {
  id: 'c-0485',
  name: '한국어 — 존댓말 일관성',
  status: 'failed',
  score: 0.55,
  latency: 365,
  tokens: 1450
}, {
  id: 'c-0486',
  name: '요약 — 핵심 보존율',
  status: 'passed',
  score: 0.93,
  latency: 520,
  tokens: 2890
}, {
  id: 'c-0487',
  name: '지시 따르기 — 형식 제약',
  status: 'skipped',
  score: null,
  latency: null,
  tokens: null
}, {
  id: 'c-0488',
  name: '코드 생성 — 단위 테스트 통과',
  status: 'error',
  score: null,
  latency: 1200,
  tokens: 4100
}];
window.HNSData = {
  RUNS,
  CASES,
  SUITES,
  MODELS,
  timeAgo
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/harness-console/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/harness-console/icons.jsx
try { (() => {
/* Lucide-style line icons (MIT, stroke 1.75) used across the Harness Console kit. */
const _p = (...children) => children;
const ICONS = {
  dashboard: _p(/*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "9",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "12",
    width: "7",
    height: "9",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "16",
    width: "7",
    height: "5",
    rx: "1"
  })),
  list: _p(/*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "18",
    x2: "21",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "3.01",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "3.01",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "3.01",
    y2: "18"
  })),
  flask: _p(/*#__PURE__*/React.createElement("path", {
    d: "M10 2v7.31"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 9.3V2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 2h7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 9.3a6.5 6.5 0 1 1-4 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.58 16.5h12.85"
  })),
  database: _p(/*#__PURE__*/React.createElement("ellipse", {
    cx: "12",
    cy: "5",
    rx: "9",
    ry: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5v14a9 3 0 0 0 18 0V5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 3 0 0 0 18 0"
  })),
  gauge: _p(/*#__PURE__*/React.createElement("path", {
    d: "m12 14 4-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.34 19a10 10 0 1 1 17.32 0"
  })),
  settings: _p(/*#__PURE__*/React.createElement("path", {
    d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })),
  play: _p(/*#__PURE__*/React.createElement("polygon", {
    points: "6 3 20 12 6 21 6 3"
  })),
  square: _p(/*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "5",
    width: "14",
    height: "14",
    rx: "2"
  })),
  refresh: _p(/*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 3v5h-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 21v-5h5"
  })),
  plus: _p(/*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  })),
  search: _p(/*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  filter: _p(/*#__PURE__*/React.createElement("polygon", {
    points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
  })),
  sliders: _p(/*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "21",
    x2: "4",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "10",
    x2: "4",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "21",
    x2: "20",
    y2: "16"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "12",
    x2: "20",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "14",
    x2: "7",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "8",
    x2: "15",
    y2: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17",
    y1: "16",
    x2: "23",
    y2: "16"
  })),
  check: _p(/*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })),
  x: _p(/*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6 6 12 12"
  })),
  chevronDown: _p(/*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })),
  chevronRight: _p(/*#__PURE__*/React.createElement("path", {
    d: "m9 18 6-6-6-6"
  })),
  circleCheck: _p(/*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })),
  circleX: _p(/*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m15 9-6 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 9 6 6"
  })),
  alert: _p(/*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })),
  clock: _p(/*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  gitBranch: _p(/*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "3",
    x2: "6",
    y2: "15"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "6",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 9a9 9 0 0 1-9 9"
  })),
  fileText: _p(/*#__PURE__*/React.createElement("path", {
    d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2v5h5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "13",
    x2: "16",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "17",
    x2: "13",
    y2: "17"
  })),
  bell: _p(/*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })),
  more: _p(/*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1.4"
  })),
  download: _p(/*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  })),
  copy: _p(/*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  })),
  external: _p(/*#__PURE__*/React.createElement("path", {
    d: "M15 3h6v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 14 21 3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  })),
  trash: _p(/*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  })),
  user: _p(/*#__PURE__*/React.createElement("path", {
    d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  })),
  panelLeft: _p(/*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "3",
    x2: "9",
    y2: "21"
  })),
  zap: _p(/*#__PURE__*/React.createElement("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
  })),
  cpu: _p(/*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "1",
    x2: "9",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "1",
    x2: "15",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "20",
    x2: "9",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "20",
    x2: "15",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "9",
    x2: "23",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "14",
    x2: "23",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "9",
    x2: "4",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "14",
    x2: "4",
    y2: "14"
  })),
  calendar: _p(/*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  })),
  arrowUp: _p(/*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "5"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "5 12 12 5 19 12"
  })),
  arrowDown: _p(/*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "19 12 12 19 5 12"
  }))
};
function Icon({
  name,
  size = 18,
  className = '',
  style
}) {
  const children = ICONS[name];
  return /*#__PURE__*/React.createElement("svg", {
    className: ['hns-icon', className].filter(Boolean).join(' '),
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style,
    "aria-hidden": "true"
  }, children);
}
window.HNSIcon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/harness-console/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
