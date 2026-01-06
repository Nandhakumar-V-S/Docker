import React, { useState, useEffect, useContext } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { RiCheckboxFill } from "react-icons/ri";
import { RiCheckboxBlankLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaFolder } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const generateLabel = (node) => {
  return (
    <>
      <span className="custom-tag">
        {node.icon === "folder" ? (
          <FaFolder />
        ) : node.icon === "user" ? (
          <FaUserAlt />
        ) : (
          <FaFolder />
        )}
        {node.label}
      </span>
    </>
  );
};

const formatNodes = (nodes) => {
  return nodes.map((node) => ({
    ...node,
    label: node.children ? generateLabel(node) : node.label,
    children: node.children ? formatNodes(node.children) : undefined,
  }));
};
const nodes = [
  {
    value: "12334",
    label: "Permission List",
    icon: "folder",
    children: [
      {
        value: "125e4567-e89b-12d353-a456-426614174016",
        label: "View Home",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f20033",
        IsActive: false,
      },
      {
        value: "da456-426614174017",
        label: "View Dashboard",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f20022",
        IsActive: false,
      },
      {
        value: "23443",
        label: "Dashboard",
        icon: "folder",
        children: [
          {
            value: "12ds5e4567-e89b-12d3-a456-426614155374016",
            label: "View Home",
            ParentpermissionID: "null",
            AppModuleAccessID: "eae87393-23a2-42258a-bd65-8bbfea1f2001",
            IsActive: true,
          },
          {
            value: "125esd4567-e89b-12d345a456-426614174017",
            label: "View Dashboard",
            ParentpermissionID: "null",
            AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2002",
            IsActive: false,
          },
        ],
      },
    ],
  },
  {
    value: "67890",
    label: "Role List",
    icon: "user",
    children: [
      {
        value: "125e454367-e89b-12d453-a456-426614174018",
        label: "Admin Access",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2003",
        IsActive: true,
      },
      {
        value: "da456-426614174019",
        label: "User Access",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2004",
        IsActive: false,
      },
      {
        value: "34567",
        label: "Admin Section",
        icon: "folder",
        children: [
          {
            value: "12ds54322e4567-e89b-12d3-a456-426614174020",
            label: "Manage Users",
            ParentpermissionID: "null",
            AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2005",
            IsActive: false,
          },
          {
            value: "125esd4567-e89b-12552d3-a456-426614174021",
            label: "Manage Roles",
            ParentpermissionID: "null",
            AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2006",
            IsActive: true,
          },
        ],
      },
    ],
  },
  {
    value: "34567e",
    label: "Module Access",
    icon: "folder",
    children: [
      {
        value: "125e4567-e89b-12d3-a456-426614174022",
        label: "Edit Settings",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2007",
        IsActive: true,
      },
      {
        value: "da456-426614174023",
        label: "View Reports",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2008",
        IsActive: false,
      },
      {
        value: "56789",
        label: "Report Section",
        icon: "folder",
        children: [
          {
            value: "12ds5e4567-e89b-12d3-a456-426614174024",
            label: "Generate Reports",
            ParentpermissionID: "null",
            AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2009",
            IsActive: false,
          },
          {
            value: "125esd4567-e89b-12d3-a456-426614174025",
            label: "View Historical Data",
            ParentpermissionID: "null",
            AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2010",
            IsActive: false,
          },
        ],
      },
    ],
  },
];

const findNode = (value, nodes) => {
  for (const node of nodes) {
    if (node.value === value) {
      return node;
    }
    if (node.children) {
      const childNode = findNode(value, node.children);
      if (childNode) {
        return childNode;
      }
    }
  }
  return null;
};

const getAllNodeValues = (nodes) => {
  let values = [];
  nodes.forEach((node) => {
    values.push(node.value);
    if (node.children) {
      values = values.concat(getAllNodeValues(node.children));
    }
  });
  return values;
};

const getActiveNodeValues = (nodes) => {
  let values = [];
  nodes.forEach((node) => {
    if (node.IsActive) {
      values.push(node.value);
    }
    if (node.children) {
      values = values.concat(getActiveNodeValues(node.children));
    }
  });
  return values;
};

const getActiveNodes = (nodes) => {
  let activeNodes = [];
  nodes.forEach((node) => {
    if (node.IsActive) {
      activeNodes.push(node);
    }
    if (node.children) {
      activeNodes = activeNodes.concat(getActiveNodes(node.children));
    }
  });
  return activeNodes;
};

const updateNodeIsActive = (value, nodes, isActive) => {
  for (const node of nodes) {
    if (node.value === value) {
      node.IsActive = isActive;
      return;
    }
    if (node.children) {
      updateNodeIsActive(value, node.children, isActive);
    }
  }
};

const ArcTreeView = () => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedNodes, setCheckedNodes] = useState([]);

  const handleCheck = (checked) => {
    setChecked(checked);
    checked.forEach((value) => updateNodeIsActive(value, nodes, true));
    const allNodeValues = getAllNodeValues(nodes);
    allNodeValues.forEach((value) => {
      if (!checked.includes(value)) {
        updateNodeIsActive(value, nodes, false);
      }
    });
    setCheckedNodes(getActiveNodes(nodes));
  };

  useEffect(() => {
    const formattedNodes = formatNodes(nodes);
    // Expand all nodes by default
    setExpanded(getAllNodeValues(formattedNodes));
    // Check all active nodes by default
    setChecked(getActiveNodeValues(formattedNodes));
    // Set checkedNodes with all active node objects
    setCheckedNodes(getActiveNodes(formattedNodes));
  }, []);

  console.log(checkedNodes);
  return (
    <>
      <CheckboxTree
        nodes={formatNodes(nodes)}
        className={"arc-treeview-checkbox"}
        checked={checked}
        expanded={expanded}
        onCheck={handleCheck}
        onExpand={(expanded) => setExpanded(expanded)}
        showNodeIcon={false}
        showCheckbox={false}
        onlyLeafCheckboxes={true}
        // showExpandAll={true}
        icons={{
          check: <RiCheckboxFill />,
          uncheck: <RiCheckboxBlankLine />,
          halfCheck: <span className="rct-icon rct-icon-half-check" />,
          expandClose: <IoIosArrowForward />,
          expandOpen: <IoIosArrowDown />,
          expandAll: <span className="rct-icon rct-icon-expand-all" />,
          collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
          parentClose: <span className="rct-icon rct-icon-parent-close" />,
          parentOpen: <span className="rct-icon rct-icon-parent-open" />,
          leaf: <span className="rct-icon rct-icon-leaf" />,
        }}
      />
      {/* <pre>{JSON.stringify(checkedNodes, null, 2)}</pre> */}
    </>
  );
};

export default ArcTreeView;

const ArcTreeViewV2 = () => {
  return (
    <React.Fragment>
      <section className="arc-treeview-checkbox-v2"></section>
    </React.Fragment>
  );
};
