import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import * as icons from 'static/img/icons';
import { shared } from 'lib/theme';

const SIZES = {
  tiny: 10,
  small: 16,
  medium: 24,
  middle: 41,
  large: 48,
  nearBig: 52,
  big: 67,
  extra: 100,
};
const ICON_COLORS = {
  ...shared.colors,
  gray: 'gray',
  initial: 'inherit',
};

export const iconTypes = Object.keys(icons);
export const colorTypes = Object.keys(ICON_COLORS);
const sizeTypes = Object.keys(SIZES);

const useStyles = makeStyles({
  svg: {
    display: 'flex',
   // margin:'auto',
    verticalAlign: 'middle',
    '& path': {
      fill: ({ noColor, fill }) => (!noColor ? fill : ''),
      stroke: ({ noColor, stroke }) => (!noColor ? stroke : ''),
    },
  },
});

export const Icon = ({
  type,
  color,
  size,
  customSize,
  strokeColor,
  rotate,
  noColor = false,
}) => {
  const SvgIcon = icons[type];
  const svgSize = SIZES[size];
  const fill = ICON_COLORS[color] ?? color;
  const stroke = ICON_COLORS[strokeColor] ?? color;
  const classes = useStyles({ fill, stroke, noColor });

  return (
    <SvgIcon
      className={classes.svg}
      // style={{
      //   ...(strokeColor ? { stroke } : { stroke: 'transparent' }),
      //   ...(customSize || {
      //     width: svgSize,
      //     height: svgSize,
      //   }),
      //   ...(rotate ? { transform: `rotate(${rotate})` } : {}),
      // }}
    />
  );
};

Icon.propTypes = {
  type: PropTypes.oneOf(iconTypes).isRequired,
  color: PropTypes.oneOf(colorTypes),
  size: PropTypes.oneOf(sizeTypes),
  customSize: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  strokeColor: PropTypes.string,
  rotate: PropTypes.string,
  noColor: PropTypes.bool,
};
Icon.defaultProps = {
  color: '',
  size: 'medium',
  customSize: undefined,
  strokeColor: undefined,
  rotate: undefined,
  noColor: false,
};
