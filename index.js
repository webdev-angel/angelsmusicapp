const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const methodOverride = require('method-override');
const config = require('config');
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride('_method'));

require('./startup/prod')(app);

app.use(express.static(__dirname + '/public'));
app.use('/uploads',express.static('uploads'));

app.use(express.urlencoded({extended:false}));

const homeRouter = require('./routes/home');
const artistRouter = require('./routes/artists');
const eventsRouter = require('./routes/events');
const adminRouter = require('./routes/admin');
const viewSongRouter = require('./routes/view-song');
const undergroundRouter = require('./routes/underground');
const libraryRouter = require('./routes/library');
const albumsRouter = require('./routes/albums');
const memberRouter = require('./routes/members');

const { default: mongoose } = require('mongoose');

app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/artists', artistRouter);
app.use('/events', eventsRouter);
app.use('/admin', adminRouter);
app.use('/view-song', viewSongRouter);
app.use('/underground', undergroundRouter);
app.use('/library', libraryRouter);
app.use('/albums', albumsRouter);
app.use('/members', memberRouter);

const dbString = config.get('dbString');

mongoose.connect(`${dbString}`)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const port = process.env.PORT || 3000;

app.listen(port,() => console.log(`Listening on port ${port}`));