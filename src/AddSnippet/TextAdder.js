import React from 'react';

let TextAdder = ({name, addFunc, list}) => {
  let node = '';
  let onEnterKey = (e) => {
    if(e.key === 'Enter') {
      addFunc(node);
    }
  };

  return (
    <div>
      <h6>{name}</h6>
      <textarea id="textarea" rows="4" cols="50" ref={(n) => {node = n}} onKeyPress={onEnterKey}></textarea>
      <button onClick={() => addFunc(node)}>{`Add ${name}`}</button>
      <ul>
        {list.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
    );
};

export default TextAdder;