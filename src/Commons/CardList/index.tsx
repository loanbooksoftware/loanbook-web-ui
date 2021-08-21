import * as React from "react";
import { FC, ReactNode, ReactElement } from "react";
import { List, ListProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  linkToRecord,
  sanitizeListRestProps,
  useListContext,
  Record,
  RecordMap,
  Identifier,
} from "ra-core";

import CardListLoading from "./loading";
import { ClassesOverride } from "./types";
import Card from "./card";

const useStyles = makeStyles((theme) => ({
  listRoot: { padding: `${theme.spacing(1)}px 0px` },
}));

const CardList = <RecordType extends Record = Record>(
  props: CardListProps<RecordType>
) => {
  const {
    className,
    classes: classesOverride,
    linkType = "edit",
    rowStyle,
    children,
    ...rest
  } = props;
  const { basePath, data, ids, loaded, total, resource } =
    useListContext<RecordType>(props);
  const classes = useStyles(props);

  if (loaded === false) {
    return <CardListLoading className={className} />;
  }

  if ((total === 0 || total === null) && ids && ids.length === 0) {
    return "No record found";
  }

  return (
    (total > 0 || total === null) && (
      <List
        className={className}
        {...sanitizeListRestProps(rest)}
        classes={{
          root: classes.listRoot,
        }}
      >
        {ids.map((id, rowIndex) => (
          <LinkOrNot
            linkType={props.rowClick ? false : linkType}
            basePath={basePath}
            id={id}
            key={id}
            record={data[id]}
          >
            <Card
              id={id}
              record={data[id]}
              children={children}
              basePath={basePath}
              resource={resource}
              {...rest}
            />
          </LinkOrNot>
        ))}
      </List>
    )
  );
};

export type FunctionToElement<RecordType extends Record = Record> = (
  record: RecordType,
  id: Identifier
) => ReactElement | string;

export interface CardListProps<RecordType extends Record = Record>
  extends Omit<ListProps, "classes"> {
  className?: string;
  classes?: ClassesOverride<typeof useStyles>;
  hasBulkActions?: boolean;
  leftAvatar?: FunctionToElement<RecordType>;
  leftIcon?: FunctionToElement<RecordType>;
  primaryText?: FunctionToElement<RecordType>;
  linkType?: string | FunctionLinkType | boolean;
  rightAvatar?: FunctionToElement<RecordType>;
  rightIcon?: FunctionToElement<RecordType>;
  secondaryText?: FunctionToElement<RecordType>;
  tertiaryText?: FunctionToElement<RecordType>;
  rowStyle?: (record: Record, index: number) => any;
  // can be injected when using the component without context
  basePath?: string;
  data?: RecordMap<RecordType>;
  ids?: Identifier[];
  loaded?: boolean;
  total?: number;
  children: ReactNode;
  rowClick?: any;
}

const useLinkOrNotStyles = makeStyles(
  {
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  },
  { name: "RaLinkOrNot" }
);

const LinkOrNot: FC<LinkOrNotProps> = ({
  classes: classesOverride,
  linkType,
  basePath,
  id,
  children,
  record,
}) => {
  const classes = useLinkOrNotStyles({ classes: classesOverride });
  const link = typeof linkType === "function" ? linkType(record, id) : linkType;

  return link === "edit" || link === true ? (
    <Link to={linkToRecord(basePath, id)} className={classes.link}>
      {children}
    </Link>
  ) : link === "show" ? (
    <Link to={`${linkToRecord(basePath, id)}/show`} className={classes.link}>
      {children}
    </Link>
  ) : (
    <span>{children}</span>
  );
};

export type FunctionLinkType = (record: Record, id: Identifier) => string;

export interface LinkOrNotProps {
  classes?: ClassesOverride<typeof useLinkOrNotStyles>;
  linkType?: string | FunctionLinkType | boolean;
  basePath: string;
  id: Identifier;
  record: Record;
  children: ReactNode;
}

export default CardList;
