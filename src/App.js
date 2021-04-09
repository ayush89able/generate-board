import React, { useState, useEffect } from 'react'
import './App.css';
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import words from "./words";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10
  },
  textCenter: {
    textAlign: "center"
  },
  paper: {
    padding: "10px!important",
    textAlign: "center",
    backgroundC: "green",
    color: "white"
  },
  table: {
    display: "table"
  },
  cell: {
    display: "table-cell",
    borderWidth: "thin",
    marginLeft: "10px",
    marginRight: "10px"
  },
  row: {
    display: "table-row"
  },
}));

function App() {
  const classes = styles();
  const wordList = words;
  let alteredlist = [];

  const [load,setLoad] = useState(false)

  useEffect(()=>{
    gernerateBoard()
  }, [load]) 

  const gernerateBoard = () => {
    let midArray = wordList.map((item, index) => {
      let z = {
        val: item
      };
      if (index % 3 === 0) {
        z.color = "default";
      } else if (index % 3 === 1) {
        z.color = "primary";
      } else if (index % 3 === 2) {
        z.color = "secondary";
      }
      return z;
    });
    alteredlist = [];
    for (let index = 0; index < midArray.length; index += 4) {
      let myChunk = midArray.slice(index, index + 4);
      alteredlist.push(myChunk);
    }
  };

  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
    console.log({array})
  };

  const getCols = (chunk) => {
    const cols = [];
    for (let i = 0; i < 4; i++) {
      cols.push(
        <div className={classes.cell}>
          <Button
            color={chunk[i].color}
            variant="contained"
            className={classes.gridItem}
          >
            {chunk[i].val}
          </Button>
        </div>
      );
    }
    return <div className={classes.row}>{cols}</div>;
  };

  const getRows = () => {
    gernerateBoard();
    const r = [];
    for (let i = 1; i <= 4; i++) {
      r.push(getCols(alteredlist[i]));
    }
    return r;
  };
  


  return (
    <div className={classes.root}>
      <div className={classes.textCenter}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            shuffle(wordList);
            setLoad(!load)
          }}
        >
          Generate Board
        </Button>
      </div>
      <div className={classes.table}>
        {getRows()}
      </div>
    </div>
  );
}

export default App;
