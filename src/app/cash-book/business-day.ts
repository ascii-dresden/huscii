import { Meta } from '@app/shared';

export class Unit {

  constructor(public readonly value: number, public amount: number = 0) { }
}

export class BusinessDay {

  /** Id */
  id: number | string;

  /** Date */
  date: string | number = new Date().toLocaleDateString();

  /** Amount of money in the till in the morning in cent  */
  balanceAM = 0;

  /** Amount of money in the till in the evening in cent */
  balancePM = 0;

  /** Amount of hundered notes in the till */
  hundered: Unit = new Unit(10000);

  /** Amount of fifty notes in the till */
  fifty: Unit = new Unit(5000);

  /** Amount of twenty notes in the till */
  twenty: Unit = new Unit(2000);

  /** Amount of ten notes in the till */
  ten: Unit = new Unit(1000);

  /** Amount of five notes in the till */
  five: Unit = new Unit(500);

  /** Amount of two coins in the till */
  two: Unit = new Unit(200);

  /** Amount of one coins in the till */
  one: Unit = new Unit(100);

  /** Amount of fifty cent coins in the till */
  half: Unit = new Unit(50);

  /** Amount of twenty cent coins in the till */
  fifth: Unit = new Unit(20);

  /** Amount of ten cent coins in the till */
  tenth: Unit = new Unit(10);

  /** Amount of five cent coins in the till */
  twentieth: Unit = new Unit(5);

  /** Amount of two cent coins in the till */
  fiftieth: Unit = new Unit(2);

  /** Amount of one cent coins in the till */
  hundredth: Unit = new Unit(1);

  /** Created timestamp */
  createdAt: string = new Date().toISOString();

  /** Updated timestamp */
  updatedAt: string = new Date().toISOString();

  /** Meta */
  meta: Meta = new Meta();
}
