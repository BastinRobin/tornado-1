"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var Instruction = function Instruction(action, config) {
  var item = config.item;
  var key = config.key;
  var indexPath = config.indexPath;
  var state = item.state;
  var node = item.node;
  var namespace = item.namespace;
  var blockName = item.blockName;
  var blockIndex = item.blockIndex;
  var parentNodeIdx = item.parentNodeIdx;
  var parentTdBody = item.parentTdBody;
  var tdBody = item.tdBody;

  var _node = _slicedToArray(node, 1);

  var nodeType = _node[0];

  var parentNodeName = parentNodeIdx === -1 ? "frag" : "el" + parentNodeIdx;
  var bodyType = undefined,
      tdMethodName = undefined,
      needsOwnMethod = undefined,
      hasTornadoRef = undefined;
  if (nodeType === "TORNADO_BODY") {
    bodyType = node[1].type || "";
    needsOwnMethod = !!(node[1].body && node[1].body.length);

    if (blockName) {
      tdMethodName = "_" + bodyType.substring(0, 1) + "_" + blockName;

      if (blockIndex !== undefined) {
        tdMethodName += blockIndex;
      }
    }
  } else if (nodeType === "HTML_ATTRIBUTE") {
    var attrVal = node[1].value;
    hasTornadoRef = attrVal && attrVal.some(function (val) {
      var type = val[0];
      return type === "TORNADO_REFERENCE" || type === "TORNADO_BODY" || type === "TORNADO_PARTIAL";
    });
  }
  indexPath = item.indexPath;
  var instr = {
    action: action,
    nodeType: nodeType,
    bodyType: bodyType,
    blockIndex: blockIndex,
    needsOwnMethod: needsOwnMethod,
    hasTornadoRef: hasTornadoRef,
    tdMethodName: tdMethodName,
    parentTdBody: parentTdBody,
    tdBody: tdBody,
    parentNodeName: parentNodeName,
    indexPath: indexPath,
    key: key,
    state: state,
    node: node,
    namespace: namespace,
    elCount: parentNodeIdx + 1
  };
  return instr;
};

module.exports = Instruction;
//# sourceMappingURL=Instruction.js.map