import React, { cloneElement } from "react";
import {
  linkToRecord,
  useListContext,
  TopToolbar,
  CreateButton,
  ExportButton,
  sanitizeListRestProps,
  ListButton,
  ShowButton,
} from "react-admin";
import { Link } from "react-router-dom";
import get from "lodash/get";
import ChevronLeft from "@material-ui/core/Icon";
import { Resources } from "../../constants/resources";

export function StopEventPropagation(props) {
  const noPropagation = (e) => e.stopPropagation();

  return <span onClick={noPropagation}>{props.children}</span>;
}

export const ListActions = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    basePath,
    showFilter,
    total,
  } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
      <CreateButton basePath={basePath} />
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterValues={filterValues}
        maxResults={maxResults}
      />
    </TopToolbar>
  );
};

export const listExtraProps = { perPage: 50, bulkActionButtons: false };

export const EditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    <ShowButton basePath={basePath} record={data} />
  </TopToolbar>
);

export const CustomerShortDetailsRenderer = ({ record, path }) => {
  const linkToCustomer = linkToRecord(
    `/${Resources.customers}`,
    get(record, `${path}.id`),
    "show"
  );

  return (
    <StopEventPropagation>
      <Link to={linkToCustomer}>
        {get(record, `${path}.first_name`)} {get(record, `${path}.last_name`)}
      </Link>
    </StopEventPropagation>
  );
};
