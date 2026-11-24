import type { Genre } from '@/types/models';

const CRIME_QUERY =
  'subject_key:(crime OR crime_fiction OR crime_fiction_fiction OR fiction_crime*)';
const DRAMA_QUERY = 'subject_key:drama';
const FANTASY_QUERY = 'subject_key:(fantasy* OR fiction_fantasy*)';
const HORROR_QUERY = 'subject_key:(horror* OR fiction_horror*)';
const MYSTERY_QUERY = 'subject_key:(mystery* OR fiction_mystery__detective*)';
const ROMANCE_QUERY = 'subject_key:(romance* OR fiction_romance*)';
const SCI_FI_QUERY = 'subject_key:(science_fiction* OR fiction_science_fiction*)';
const THRILLER_QUERY =
  'subject_key:(thriller* OR fiction_thrillers* OR fiction_suspense* OR suspense*)';
const KIDS_QUERY =
  "subject_key:(juvenile_fiction OR juvenile_literature OR children's_fiction OR juvenile_nonfiction)";
const HISTORY_QUERY = 'subject_key:history';
const BIOGRAPHY_QUERY = 'subject_key:(biography OR biographies)';

export const GENRES: Genre[] = [
  {
    coversSubject: 'classics',
    name: 'Featured',
    query: 'trending_score_hourly_sum:[1 TO *] AND readinglog_count:[4 TO *]',
    slug: 'featured',
    subgenres: [
      { name: "What's new", query: 'readinglog_count:[50 TO *]', slug: 'whats-new', sort: 'new' },
      {
        name: 'Books we love',
        query: 'ratings_count:[50 TO *]',
        slug: 'books-we-love',
        sort: 'random.daily',
      },
      { name: 'Classics', query: 'subject_key:classics', slug: 'classics' },
      {
        name: 'Most wanted',
        query: 'readinglog_count:[4 TO *]',
        slug: 'most-wanted',
        sort: 'want_to_read',
      },
    ],
    title: 'Trending',
  },
  {
    coversSubject: 'crime',
    name: 'Crime',
    query: CRIME_QUERY,
    slug: 'crime',
    subgenres: [
      {
        name: 'Detective',
        query: `${CRIME_QUERY} subject_key:(detective* OR fiction_mystery__detective*)`,
        slug: 'detective',
      },
      { name: 'True Crime', query: 'subject_key:true_crime', slug: 'true-crime' },
    ],
    title: 'Trending in Crime',
  },
  {
    coversSubject: 'drama',
    name: 'Drama',
    query: DRAMA_QUERY,
    slug: 'drama',
    subgenres: [
      {
        name: 'Psychological',
        query: `${DRAMA_QUERY} subject_key:psychological*`,
        slug: 'psychological',
      },
    ],
    title: 'Trending in Drama',
  },
  {
    coversSubject: 'fantasy',
    name: 'Fantasy',
    query: FANTASY_QUERY,
    slug: 'fantasy',
    subgenres: [
      {
        name: 'Epic',
        query: `${FANTASY_QUERY} subject_key:(fiction_fantasy_epic* OR epic_fantasy*)`,
        slug: 'epic',
      },
      {
        name: 'Steampunk',
        query: `${FANTASY_QUERY} subject_key:steampunk*`,
        slug: 'steampunk',
      },
    ],
    title: 'Trending in Fantasy',
  },
  {
    coversSubject: 'horror',
    name: 'Horror',
    query: HORROR_QUERY,
    slug: 'horror',
    subgenres: [
      {
        name: 'Gothic',
        query: `${HORROR_QUERY} subject_key:gothic*`,
        slug: 'gothic',
      },
      {
        name: 'Psychological',
        query: `${HORROR_QUERY} subject_key:psychological*`,
        slug: 'psychological',
      },
    ],
    title: 'Trending in Horror',
  },
  {
    coversSubject: 'mystery',
    name: 'Mystery',
    query: MYSTERY_QUERY,
    slug: 'mystery',
    subgenres: [
      {
        name: 'Detective',
        query: `${MYSTERY_QUERY} subject_key:(detective* OR private_investigators*)`,
        slug: 'detective',
      },
      {
        name: 'Locked Room',
        query: `${MYSTERY_QUERY} subject_key:locked_room*`,
        slug: 'locked-room',
      },
    ],
    title: 'Trending in Mystery',
  },
  {
    coversSubject: 'romance',
    name: 'Romance',
    query: ROMANCE_QUERY,
    slug: 'romance',
    subgenres: [
      {
        name: 'Historical',
        query: `${ROMANCE_QUERY} subject_key:(fiction_romance_historical* OR historical_romance* OR historical_fiction*)`,
        slug: 'historical',
      },
      {
        name: 'Western',
        query: `${ROMANCE_QUERY} subject_key:(fiction_romance_western* OR western*)`,
        slug: 'western',
      },
      {
        name: 'Paranormal',
        query: `${ROMANCE_QUERY} subject_key:paranormal*`,
        slug: 'paranormal',
      },
      {
        name: 'Regency',
        query: `${ROMANCE_QUERY} subject_key:regency*`,
        slug: 'regency',
      },
      {
        name: 'Contemporary',
        query: `${ROMANCE_QUERY} subject_key:(fiction_romance_contemporary* OR contemporary*)`,
        slug: 'contemporary',
      },
      {
        name: 'Suspense',
        query: `${ROMANCE_QUERY} subject_key:(fiction_romance_suspense* OR romantic_suspense*)`,
        slug: 'suspense',
      },
      {
        name: 'Coming of Age',
        query: `${ROMANCE_QUERY} subject_key:coming_of_age*`,
        slug: 'coming-of-age',
      },
      {
        name: 'Gothic',
        query: `${ROMANCE_QUERY} subject_key:gothic*`,
        slug: 'gothic',
      },
    ],
    title: 'Trending in Romance',
  },
  {
    coversSubject: 'science_fiction',
    name: 'Sci-Fi',
    query: SCI_FI_QUERY,
    slug: 'sci-fi',
    subgenres: [
      {
        name: 'Space Opera',
        query: `${SCI_FI_QUERY} subject_key:(space_opera* OR fiction_science_fiction_space_opera*)`,
        slug: 'space-opera',
      },
      {
        name: 'Dystopian',
        query: `${SCI_FI_QUERY} subject_key:(dystopia* OR fiction_dystopian*)`,
        slug: 'dystopian',
      },
      {
        name: 'Steampunk',
        query: `${SCI_FI_QUERY} subject_key:steampunk*`,
        slug: 'steampunk',
      },
      { name: 'Epic', query: `${SCI_FI_QUERY} subject_key:epic*`, slug: 'epic' },
    ],
    title: 'Trending in Sci-Fi',
  },
  {
    coversSubject: 'thriller',
    name: 'Thriller',
    query: THRILLER_QUERY,
    slug: 'thriller',
    subgenres: [
      {
        name: 'Psychological',
        query: `${THRILLER_QUERY} subject_key:(psychological* OR fiction_thrillers_psychological*)`,
        slug: 'psychological',
      },
      {
        name: 'Espionage',
        query: `${THRILLER_QUERY} subject_key:(espionage* OR spies* OR fiction_thrillers_espionage*)`,
        slug: 'espionage',
      },
    ],
    title: 'Trending in Thriller',
  },
  {
    coversSubject: 'juvenile_literature',
    name: 'Kids',
    query: KIDS_QUERY,
    slug: 'kids',
    subgenres: [
      {
        name: 'Friendship',
        query: `${KIDS_QUERY} subject_key:friendship*`,
        slug: 'friendship',
      },
      {
        name: 'Adventure',
        query: `${KIDS_QUERY} subject_key:adventure*`,
        slug: 'adventure',
      },
      {
        name: 'School',
        query: `${KIDS_QUERY} subject_key:school*`,
        slug: 'school',
      },
      {
        name: 'Picture books',
        query: `${KIDS_QUERY} subject_key:picture_books*`,
        slug: 'picture-books',
      },
      {
        name: 'Fantasy',
        query: `${KIDS_QUERY} subject_key:(fantasy* OR juvenile_fiction_fantasy*)`,
        slug: 'fantasy',
      },
      {
        name: 'Mystery',
        query: `${KIDS_QUERY} subject_key:(mystery* OR juvenile_fiction_mysteries*)`,
        slug: 'mystery',
      },
      {
        name: 'Humor',
        query: `${KIDS_QUERY} subject_key:(humor* OR humorous_stories*)`,
        slug: 'humor',
      },
    ],
    title: 'Trending in Kids',
  },
  {
    coversSubject: 'history',
    name: 'History',
    query: HISTORY_QUERY,
    slug: 'history',
    subgenres: [
      {
        name: 'United States',
        query: `${HISTORY_QUERY} subject_key:united_states*`,
        slug: 'united-states',
      },
      {
        name: 'Great Britain',
        query: `${HISTORY_QUERY} subject_key:(great_britain* OR england*)`,
        slug: 'great-britain',
      },
      {
        name: 'Military',
        query: `${HISTORY_QUERY} subject_key:military*`,
        slug: 'military',
      },
      {
        name: 'World War II',
        query: `${HISTORY_QUERY} subject_key:world_war*1939-1945*`,
        slug: 'world-war-ii',
      },
      {
        name: 'Ancient',
        query: `${HISTORY_QUERY} subject_key:(ancient* OR antiquities*)`,
        slug: 'ancient',
      },
      {
        name: 'Middle Ages',
        query: `${HISTORY_QUERY} subject_key:middle_ages*`,
        slug: 'middle-ages',
      },
    ],
    title: 'Trending in History',
  },
  {
    coversSubject: 'biography',
    name: 'Biography',
    query: BIOGRAPHY_QUERY,
    slug: 'biography',
    subgenres: [
      {
        name: 'Women',
        query: `${BIOGRAPHY_QUERY} subject_key:women*`,
        slug: 'women',
      },
      {
        name: 'Writers',
        query: `${BIOGRAPHY_QUERY} subject_key:(authors* OR novelists*)`,
        slug: 'writers',
      },
      {
        name: 'Presidents',
        query: `${BIOGRAPHY_QUERY} subject_key:presidents*`,
        slug: 'presidents',
      },
      {
        name: 'Memoir',
        query: `${BIOGRAPHY_QUERY} subject_key:memoir*`,
        slug: 'memoir',
      },
      {
        name: 'Artists',
        query: `${BIOGRAPHY_QUERY} subject_key:artists*`,
        slug: 'artists',
      },
      {
        name: 'Royalty',
        query: `${BIOGRAPHY_QUERY} subject_key:(kings_and_rulers* OR queens* OR royalty*)`,
        slug: 'royalty',
      },
    ],
    title: 'Trending in Biography',
  },
];
