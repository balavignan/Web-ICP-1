import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    window.focus();
    new StartGame().start();
  }

}

const VERTICAL = 50; // number of squares on vertical
const HORIZONTAL = 30; // number of squares on horizontal
const SQUARESIZE = 10; // size of each square
const SCALE = 10.0; // draw everything twice as big and make it smaller to get clean lines even on a retina screen
const VELOCITY = 100; // initial speed
const MAX_LEVEL = 10;
const COLOR = '#31a9a0';

interface Config {
  level: number;
  speed: number;
  nbAreasX: number;
  nbAreasY: number;
  width: number;
  height: number;
  areaWidth: number;
  areaHeight: number;
  color: string;
}

type Direction = 'Up' | 'Right' | 'Left' | 'Down';

class Area {

  xaxis: number;
  yaxis: number;

  constructor(xaxis: number, yaxis: number) {
    this.xaxis = xaxis;
    this.yaxis = yaxis;
  }
}

class Snake {

  readonly STARTING_SIZE = 3;
  readonly STARTING_DIRECTION = 'Right';
  readonly STARTING_POSITION = { x: 1, y: 1 };

  private head: Area;
  private tail: Area[];
  private readonly directions: Direction[];
  private size: number;
  private startGame: StartGame;

  constructor(startGame: StartGame) {
    this.startGame = startGame;

    this.size = this.STARTING_SIZE;
    this.directions = [this.STARTING_DIRECTION];

    // head
    this.head = new Area(this.STARTING_POSITION.x, this.STARTING_POSITION.y);

    // Minimum tail
    this.tail = [];
  }

  setDirection(direc: Direction) {
    const lastDirec = this.directions[this.directions.length - 1];
    if (lastDirec === 'Up' && (direc === 'Down' || direc === 'Up')) {
      return;
    }
    if (lastDirec === 'Down' && (direc === 'Up' || direc === 'Down')) {
      return;
    }
    if (lastDirec === 'Left' && (direc === 'Right' || direc === 'Left')) {
      return;
    }
    if (lastDirec === 'Right' && (direc === 'Left' || direc === 'Right')) {
      return;
    }
    this.directions.push(direc);
  }

  movement() {

    // add current head to tail
    this.tail.push(this.head);

    // get next position
    this.head = this.getNext();

    // fix the snake size
    if (this.tail.length > this.size) {
      this.tail.splice(0, 1);
    }
  }

  getNext(): Area {
    const direction = this.directions.length > 1 ? this.directions.splice(0, 1)[0] : this.directions[0];
    switch (direction) {
      case 'Up':
        return new Area(this.head.xaxis, this.head.yaxis - 1);
      case 'Right':
        return new Area(this.head.xaxis + 1, this.head.yaxis);
      case 'Down':
        return new Area(this.head.xaxis, this.head.yaxis + 1);
      case 'Left':
        return new Area(this.head.xaxis - 1, this.head.yaxis);
    }
  }

  draw(time: number, context: CanvasRenderingContext2D) {
    const { areaWidth, areaHeight } = this.startGame.getConfig();
    // head
    const x = areaWidth * this.head.xaxis;
    const y = areaHeight * this.head.yaxis;
    context.fillStyle = '#177a5f';
    context.fillRect(x, y, areaWidth, areaHeight);
    // tail
    context.fillStyle = '#f1febf';
    this.tail.forEach(area => context.fillRect(areaWidth * area.xaxis, areaHeight * area.yaxis, areaWidth, areaHeight));
  }

  grow(qty: number = 3) {
    this.size += qty;
  }

  getHead() {
    return this.head;
  }

  isSnake(area: Area) {
    return this.tail.find(el => area.xaxis === el.xaxis && area.yaxis === el.yaxis);
  }
}

class Grid {

  private startGame: StartGame;
  private apples: Area[];

  constructor(startGame: StartGame) {
    this.startGame = startGame;
    this.apples = [];
    this.apple();
  }

  apple() {
    const { nbAreasX , nbAreasY} = this.startGame.getConfig();
    const nbApples = 1;
    for (let count = 0;  count < nbApples; count++) {
      const x = Math.floor(Math.random() * nbAreasX);
      const y = Math.floor(Math.random() * nbAreasY);
      this.apples.push(new Area(x, y));
    }
  }

