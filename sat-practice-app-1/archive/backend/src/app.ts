import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { setQuestionsRoutes } from './routes/questions';
import { setScoringRoutes } from './routes/scoring';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setQuestionsRoutes(app);
setScoringRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});