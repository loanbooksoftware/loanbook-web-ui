import * as React from "react";
import { cloneElement, Children } from "react";

import { ListContextProvider, useListContext } from "ra-core";

export const FilterResourceList = (props) => {
  const { data, ids, ...rest } = useListContext(props);
  const { filter, children } = props;

  const filteredIds = filter
    ? Object.keys(data).filter((el, index) => !!filter(data[el], index))
    : ids;

  const filteredData = filter
    ? filteredIds.reduce((prev, el) => ({ ...prev, [el]: data[el] }), {})
    : data;

  return (
    <ListContextProvider
      value={{
        ...rest,
        data: filteredData,
        ids: filteredIds,
      }}
    >
      {cloneElement(Children.only(children), {
        ...rest,
        ids: filteredIds,
        data: filteredData,
      })}
    </ListContextProvider>
  );
};

export default FilterResourceList;
