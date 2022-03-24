import "./App.css";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  Dimmer,
  Header,
  Icon,
  Loader,
  Segment,
} from "semantic-ui-react";

export const App = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [IDsTried, setIDsTried] = useState(0);
  const [imgFound, setImgFound] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [use7CharURL, setUse7CharURL] = useState(false);

  const createRandomID = () => {
    const codeLength = use7CharURL ? 7 : 5;
    const validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomID = "";
    for (let i = 0; i < codeLength; i++) {
      randomID += validCharacters.charAt(Math.floor(Math.random() * validCharacters.length));
    }
    return randomID;
  };

  const showRandomImage = async () => {
    setButtonClicked(true);
    setImgFound(false);
    setIDsTried(0);

    while (true) {
      const randomID = createRandomID();
      const response = await fetch(`https://i.imgur.com/${randomID}.png`, {
        redirect: "manual",
      });

      setIDsTried((currentValue) => currentValue + 1);

      if (response.status === 200) {
        setImgFound(true);
        setImgSrc(`https://i.imgur.com/${randomID}.png`);
        break;
      }
    }
  };

  return (
    <Container id="container" textAlign="center">
      <Header as="h3" block>
        Imgur Roulette
      </Header>

      <Segment attached>
        Show a random image on Imgur. By default, only images uploaded before January 18th 2013 are
        shown. This is to reduce the search time. Change this by ticking the checkbox below.
      </Segment>

      <Checkbox
        onClick={() => setUse7CharURL((currentValue) => !currentValue)}
        label="Search using 7-character IDs"
        style={{ margin: "10px 0px" }}
      />

      <Button style={{ margin: "10px 0px" }} onClick={showRandomImage} icon labelPosition="right">
        Show a Random Image
        <Icon name="picture" />
      </Button>

      <i>You may see a NSFW image. Use the button at your own risk.</i>

      {buttonClicked && !imgFound ? (
        <Dimmer active>
          <Loader size="massive">Tried {IDsTried} image IDs...</Loader>
        </Dimmer>
      ) : (
        <a href={imgSrc}>
          <img src={imgSrc}></img>
        </a>
      )}
    </Container>
  );
};
