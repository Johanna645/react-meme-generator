import { useState } from 'react';
import './App.css';
const axios = require('axios');

// creating the state variables
// event-functions for the input-buttons to interact with the picture

function App() {
  const [textInputFirstLine, setTextInputFirstLine] = useState('memes');
  const [textInputSecondLine, setTextInputSecondLine] = useState(
    'memes_everywhere',
  );
  const [picture, setPicture] = useState('bs');

  function handlePictureChange(event) {
    setPicture(event.target.value);
  }

  function handleChange(event) {
    setTextInputFirstLine(event.target.value);
  }
  function handleChange2(event) {
    setTextInputSecondLine(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">the meme-generator</h1>
      </header>
      <body>
        <div className="App-row">
          <div className="App-column1">
            <p className="App-p1">Wanna write text on the top line?</p>
            <input
              type="text"
              className="App-textfield"
              value={textInputFirstLine}
              onChange={handleChange}
            />

            <br />
            <p className="App-p2">Wanna write text on the bottom line?</p>
            <input
              type="text"
              className="App-textfield"
              value={textInputSecondLine}
              onChange={handleChange2}
            />
            <br />
            <div>
              <label for="picture">
                <p className="App-p2">
                  Don't like fish, choose another picture?
                </p>
                <select
                  className="App-textfield"
                  name="picture"
                  id="picture"
                  type="image"
                  value={picture}
                  onChange={handlePictureChange}
                >
                  <option value="bs">bs</option>
                  <option value="soup-nazi">soup</option>
                  <option value="keanu">keanu</option>
                  <option value="fbf">frog</option>
                </select>
              </label>
            </div>
            <br />
            <br />
            <button
              className="App-textfield"
              onClick={() => {
                axios
                  .get(
                    `https://api.memegen.link/images/${picture}/${textInputFirstLine}/${textInputSecondLine}.png?width=325&height=325`,
                    { responseType: 'blob' },
                    {
                      /* blob = binary large object (images, pdfs,...) */
                    },
                  )
                  .then((response) => {
                    // objekt erstellen & daten übergeben
                    const blob = new Blob([response.data]);
                    // URL für den download des blobs erstellen
                    const url = window.URL.createObjectURL(blob);

                    // erstelle einen html-link, der NICHT auf der seite angezeigt wird
                    const link = document.createElement('a');
                    // setze die URL auf den blob
                    link.href = url;
                    // lege den download-namen fest für den blob
                    link.setAttribute('download', 'image.jpg');
                    // hänge A-element in das dokument rein
                    document.body.appendChild(link);
                    // klicke den link automatisch an
                    link.click();
                  });
              }}
            >
              Download
            </button>
          </div>
          <div className="App-column2">
            <div className="App-box">
              <img
                src={`https://api.memegen.link/images/${picture}/${textInputFirstLine}/${textInputSecondLine}.png`}
                alt="meme"
                width="350px"
              />
            </div>
          </div>
        </div>
      </body>
      <footer className="App-footer" />
    </div>
  );
}

export default App;