  draw(time: number, context: CanvasRenderingContext2D) {

    const { width, height, areaWidth, areaHeight } = this.startGame.getConfig();

    context.fillStyle = 'black';
    context.lineWidth = SCALE;

    for (let x = 0; x <= width; x += areaWidth) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (let y = 0; y <= height; y += areaHeight) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    // apples
    context.fillStyle = 'red';
    this.apples.forEach(area => context.fillRect(areaWidth * area.xaxis, areaHeight * area.yaxis, areaWidth, areaHeight));
  }

  isApple(area: Area) {
    return this.apples.find(el => area.xaxis === el.xaxis && area.yaxis === el.yaxis);
  }

  eat(area: Area) {
    this.apples = this.apples.filter(el => area.xaxis !== el.xaxis || area.yaxis !== el.yaxis);
  }

  isDone() {
    return this.apples.length === 0;
  }
}

class StartGame {

  private readonly canvas: HTMLCanvasElement;

  private score = 0;
  private running = false;
  private grid: Grid;
  private snake: Snake;
  private readonly config: Config;
  private nextMove: number;

  constructor() {

    this.canvas = document.createElement('Canvas') as HTMLCanvasElement;
    document.body.appendChild(this.canvas);

    this.canvas.style.width = VERTICAL * SQUARESIZE + 'px';
    this.canvas.style.height = HORIZONTAL * SQUARESIZE + 'px';
    this.canvas.width = VERTICAL * SQUARESIZE * SCALE;
    this.canvas.height = HORIZONTAL * SQUARESIZE * SCALE;

    // config
    this.config = {
      level: 0,
      speed: VELOCITY,
      width: this.canvas.width,
      height: this.canvas.height,
      nbAreasX: VERTICAL,
      nbAreasY: HORIZONTAL,
      areaWidth: this.canvas.width / VERTICAL,
      areaHeight: this.canvas.height / HORIZONTAL,
      color: COLOR,
    };

    this.snake = new Snake(this);
    this.grid = new Grid(this);

    // key  event listener
    window.addEventListener('keydown', this.onKeyDown.bind(this), false);
  }

  start() {
    this.nextMove = 0;
    this.running = true;
    requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    this.running = false;
  }

  getConfig() {
    return this.config;
  }

  loop(time: number) {

    if (this.running) {

      requestAnimationFrame(this.loop.bind(this));

      if (time >= this.nextMove) {

        this.nextMove = time + this.config.speed;

        this.snake.movement();

        switch (this.checkState()) {
          case -1:
            this.dead();
            break;
          case 1:
            this.snake.grow();
            this.score += 100;
            this.grid.eat(this.snake.getHead());
            if (this.grid.isDone()) {
              this.levelUp();
            }
            break;
          default:
            this.paint(time);
        }
      }
    }
  }

  paint(time: number) {

    const {width, height, color} = this.config;
    const context = this.canvas.getContext('2d');

    // background
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);

    // score
    context.font = 35 * SCALE + 'px Arial';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillStyle = 'rgba(0,0,0,0.25)';
    context.fillText(this.score + '', 10 * SCALE, 10 * SCALE);

    // grid
    this.grid.draw(time, context);
    // snake
    this.snake.draw(time, context);
  }

  checkState() {

    const area = this.snake.getHead();

    // outside the play area or ate itself??
    if (this.isOutside(area) || this.snake.isSnake(area)) {
      // dead
      return -1;
    }

    // ate apple?
    if (this.grid.isApple(area)) {
      return 1;
    }
    return 0;
  }

  levelUp() {
    this.config.level++;
    if (this.config.level < MAX_LEVEL) {
      this.config.speed -= 7;
      this.config.color = '#31a9a0';
      this.grid.apple();
    } else {
      this.winner();
    }
  }

  winner() {
    alert('Congrats you WON the GAME!!!!\r\n\r\nFinal Score: ' + this.score);
    this.stop();
  }

  dead() {
    alert('You died.\r\n\r\nFinal Score: ' + this.score);
    this.stop();
  }

  isOutside(area: Area) {
    const { nbAreasX, nbAreasY } = this.config;
    return area.xaxis < 0 || area.xaxis >= nbAreasX || area.yaxis < 0 || area.yaxis >= nbAreasY;
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.snake.setDirection('Up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.snake.setDirection('Down');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.snake.setDirection('Left');
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.snake.setDirection('Right');
        break;
    }
  }

}
