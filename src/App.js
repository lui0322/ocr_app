import React, { Component } from "react";
import Tesseract from "tesseract.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      patterns: [],
      documents: [],
      text: "",
      loading: false,
    };
  }

  handleChange = (event) => {
    if (event.target.files[0]) {
      var uploads = [];
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        uploads.push(URL.createObjectURL(upload));
      }
      this.setState({
        uploads: uploads,
      });
    } else {
      this.setState({
        uploads: [],
      });
    }
  };

  generateText = () => {
    let uploads = this.state.uploads;
    this.setState({
      text: "Initializing...",
      loading: true,
    });

    Tesseract.recognize(uploads[0], "eng", {
      logger: (m) => {
        console.log(m);
      },
    }).then(({ data: { text } }) => {
      console.log(text);
      this.setState({
        text: text,
        loading: false,
      });
    });
  };

  render() {
    const { text, loading } = this.state;
    return (
      <div className="app">
        <header className="header">
          <h2>OCR App</h2>
          <code>
            <small>automatic text orientation and script detection</small>
          </code>
        </header>

        {/* File uploader */}
        <section className="hero">
          <label className="fileUploaderContainer">
            Click here to upload documents
            <input type="file" id="fileUploader" onChange={this.handleChange} />
          </label>

          <div>
            {this.state.uploads.map((value, index) => {
              return <img key={index} src={value} width="200px" alt="" />;
            })}
          </div>

          <button
            onClick={this.generateText}
            disabled={loading ? true : false}
            className="button"
          >
            Generate OCR Image
          </button>
        </section>

        {/* Results */}
        <section className="results">
          <div className="results__result">
            <small>{text}</small>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
