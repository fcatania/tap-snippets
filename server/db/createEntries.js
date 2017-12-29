let dbConnection = require('./connection');
let snippets = [
  {
    "title": "Functional Component",
    "linkdocs": "https://reactjs.org/docs/components-and-props.html#functional-and-class-components",
    "snippetBody": `function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}`,
    "tips": [
      "Remember these components are stateless and receive a props object in as an argument.",
      "If your component needs a state, turn it into a Class Component with these easy steps: https://reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class"
    ],
    "tags": [
      "react",
      "reactjs",
      "constructor",
      "jsx",
      "component",
      "create",
      "functional",
      "stateless"
    ]
  },
  {
    "title": "Class Component",
    "linkdocs": "https://reactjs.org/docs/components-and-props.html#functional-and-class-components",
    "snippetBody": `class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}`,
    "tips": [
      "Remember these components are stateful, if you see yourself using this type of component without the state object, we recommend to change the component to a Functional Component.",
      "These components also have a lifecycle and some methods to interact with the lifecycle, see: https://reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class",
      "Remember to define the state object within the constructor method and to bind all handler functions to itself also within the constructor."
    ],
    "tags": [
      "react",
      "reactjs",
      "constructor",
      "jsx",
      "component",
      "create",
      "class",
      "state",
      "bind"
    ]
  },
  {
    "title": "Rendering Multiple Components",
    "linkdocs": "https://reactjs.org/docs/lists-and-keys.html#embedding-map-in-jsx",
    "snippetBody": `function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
         <ListItem key={number.toString()} value={number} />
      )}
    </ul>
  );
}`,
    "tips": [
      "Remember the key attribute is used by React to identify which have changed, were added or removed. Keys should be given to the elements inside the array to give the elements a stable identity. Keys should be unique for each item.",
      "There's no need to make the whole mapping within the return statement, you could map the array before into a new array and then render that array."
    ],
    "tags": [
      "react",
      "reactjs",
      "constructor",
      "jsx",
      "multiple components",
      "map components",
      "map"
    ]
  },
  {
    "title": "componentDidMount()",
    "linkdocs": "www.react.org/funcompononet",
    "snippetBody": `componentDidMount() {
  // example uses 'whatwg-fetch'
  fetch('someURL').then((response) => {
    // do something with the response
    // like changing a state with the data received
  });
}`,
    "tips": [
      "componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.",
      "Check other lifecycle methods here: https://reactjs.org/docs/react-component.html#the-component-lifecycle"
    ],
    "tags": [
      "react",
      "reactjs",
      "jsx",
      "lifecycle",
      "mount",
      "componentDidMount"
    ]
  },
  {
    "title": "Changing Component's State",
    "linkdocs": "https://reactjs.org/docs/react-component.html#setstate",
    "snippetBody": "this.setState({quantity: 2})",
    "tips": [
      "Remember if you need to update multiple state attributes at once, you should add key-value pairs to the object you are sending as an argument.",
      "Remember setState is asynchronous, if you wish to do something once the state was successfully changed you can send a callback as a second argument."
    ],
    "tags": [
      "react",
      "reactjs",
      "jsx",
      "setState()",
      "setState",
      "change state",
      "stateful component",
      "asynchronous"
    ]
  }
]

let createSnippets = (arrayOfSnippets) => {
  arrayOfSnippets.forEach((snippet, index) => {
    coreSnippet = {
      title: snippet.title, 
      linkdocs: snippet.linkdocs,
      snippetBody: snippet.snippetBody
    }
    dbConnection.Snippet.create(coreSnippet).then((storedSnippet) => {
      let tags = _createTagObjs(snippet.tags);
      let tips = _createTipObjs(snippet.tips);

      tags.forEach(tag => {
        dbConnection.Tag.findOrCreate({where: {name: tag.name}})
        .spread((storedTag, created) => {
          console.log('HEREEEEEEEEEEEEE');
          storedSnippet.addTag(storedTag);
        }); 
      });      
      tips.forEach(val => {
        storedSnippet.createTip(val);
      });
    });
  });
}

let _createTagObjs = (arrayOfTags) => {
  return arrayOfTags.map((val) => {
    return {
      name: val
    }
  });
}

let _createTipObjs = (arrayOfTags) => {
  return arrayOfTags.map((val) => {
    return {
      text: val
    }
  });
}

createSnippets(snippets);