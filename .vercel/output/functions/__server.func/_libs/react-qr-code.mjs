import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "./@floating-ui/react-dom+[...].mjs";
import { t as require_prop_types } from "./prop-types.mjs";
import { t as qrcode } from "./qrcode-generator.mjs";
//#region node_modules/react-qr-code/lib/index.mjs
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var _excluded$1 = [
	"bgColor",
	"bgD",
	"fgD",
	"fgColor",
	"size",
	"title",
	"viewBoxSize",
	"xmlns"
];
var propTypes$1 = {
	bgColor: import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.string]).isRequired,
	bgD: import_prop_types.default.string.isRequired,
	fgColor: import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.string]).isRequired,
	fgD: import_prop_types.default.string.isRequired,
	size: import_prop_types.default.number.isRequired,
	title: import_prop_types.default.string,
	viewBoxSize: import_prop_types.default.number.isRequired,
	xmlns: import_prop_types.default.string
};
var QRCodeSvg = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, ref) {
	var bgColor = _ref.bgColor, bgD = _ref.bgD, fgD = _ref.fgD, fgColor = _ref.fgColor, size = _ref.size, title = _ref.title, viewBoxSize = _ref.viewBoxSize, _ref$xmlns = _ref.xmlns, xmlns = _ref$xmlns === void 0 ? "http://www.w3.org/2000/svg" : _ref$xmlns, props = _objectWithoutProperties(_ref, _excluded$1);
	return /*#__PURE__*/ import_react.createElement("svg", _extends({}, props, {
		height: size,
		ref,
		viewBox: "0 0 ".concat(viewBoxSize, " ").concat(viewBoxSize),
		width: size,
		xmlns
	}), title ? /*#__PURE__*/ import_react.createElement("title", null, title) : null, /*#__PURE__*/ import_react.createElement("path", {
		d: bgD,
		fill: bgColor
	}), /*#__PURE__*/ import_react.createElement("path", {
		d: fgD,
		fill: fgColor
	}));
});
QRCodeSvg.displayName = "QRCodeSvg";
QRCodeSvg.propTypes = propTypes$1;
var _excluded = [
	"bgColor",
	"fgColor",
	"level",
	"size",
	"value"
];
qrcode.stringToBytes = function(s) {
	return Array.from(new TextEncoder().encode(s));
};
var propTypes = {
	bgColor: import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.string]),
	fgColor: import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.string]),
	level: import_prop_types.default.string,
	size: import_prop_types.default.number,
	value: import_prop_types.default.string.isRequired
};
var QRCode = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, ref) {
	var _ref$bgColor = _ref.bgColor, bgColor = _ref$bgColor === void 0 ? "#FFFFFF" : _ref$bgColor, _ref$fgColor = _ref.fgColor, fgColor = _ref$fgColor === void 0 ? "#000000" : _ref$fgColor, _ref$level = _ref.level, level = _ref$level === void 0 ? "L" : _ref$level, _ref$size = _ref.size, size = _ref$size === void 0 ? 256 : _ref$size, value = _ref.value, props = _objectWithoutProperties(_ref, _excluded);
	var qr = qrcode(0, level);
	qr.addData(value);
	qr.make();
	var moduleCount = qr.getModuleCount();
	var cells = Array.from({ length: moduleCount }, function(_, rowIndex) {
		return Array.from({ length: moduleCount }, function(_, colIndex) {
			return qr.isDark(rowIndex, colIndex);
		});
	});
	return /*#__PURE__*/ import_react.createElement(QRCodeSvg, _extends({}, props, {
		bgColor,
		bgD: cells.map(function(row, rowIndex) {
			return row.map(function(cell, cellIndex) {
				return !cell ? "M ".concat(cellIndex, " ").concat(rowIndex, " l 1 0 0 1 -1 0 Z") : "";
			}).join(" ");
		}).join(" "),
		fgColor,
		fgD: cells.map(function(row, rowIndex) {
			return row.map(function(cell, cellIndex) {
				return cell ? "M ".concat(cellIndex, " ").concat(rowIndex, " l 1 0 0 1 -1 0 Z") : "";
			}).join(" ");
		}).join(" "),
		ref,
		size,
		viewBoxSize: moduleCount
	}));
});
QRCode.displayName = "QRCode";
QRCode.propTypes = propTypes;
//#endregion
export { QRCode as t };
