import * as React from "react";
import { FC } from "react";
import PropTypes from "prop-types";
import List, { ListProps } from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { useTimeout } from "ra-core";

const times = (nbChildren: any, fn: any) =>
  Array.from({ length: nbChildren }, (_, key) => fn(key));

interface Props {
  className?: string;
  nbFakeLines?: number;
}

const SimpleListLoading: FC<Props & ListProps> = (props) => {
  const { className, nbFakeLines = 5, ...rest } = props;
  const oneSecondHasPassed = useTimeout(1000);

  return oneSecondHasPassed ? (
    <List className={className} {...rest}>
      {times(nbFakeLines, (key: any) => (
        <ListItem key={key}></ListItem>
      ))}
    </List>
  ) : null;
};

SimpleListLoading.propTypes = {
  className: PropTypes.string,
  nbFakeLines: PropTypes.number,
};

export default SimpleListLoading;
