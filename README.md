# Nflix Player: A Netflix-Inspired Video Player

## About

An easy to use React video player component styled to look like Netflix.

## Installation

`npm i nflix-player`

## Usage

`import VideoPlayer from 'nflix-player1'`

`<VideoPlayer properties={properties} />`

Accepts an object with video player properties.

```
//example properties object:

const properties = {
    title: "Melancholy",    //string | required
    url: "https://www.pexels.com/video/5510668/download/?search_query=&tracking_id=39oy5nn2wu7",    //url-string | required
    width: 1000,    //number or string || default = "100vw"
    height: 1000,    //number or string || default = "100vh"
    loop: true,    //loop video | boolean | default = false
    timeout: 8000,  //sets number of milliseconds for controls to disappear | default = 10000
  };
```

## License

Distributed under MIT license

## Acknowledgement

Spinner by Tobias Ahlin from https://tobiasahlin.com/spinkit/
