'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Candidate extends Model {
  get result () {
    if (this.positive_votes > this.negative_votes) {
      return 'positive';
    }
    if (this.positive_votes < this.negative_votes) {
      return 'negative';
    }
    return 'neutral';
  }
}

module.exports = Candidate;
