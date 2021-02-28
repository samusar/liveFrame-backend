const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const routes = require('./routes');
const connection = require('./database/connection');


const app = express();

app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const sockets = socketio(server);

app.use("/screen", express.static('public'));
app.use("/monitor", express.static('public/monitor'));

var slides = [];
var positionSlide = 0;
var visible = 'false';

app.get('/live/slide/:number', (req, res) => {
  const {number} = req.params;
  positionSlide = number;

  sendInfoUpdated();
    
  return res.send();
});

app.get('/live', (req, res) => {
  const {visibility} = req.query;
  console.log('o que é isso', visibility);
  sendInfoUpdated({
    visible: visibility === 'true' ? visibility : 'false'
  });
    
  return res.send();
});

app.get('/live/content/:id', async (req, res) => {
  const {id} = req.params;

  const slidesContent = await connection('slide_content').where('content_id', '=', id).select('*').orderBy('order_number', 'asc');

  positionSlide = 0;

  slides = slidesContent.map(function(slide){
    return slide.description;
  });

  sendInfoUpdated();
    
  return res.send();
});

function sendInfoUpdated(data = null){
  if(data) {
    if(data.slides) {
      slides = data.slides;
    }
    if(data.positionSlide) {
      positionSlide = data.positionSlide;
    }
    if(data.visible) {
      visible = data.visible;
    }
  }

  console.log('enviar', slides, positionSlide, visible);
  sockets.emit('update-content', {slides, positionSlide, visible});
}


sockets.on('connection', (socket) => {
  const client = socket.id;
  console.log('Client connected', client);
  socket.emit('update-content', {slides, positionSlide, visible})
});

server.listen(3333, () => {
  console.log('server started on 3333');
});