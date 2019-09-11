'use strict'

/*
|--------------------------------------------------------------------------
| CandidateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
/** @type {import('../../app/Models/Candidate')} */
const Candidate = use('App/Models/Candidate');

class CandidatesSeeder {
  async run () {
    const initialCandidates = [
      {
        is_main: true,
        name: 'Pope Francis',
        resume: "He's talking tough on clergy sexual abuse, but is he just another papal pervert protector? (thumbs down) or a true pedofile punishing pontiff? (thumbs up)",
        category: 'Religion',
        expires_at: '2019-10-02',
      },
      {
        is_main: false,
        name: 'Kanye West',
        resume: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut molestie eros vitae gravida tristique.",
        category: 'Entertainment',
        expires_at: '2019-10-02',
      },
      {
        is_main: false,
        name: 'Mark Zuckerberg',
        resume: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut molestie eros vitae gravida tristique.",
        category: 'Business',
        expires_at: '2019-10-02',
      },
      {
        is_main: false,
        name: 'Cristina Fernández de Kirchner',
        resume: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut molestie eros vitae gravida tristique.",
        category: 'Politics',
        expires_at: '2019-10-02',
      },
      {
        is_main: false,
        name: 'Malala Yousafzai',
        resume: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut molestie eros vitae gravida tristique.",
        category: 'Entertainment',
        expires_at: '2019-10-02',
      },
    ];
    for(const candidateItem of initialCandidates) {
      const candidate = await Candidate.create(candidateItem);
      console.log('--- Created candidate', candidate);
    }

  }
}

module.exports = CandidatesSeeder;
