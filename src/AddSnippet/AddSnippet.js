import React, {Component} from 'react';
import TextAdder from './TextAdder';
import './addSnippet.css';
import 'whatwg-fetch';

class AddSnippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: [],
      tags: []
    }
    this.addToList = this.addToList.bind(this);
    this.saveSnippet = this.saveSnippet.bind(this);
  }

  addToList(selectedState, node) {
    console.log(node);
    console.log(selectedState);
    let newList = {};
    newList[selectedState] = this.state[selectedState].concat([node.value]);

    this.setState(newList, () => {
      node.value = ''}
    );  
  }

  saveSnippet() {
    let newSnippet = {};
    newSnippet.title = this.titleNode.value;
    newSnippet.linkdocs = this.linkNode.value;
    newSnippet.snippetBody = this.snippetNode.value;
    newSnippet.tips = this.state.tips;
    newSnippet.tags = this.state.tags;
    fetch('http://127.0.0.1:8080/snippets/react', {
                method: 'POST',
                headers : {
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(newSnippet)
            }).then((res) => res.json())
            .then((data) => {
              this.setState({
                tips: [],
                tags: []
              });
            })
            .catch((err)=>console.log(err));
  }

  render() {
    return (
      <div>
        <h6>Snippet Title</h6>
        <input ref={(node) => this.titleNode = node}/>
        <h6>Snippet Body</h6>
        <pre>
          <textarea id="snippet-body"rows="4" cols="50" ref={(snippetNode) => {this.snippetNode = snippetNode}}></textarea>
        </pre>
        <h6>Documentation link</h6>
        <input ref={(node) => this.linkNode = node}/>
        <TextAdder name="Tip" addFunc={(node) => {this.addToList('tips', node)}} list={this.state.tips}/>
        <TextAdder name="Tag" addFunc={(node) => {this.addToList('tags', node)}} list={this.state.tags}/>
        <button id="save-snippet" onClick={this.saveSnippet}>Save Snippet</button>

      </div>
    );
  }
}

export default AddSnippet;