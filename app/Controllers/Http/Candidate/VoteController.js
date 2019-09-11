'use strict';

const CandidateService = use('App/Services/CandidateService');
const CustomHttpException = use('App/Exceptions/CustomHttpException');

class VoteController {

  constructor() {
    /** @type {import('../../../Services/CandidateService')} */
    this.candidateService = new CandidateService();
  }

  /**
  * @swagger
  * "/api/candidates":
  *   get:
  *     tags:
  *       - Candidate Vote
  *     summary: List all Candidates
  *     parameters:
  *       - name: exclude
  *         description: ID of Candidate Excluded
  *         in: query
  *         required: false
  *         type: integer
  *     responses:
  *       200:
  *         description: Show the list of currencies
  *         example:
  *           message: Success
  */
  getAllCandidates ({auth, request, response}) {
    const exclude = request.input('exclude', null);
    return this.candidateService.getAllCandidatesButExcludeOne(
      exclude? parseInt(exclude) : null
    );
  }

 /**
  * @swagger
  * "/api/candidate/:id":
  *   get:
  *     tags:
  *       - Candidate Vote
  *     summary: Find a candidate by its ID
  *     responses:
  *       200:
  *         description: Candidate Found
  *         example:
  *           message: Success
  *       404:
  *         description: Candidate Not Found
  *         example:
  *           message: Not Found
  */
  async findCandidateById ({auth, request, params, response}) {
    const candidate = await this.candidateService.findCandidateById(params.id);
    if (!candidate) {
      throw new CustomHttpException('Candidate Not Found!', 404, { id: params.id });
    }
    return candidate;
  }

 /**
  * @swagger
  * "/api/candidate/:id/votes/positive":
  *   get:
  *     tags:
  *       - Candidate Vote
  *     summary: Voting Positive for a candidate
  *     responses:
  *       200:
  *         description: Voted Positive
  *         example:
  *           message: Success
  *       404:
  *         description: Candidate Not Found
  *         example:
  *           message: Not Found
  */
  votePositive ({auth, request, params, response}) {
    const candidate = this.candidateService.voteForCandidateById(params.id, 'positive');
    if (!candidate) {
      throw new CustomHttpException('Candidate Not Found!', 404, { id: params.id });
    }
    return candidate;
  }

 /**
  * @swagger
  * "/api/candidate/:id/votes/negative":
  *   get:
  *     tags:
  *       - Candidate Vote
  *     summary: Voting Negative for a candidate
  *     responses:
  *       200:
  *         description: Voted Negative
  *         example:
  *           message: Success
  *       404:
  *         description: Candidate Not Found
  *         example:
  *           message: Not Found
  */
  voteNegative ({auth, request, params, response}) {
    const candidate = this.candidateService.voteForCandidateById(params.id, 'negative');
    if (!candidate) {
      throw new CustomHttpException('Candidate Not Found!', 404, { id: params.id });
    }
    return candidate;
  }
}

module.exports = VoteController;
