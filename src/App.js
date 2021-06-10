import React, {useState} from 'react';
import { ThemeProvider, createUseStyles} from 'react-jss';
import theme from './styles/theme';
import { CCButton } from './components/CCButton';

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
  }
})

const App = () => {
  const classes = styles();
  const [text, setText] = useState({
    content: null,
    count: 0,
  });

  const onClickHandle = () => {
    setText({content:'You clicked', count: text.count + 1});
  }

  const resetHandle = () => {
    setText({content: null, count: 0});
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <CCButton variant="contained" onClick={onClickHandle}>Button</CCButton>
        </div>
        <div>
        <CCButton variant="contained" color="error" onClick={resetHandle}>Reset</CCButton>
        </div>
      </div>
      <div className={classes.text}>
        {text.content && <p>{text.content} {text.count} times!</p>}
      </div>
    </ThemeProvider>
  );
}

export default App;