import React, {Component} from 'react';
import TextAdder from './TextAdder';
import './addSnippet.css';

class AddSnippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: [],
      tags: []
    }
    this.addToList = this.addToList.bind(this);
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
    console.log('NEED TO SEND DATA TO SERVER');
  }

  render() {
    return (
      <div>
        <h6>Snippet Title</h6>
        <input ref={(node) => this.titleNode = node}/>
        <h6>Snippet Body</h6>
        <textarea id="snippet-body"rows="4" cols="50" ref={(snippetNode) => {this.snippetNode = snippetNode}}></textarea>
        <TextAdder name="Tip" addFunc={(node) => {this.addToList('tips', node)}} list={this.state.tips}/>
        <TextAdder name="Tag" addFunc={(node) => {this.addToList('tags', node)}} list={this.state.tags}/>
        <button id="save-snippet" onClick={this.saveSnippet}>Save Snippet</button>

      </div>
    );
  }
}

export default AddSnippet;