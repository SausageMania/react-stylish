import React, {useState} from 'react';
import { ThemeProvider, createUseStyles} from 'react-jss';
import theme from './styles/theme';
import { CCButton } from './components/CCButton';
import { CCSwitch } from './components/CCSwitch'; 

const styles = createUseStyles({
  container: {
    paddingLeft: "15px",
    paddingTop: "15px",
    display: "flex",
  },
  buttonContainer: {
    marginRight: "5px"
  },
  text: {
    padding: "15px",
  },
  switchContainer: {
    display: "flex",
    paddingLeft: "15px",
    paddingTop: "5px",
    alignItems: "center",
  }
})

const App = () => {
  const classes = styles();
  const [text, setText] = useState({
    content: null,
    count: 0,
  });
  const [ripple, setRipple] = useState(true);

  const onClickHandle = () => {
    setText({content:'You clicked', count: text.count + 1});
  }

  const resetHandle = () => {
    setText({content: null, count: 0});
  }

  const selectHandle = () => {
    setRipple(!ripple);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <CCButton 
            variant="contained" 
            onClick={onClickHandle}
            disableRipple={!ripple}
          >
            Button
          </CCButton>
        </div>
        <div className={classes.buttonContainer}>
          <CCButton 
            color="error" 
            disabled={text.count === 0} 
            onClick={resetHandle}
            disableRipple={!ripple}
          >
            Reset
          </CCButton>
        </div>
        <div>
          <CCButton variant="dashed" color="sub" selected={ripple} onClick={selectHandle}>
            {ripple ? "Rippling ON" : "Rippling OFF"}
          </CCButton>
        </div>
      </div>
      <div className={classes.text}>
        {text.content && <p>{text.content} {text.count} {text.count === 1 ? "time" : "times"}!</p>}
      </div>
      <div className={classes.switchContainer}>
        Normal size :&nbsp;<CCSwitch color={["primary", "error"]}/>
      </div>
      <div className={classes.switchContainer}>
        Small Size :&nbsp;<CCSwitch size="small"/>
      </div>
    </ThemeProvider>
  );
}

export default App;