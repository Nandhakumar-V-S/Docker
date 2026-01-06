import moment from "moment-timezone";
export const SortingWithDirection = (data, dir, sortableKey) => {
  console.log(data);
  console.log(dir);
  console.log(sortableKey);
  if (!Array.isArray(data)) {
    throw new Error("Data to Sort must be An String");
  }
  const getValue = (val) => {
    console.log(val);
    const match = val?.match(/\d+/);
    return match ? parseInt(match[0]) : null; // Return null for non-numeric strings
  };

  const sortedMastervalues = [...data].sort((a, b) => {
    console.log(a[sortableKey]);
    const aValue = getValue(a[sortableKey]);
    const bValue = getValue(b[sortableKey]);

    if (aValue !== null && bValue !== null) {
      // Both have numbers; sort by numeric value
      return dir === "asc" ? aValue - bValue : bValue - aValue;
    } else if (aValue !== null) {
      // Only a has a number; a comes first
      return dir === "asc" ? -1 : 1;
    } else if (bValue !== null) {
      // Only b has a number; b comes first
      return dir === "asc" ? 1 : -1;
    } else {
      // Both are non-numeric; sort alphabetically
      return dir === "asc"
        ? a[sortableKey].localeCompare(b[sortableKey])
        : b[sortableKey].localeCompare(a[sortableKey]);
    }
  });
  return sortedMastervalues;
};

export const SortingWithoutDirection = (data, sortableKey) => {
  console.log(data);
  console.log(sortableKey);
  if (!Array.isArray(data)) {
    throw new Error("Data to Sort must be An String");
  }
  const getValue = (val) => {
    const match = val?.match(/\d+/);
    return match ? parseInt(match[0]) : null; // Return null for non-numeric strings
  };

  const sortedValues = [...data].sort((a, b) => {
    const aValue = getValue(a[sortableKey]);
    const bValue = getValue(b[sortableKey]);

    if (aValue !== null && bValue !== null) {
      // Both have numbers; sort by numeric value
      return aValue - bValue;
    } else if (aValue !== null) {
      // Only a has a number; a comes first
      return -1;
    } else if (bValue !== null) {
      // Only b has a number; b comes first
      return 1;
    } else {
      // Both are non-numeric; sort alphabetically
      return a[sortableKey]?.localeCompare(b[sortableKey]);
    }
  });

  console.log(sortedValues);
  return sortedValues;
};
export const UTCtoLocalTime = (time, format) => {
  // const time = "2024-06-18T06:58:48.780";
  // const input = null;

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(userTimezone);

  // Parse the input date string
  const utc = moment.utc(time, "YYYY-MM-DD HH:mm:ss.SSS");

  console.log(utc);
  // Convert to the user's timezone
  const local = utc.clone().tz(userTimezone);
  console.log(local);

  // Format the date to the desired format
  const formattedDate = local.format(format || "YYYY-MM-DD hh:mm A");
  return formattedDate;
};

function GetTimeFormat(dateString) {
  const now = new Date();
  const inputDate = new Date(dateString);
  const diffInMs = now - inputDate;
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }
}

export const UTCtoLocalTimeLastUsed = (time, format) => {
  const formattedDate = UTCtoLocalTime(time, format);
  const timeFormat = GetTimeFormat(formattedDate);
  return timeFormat;
};


export const GetVerticalGroupbyOptions = (groupbyfields, listfields) => {
  // Filter vertical groupby fields
  const verticalGroupby = groupbyfields?.filter(
    (item) => item?.type?.toLowerCase() === "vertical"
  );

  // Map vertical groupby fields with matching listfields
  const mappedGroupBy = verticalGroupby?.map((groupbyItem) => {
    console.log(verticalGroupby);
    console.log(listfields);
    const matchingField = listfields?.find(
      (listItem) =>
        listItem?.api_name?.toLowerCase() ===
        groupbyItem?.api_name?.toLowerCase()
    );
    // console.log(mappedGroupBy);
    console.log(matchingField);

    return matchingField
      ? {
          ...groupbyItem,
          displayname: matchingField.displayapiname,
        }
      : groupbyItem;
  });

  return mappedGroupBy;
};