'use strict';

const is = require('is_js');
const moment = require('moment');
const Env = use('Env');

const Candidate = use('App/Models/Candidate');
const CacheService = use('App/Services/CacheService');
const CustomHttpException = use('App/Exceptions/CustomHttpException');
const DataValidatorException = use('App/Exceptions/DataValidatorException');

class CandidateService {

  constructor () {
    this.cache = CacheService.getCache();
    this.minutesToExpire = parseInt(Env.get('MINUTES_TO_EXPIRE_CACHED_VOTE_INFO', '10'));
  }

  /**
   * Get all candidates and it could exclude one
   * @param Integer excludedId
   */
  async getAllCandidatesButExcludeOne (excludedId) {
    let candidates = [];
    if (is.not.null(excludedId) && is.integer(excludedId)) {
      candidates = await Candidate
        .query()
        .whereNot('id', excludedId)
        .fetch();
    } else {
      candidates = await Candidate
        .query()
        .fetch();
    }
    return candidates;
  }

  /**
   * Find a canidate by ID
   * @param Integer id
   */
  findCandidateById (id) {
    return Candidate.find(id);
  }

  voteHasExpired (candidate) {
    const nowDate = new moment();
    const expirationDate = new moment(candidate.expires_at,"YYYY-MM-DD");
    if (nowDate.isAfter(expirationDate)) {
      throw new CustomHttpException('Vote Has Expired!', 403, null);
    }
  }

  /**
   * Voting for a candidate
   *
   * @param {integer} id
   * @param {string} voteType
   */
  async voteForCandidateById (id, voteType) {
    let candidate = await this.findCandidateById(id);
    if (!candidate) {
      throw new CustomHttpException('Candidate Not Found!', 404, null);
    }
    const voteTypes = ['negative', 'positive'];
    if (!voteTypes.includes(voteType)) {
      throw new CustomHttpException('Vote Type is Invalid!', 409, { voteType });
    }
    this.voteHasExpired(candidate);
    if (voteType === 'positive') {
      candidate.positive_votes += 1;
    } else {
      candidate.negative_votes += 1;
    }
    await candidate.save();
    return candidate.toJSON();
  }

}

module.exports = CandidateService;
