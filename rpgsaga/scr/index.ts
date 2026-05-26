import { Game } from "./core/game.js";
import { Logger } from "./core/logger.js";

const names = [
  "Артур",
  "Гэндальф",
  "Эльдар",
  "Вильямс",
  "Луна",
  "Кассий",
  "Рагнар",
  "Мира",
  "Селена",
  "Торин"
];

const logger = new Logger();
const game = new Game(logger);

game.runTournament(8, names);
