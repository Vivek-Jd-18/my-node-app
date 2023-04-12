const express = require('express');
const app = express();
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');

app.get('/pinToIPFS', (req, res) => {

  //edit starts
  // Use the api keys by specifying your api key and api secret
  let snftId = req.params["snftId"];

  console.log(snftId);
  const pinata = new pinataSDK({ pinataApiKey: '9037d272e8c8f05e7dfd', pinataSecretApiKey: 'c59d64538b85a78c88344805aefb5414b748e8e078cdda980f0eae1b7939656b' });
  const readableStreamForFileImage = fs.createReadStream('/home/ubuntu/Documents/my-node-app/my-node-app/help_bg.png');
  const options = {
    pinataMetadata: {
      name: "TestPin"
    },
    pinataOptions: {
      cidVersion: 0
    }
  };

  const readableStreamForFileVideo = fs.createReadStream('/home/ubuntu/Documents/my-node-app/my-node-app/swimming-10835.mp4');
  const options2 = {
    pinataMetadata: {
      name: "TestPin"
    },
    pinataOptions: {
      cidVersion: 0
    }
  };

  pinata.pinFileToIPFS(readableStreamForFileImage, options).then((imageResult) => {
    //handle results here
    console.log(imageResult, "Image response");
    pinata.pinFileToIPFS(readableStreamForFileVideo, options2).then((videoResult) => {
      console.log(videoResult, "Video response");
      const body = {
        name: 'Name by SNFT Id from DB here',
        image: `https://gateway.pinata.cloud/ipfs/${imageResult.IpfsHash}`,
        video_url: `https://gateway.pinata.cloud/ipfs/${videoResult.IpfsHash}`,
        description: 'Desc by SNFT Id from DB here'
      };
      const options = {
        pinataMetadata: {
          name: "Name by SNFT Id from DB here"
        },
        pinataOptions: {
          cidVersion: 0
        }
      };
      pinata.pinJSONToIPFS(body, options).then((jsonPinResult) => {
        //handle results here
        console.log("Final METADATA", `https://gateway.pinata.cloud/ipfs/${jsonPinResult.IpfsHash}`);
        res.send({ "IpfsHashURL": `https://gateway.pinata.cloud/ipfs/${jsonPinResult.IpfsHash}` });
      }).catch((err) => {
        //handle error here
        console.log("JSON Pin Error", err);
        res.send('JSON PIN ERROR');
      });

    }).catch((e) => {
      console.log(err);
      res.send("error");
    })

  }).catch((err) => {
    //handle error here
    console.log(err);
    res.send("error");

  });

  //edit ends


  // const imageUrl = 'https://example.com/image.jpg';

  // request({ url: imageUrl, encoding: null }, (err, response, body) => {
  //   if (err) throw err;

  //   const base64 = Buffer.from(body).toString('base64');

  //   console.log(base64);
  // });
});

app.listen(3001, () => {
  console.log('App listening on port 3000!');
});