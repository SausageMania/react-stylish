import React, {useState} from 'react';
import { ThemeProvider, createUseStyles} from 'react-jss';
import theme from './styles/theme';
import { CCButton, CCSwitch, CCTextField, CCPagination, CCTable } from './components';

const styles = createUseStyles({
  container: {
    paddingLeft: "15px",
  },
  buttonContainer: {
    marginRight: "5px",
    paddingTop: "15px",
  },
  text: {
    padding: "15px",
  },
  switchContainer: {
    display: "flex",
    padding: "5px 0",
    alignItems: "center",
  }
});

const columns = [
  {
    key: "Name",
    title: "Name", 
    width: 150,
  },
  {
    key: "Age",
    title: "Age", 
    width: 50,
  },
  {
    key: "long_title",
    title: "Very Very Long Long Title",
  },
  {
    key: "Sex",
    title: "Sex", 
    width: 100,
  },
];

const rows= [
  {
    long_title: <CCButton>Button</CCButton>,
    Name: <div>John Ericson</div>,
    Age: 25,
    Sex: "male",
  },
  {
    Name: <strong>Ellis Wonderland</strong>,
    Age: 29,
    Sex: "female",
  },
  {
    Name: <strong>Ellis Wonderland</strong>,
    Age: 29,
    Sex: "female",
  },
  {
    Name: <strong>Ellis Wonderland</strong>,
    Age: 29,
    Sex: "female",
  },
  {
    Name: <strong>Ellis Wonderland</strong>,
    Age: 29,
    Sex: "female",
  },
]

const App = () => {
  const classes = styles();
  const [text, setText] = useState({
    content: null,
    count: 0,
  });
  const [ripple, setRipple] = useState(true);
  const [result, setResult] = useState("");

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
            <CCButton 
              color="error" 
              disabled={text.count === 0} 
              onClick={resetHandle}
              disableRipple={!ripple}
            >
              Reset
            </CCButton>
            <CCButton variant="dashed" color="sub" selected={ripple} onClick={selectHandle}>
              {ripple ? "Rippling ON" : "Rippling OFF"}
            </CCButton>
        </div>
        <div>
          
        </div>
        <div className={classes.text}>
          {text.content && <p>{text.content} {text.count} {text.count === 1 ? "time" : "times"}!</p>}
        </div>
        <div className={classes.switchContainer}>
          Normal size :&nbsp;<CCSwitch colors={["secondary", "error"]}/>
        </div>
        <div className={classes.switchContainer}>
          Small Size :&nbsp;<CCSwitch size="small" onChange={e => console.log(e.target.checked)}/>
        </div>
        <div>
          <CCTextField 
            placeholder="test" 
            label="????????????"
            required
            multiline
            onChange={e => setResult(e.target.value)} 
          />
        </div>
        <div>
          result: {result}
        </div>
        <div>
          <CCTable width={600} height={200} columns={columns} rows={rows}/>
          <CCPagination count={10} />
        </div>
      </div>
      
    </ThemeProvider>
  );
}

export default App;