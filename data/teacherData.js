// Teacher Tribute & Appreciation Data Configuration

export const TEACHER_CONFIG = {
  // Passcode to unlock the surprise (DOB format: DDMM e.g. 1508 for August 15)
  passcode: '1508',
  passcodeHint: 'Teacher\'s Birthday: August 15 (Enter 1508)',

  // Teacher Profile Information
  name: 'Mrs Rooprekha Bhardwaj',
  salutation: 'Mrs. Bhardwaj',
  title: 'Distinguished Educator & Academic Mentor',
  department: 'Department of Computer Science & Engineering',
  institution: 'Faculty of Sciences & Technology',
  yearsOfService: '25+ Years of Inspiring Minds',
  
  // Hero Section
  heroTagline: 'Honoring Excellence, Wisdom & Mentorship',
  heroHeadline: 'A Tribute to Our Guiding Light',
  heroSubheadline:
    'To the mentor who saw potential before we could see it in ourselves, who challenged us to think deeper, reach higher, and lead with empathy. Today is a celebration of your enduring legacy.',
  
  // Realistic high-quality Unsplash image URLs of distinguished educators
  heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
  portraitImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  
  // Quote / Philosophy
  favoriteQuote: {
    text: 'A teacher affects eternity; he can never tell where his influence stops.',
    author: 'Henry Adams',
    teacherNote: 'The classroom is not merely a hall for lectures, but a sanctuary where curiosity transforms into purpose.'
  },

  // Highlight Stats
  highlights: [
    { value: '25+', label: 'Years of Dedication' },
    { value: '3,500+', label: 'Students Mentored' },
    { value: '48+', label: 'Research Papers Guided' },
    { value: 'Infinite', label: 'Moments of Inspiration' },
  ],

  // Initial Memories Gallery (Masonry Layout)
  initialMemories: [
    {
      id: 1,
      title: 'Annual Symposium Keynote',
      category: 'Keynote & Talks',
      year: '2024',
      caption: 'Sir captivating the auditorium with insights on the future of ethical artificial intelligence.',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
      contributor: 'Bhumi & Taniya',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 2,
      title: 'Lab Breakthrough Celebration',
      category: 'Research Lab',
      year: '2023',
      caption: 'Late night in the lab when our team finally cracked the optimization algorithm with Sir’s guidance.',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
      contributor: 'Bhumi & Taniya',
      aspect: 'aspect-[3/4]'
    },
    {
      id: 3,
      title: 'The Convocation Blessing',
      category: 'Milestones',
      year: '2023',
      caption: 'Sharing words of wisdom and encouragement right before we stepped into the corporate world.',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
      contributor: 'Bhumi & Taniya',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 4,
      title: 'Informal Library Mentorship Circle',
      category: 'Mentorship',
      year: '2022',
      caption: 'Those golden Thursday tea discussions where we learned about life, perseverance, and curiosity.',
      imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1000',
      contributor: 'Bhumi & Taniya',
      aspect: 'aspect-[4/3]'
    }
  ],

  // Student Appreciation Messages & Tributes
  initialMessages: [
    {
      id: 1,
      name: 'Bhumi and Taniya',
      role: 'Devoted Students & Mentees',
      nowAt: 'Always Grateful Students',
      category: 'Mentorship',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      date: 'October 2026',
      content:
        'Respected Teacher, words fail to capture how deeply your mentorship has shaped our journey. You never just handed us the answers; you gave us the confidence and discipline to discover them ourselves. Thank you for your endless kindness, patience, and boundless belief in us.'
    }
  ]
};
