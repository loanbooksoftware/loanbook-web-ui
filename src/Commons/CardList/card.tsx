import React, { isValidElement, ReactNode } from "react";
import {
  Card as MaterialCard,
  CardHeader,
  CardContent,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Record, RecordContextProvider, Identifier } from "ra-core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  cardHeaderRoot: {
    padding: `0px ${theme.spacing(1)}px`,
    background: "#E0E2F5",
  },
  cardHeaderContent: {},
  cardHeaderTitle: {},
  cardHeaderSubheader: {
    lineHeight: 1,
  },
  cardContentRoot: {
    padding: `${theme.spacing(1)}px`,
  },
}));

interface ICardProps {
  record: Record;
  resource: string;
  basePath: string;
  children: ReactNode;
  title?: ReactNode;
  subHeader?: ReactNode;
  rowClick?: (id: Identifier, basePath: string, record: Record) => void;
  id: Identifier;
}

export default function Card(props: ICardProps) {
  const classes = useStyles(props);

  const {
    record,
    children,
    resource,
    basePath,
    title,
    subHeader,
    rowClick,
    id,
  } = props;

  return (
    <RecordContextProvider value={record}>
      <MaterialCard
        className={classes.root}
        onClick={() => rowClick && rowClick(id, basePath, record)}
      >
        {isValidElement(title) && (
          <>
            <CardHeader
              title={
                isValidElement(title)
                  ? React.cloneElement(title, {
                      record,
                      basePath: title.props.basePath || basePath,
                      resource,
                    })
                  : title
              }
              subheader={
                isValidElement(subHeader)
                  ? React.cloneElement(subHeader, {
                      record,
                      basePath: subHeader.props.basePath || basePath,
                      resource,
                    })
                  : subHeader
              }
              classes={{
                root: classes.cardHeaderRoot,
                content: classes.cardHeaderContent,
                title: classes.cardHeaderTitle,
                subheader: classes.cardHeaderSubheader,
              }}
              titleTypographyProps={{
                display: "inline",
                component: "span",
              }}
              subheaderTypographyProps={{
                display: "inline",
                component: "span",
              }}
            />
            <Divider />
          </>
        )}
        <CardContent classes={{ root: classes.cardContentRoot }}>
          {React.Children.map(children, (field, index) =>
            isValidElement(field)
              ? React.cloneElement(field, {
                  record,
                  basePath: field.props.basePath || basePath,
                  resource,
                })
              : null
          )}
        </CardContent>
      </MaterialCard>
    </RecordContextProvider>
  );
}
