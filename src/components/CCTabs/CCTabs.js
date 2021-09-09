import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { CCButton } from "../../components";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: "inline-block",
  },
  content: {
    whiteSpace: "nowrap",
    overflowX: "auto",
    overflowY: "hidden",
  },
  tab: {
    position: "relative",
    textAlign: (props) => props.align,
    backgroundColor: (props) => {
      if (props.color?.length > 0) {
        if (theme.palette[props.color[0]])
          return theme.palette[props.color[0]].main;
        return props.color[0];
      }
      return "none";
    },
    width: (props) => {
      if (props.fullWidth) return "100%";
      return props.width;
    },
  },
  underline: {
    position: "absolute",
    height: 3,
    backgroundColor: (props) => {
      if (props.underlineColor) {
        if (theme.palette[props.underlineColor])
          return theme.palette[props.underlineColor].main;
        return props.underlinColor;
      }
      if (props.color?.length > 0) {
        if (theme.palette[props.color[1]])
          return theme.palette[props.color[1]].main;
        return props.color[1];
      }
      return theme.palette.selected.main;
    },
    transition: "all 0.2s ease-out",
  },
}));

const CCTabs = forwardRef((props, ref) => {
  const {
    color = [null, "selected", "#000"],
    tabList,
    value = tabList[0].value,
    onChange,
    width,
    underlineColor,
    tabWidth,
    ...others
  } = props;
  const classes = useStyles(props);

  const tabRef = useRef(null);

  const [tabStyle, setTabStyle] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const tabClick = (value) => {
    onChange && onChange(value);
  };

  const lineStyle = useCallback(() => {
    const tab = tabRef?.current.children[tabIndex];
    tab.scrollIntoView({ behavior: "smooth", inline: "center" });
    setTabStyle({
      width: tab.offsetWidth,
      left: tab.offsetLeft,
      top: -3,
    });
  }, [tabIndex]);

  useEffect(() => {
    let notResize = true;
    const resize = () => {
      lineStyle();
      notResize = false;
    };
    window.addEventListener("resize", resize);
    notResize && lineStyle();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [lineStyle]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div
          className={classes.tab}
          ref={tabRef}
          style={{ height: tabRef?.current?.children[0].offsetHeight }}
        >
          {tabList.map((tab, idx) => (
            <CCButton
              key={tab.value}
              variant={"text"}
              round={1}
              color={value === tab.value ? color[1] : color[2]}
              onClick={() => {
                tabClick(tab.value);
                setTabIndex(idx);
              }}
              disabled={tab.disabled}
              width={tabWidth}
              {...others}
            >
              {tab.label}
            </CCButton>
          ))}
        </div>
        <div style={{ position: "relative" }}>
          <div className={classes.underline} style={tabStyle} />
        </div>
      </div>
    </div>
  );
});

CCTabs.propTypes = {
  color: PropTypes.array,
  size: PropTypes.number,
  width: PropTypes.number,
  tabWidth: PropTypes.number,
  underlineColor: PropTypes.oneOfType([
    PropTypes.oneOf([
      "primary",
      "secondary",
      "error",
      "warning",
      "sub",
      "icon",
    ]),
    PropTypes.string,
  ]),
  align: PropTypes.oneOf(["left", "right", "center"]),
};

CCTabs.defaultProps = {
  underlineColor: "selected",
};

export default CCTabs;
