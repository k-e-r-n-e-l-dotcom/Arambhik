import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const env = readFileSync('.env', 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      acc[key.trim()] = valueParts.join('=').trim();
    }
    return acc;
  }, {});

const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY
);

const content = {
  'Class 6': {
    'Science': [
      {
        title: 'Food: Where Does It Come From?',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/fesc101.pdf',
        notes: 'This chapter explores the sources of our food and introduces students to the concept of food variety. Plants are the primary source of food, providing fruits, vegetables, grains, and oils. Animals give us milk, eggs, meat, and honey. The chapter explains how different parts of plants like roots, stems, leaves, flowers, and fruits are consumed as food. Students learn about herbivores (plant-eating animals), carnivores (meat-eating animals), and omnivores (animals that eat both plants and animals). The chapter also discusses the importance of bees in honey production and how different regions have different food habits based on availability and climate. Understanding food sources helps students appreciate the diversity of food and the interdependence of living organisms.',
        mindmap: 'Central Concept: Food Sources → Two Main Categories: Plant Sources (Roots: Carrot, Radish | Stems: Potato, Ginger | Leaves: Spinach, Cabbage | Fruits: Mango, Apple | Seeds: Rice, Wheat) and Animal Sources (Milk Products | Eggs | Meat | Honey) → Types of Animals: Herbivores (Cow, Goat) | Carnivores (Lion, Tiger) | Omnivores (Bear, Human) → Key Learning: Food variety depends on region and climate'
      },
      {
        title: 'Components of Food',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/fesc102.pdf',
        notes: 'Food provides energy and materials necessary for growth and repair of our body. This chapter introduces the major nutrients found in food: carbohydrates, proteins, fats, vitamins, and minerals. Carbohydrates and fats provide energy for daily activities. Proteins help in body building and repair of damaged tissues. Vitamins and minerals protect our body from diseases and help in proper functioning of body processes. The chapter teaches simple tests to detect the presence of starch, protein, and fats in food items. Students learn about balanced diet - a diet that contains adequate amounts of all nutrients along with roughage and water. Deficiency diseases occur when our diet lacks specific nutrients for a long time. Examples include scurvy (lack of Vitamin C), rickets (lack of Vitamin D), and anemia (lack of iron).',
        mindmap: 'Nutrients in Food → Energy Giving: Carbohydrates (Rice, Wheat, Potato) | Fats (Butter, Oil, Nuts) → Body Building: Proteins (Pulses, Eggs, Meat, Milk) → Protective: Vitamins (A, B, C, D, E, K from fruits and vegetables) | Minerals (Iron, Calcium, Iodine) → Other Essential Components: Water (60-70% of body weight) | Roughage (Dietary fiber) → Balanced Diet: Right proportion of all nutrients → Deficiency Diseases: Scurvy, Rickets, Beriberi, Anemia'
      },
      {
        title: 'Fibre to Fabric',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/fesc103.pdf',
        notes: 'This chapter traces the journey of fabric from fibre. Fabrics are made from fibres obtained from natural or artificial sources. Natural fibres come from plants (cotton, jute) and animals (wool, silk). Cotton plants are usually grown on black soil and require moderate rainfall. The process of making fabric from cotton involves ginning (separating seeds from cotton), spinning (making yarn from fibres), and weaving (making fabric from yarn). Students learn about the lifecycle of the cotton plant and understand how thread is spun from cotton fibres using a simple device called takli or charkha. Historical context is provided about how people used to weave fabrics and the evolution of spinning and weaving techniques. The chapter emphasizes the importance of natural fibres in daily life.',
        mindmap: 'Fibre to Fabric Process → Natural Fibres: Plant Sources (Cotton from cotton bolls | Jute from jute plant) | Animal Sources (Wool from sheep | Silk from silkworm) → Cotton Fabric Making: Growing Cotton Plant → Harvesting Cotton Bolls → Ginning (removing seeds) → Spinning (making yarn) → Weaving (making fabric) → Tools: Takli/Charkha for spinning | Loom for weaving → Historical Significance: Ancient spinning and weaving techniques'
      },
      {
        title: 'Sorting Materials into Groups',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/fesc104.pdf',
        notes: 'Materials around us have different properties that determine their use. This chapter teaches classification of materials based on various properties like appearance (lustre, hard or soft), solubility in water, transparency, and ability to float or sink. Materials can be grouped as transparent (glass, water), translucent (butter paper, frosted glass), or opaque (wood, metals). Some materials dissolve in water (salt, sugar) while others do not (sand, chalk). Objects made from different materials serve different purposes based on their properties. For example, a chair needs to be strong, so it is made of wood or metal, not paper. Understanding material properties helps us choose the right material for specific uses. The chapter encourages observation and classification skills through hands-on activities.',
        mindmap: 'Classification of Materials → Based on Properties: Appearance (Lustre: shiny metals | Rough: wood, stone | Smooth: glass, plastic) → Transparency: Transparent (clear glass, water) | Translucent (oiled paper) | Opaque (wood, metal) → Solubility: Soluble in water (salt, sugar) | Insoluble (sand, chalk) → Density: Float (wood, plastic) | Sink (stone, metal) → Uses: Properties determine usage (Transparent material for windows | Hard material for furniture | Waterproof material for raincoat)'
      },
      {
        title: 'Separation of Substances',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/fesc105.pdf',
        notes: 'Substances in a mixture need to be separated for various purposes. This chapter introduces different methods of separation based on the properties of components in a mixture. Handpicking is used to separate larger impurities from food grains. Threshing separates grain from stalks. Winnowing uses wind to separate lighter husk from heavier grains. Sieving separates particles of different sizes. Sedimentation and decantation are used to separate insoluble solid particles from liquids. Filtration is used when solid particles are very small. Evaporation helps in obtaining salt from sea water. Condensation is the reverse process where vapour changes to liquid. These separation techniques are widely used in daily life and industries. Understanding these methods helps in purifying substances and obtaining desired components from mixtures.',
        mindmap: 'Methods of Separation → For Solid Mixtures: Handpicking (stones from rice) | Threshing (grain from stalk) | Winnowing (husk from grain) | Sieving (flour from bran) → For Liquid Mixtures: Sedimentation (settling of heavy particles) → Decantation (pouring clear liquid) → Filtration (using filter paper) → For Solutions: Evaporation (obtaining salt from salt water) → Condensation (vapour to liquid) → Applications: Water purification | Salt production | Grain cleaning'
      }
    ],
    'Mathematics': [
      {
        title: 'Knowing Our Numbers',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/femh101.pdf',
        notes: 'This chapter builds upon students existing knowledge of numbers. It introduces large numbers up to crores and helps students understand place value in the Indian and International number systems. Students learn to compare numbers, arrange them in ascending or descending order, and understand concepts like predecessor and successor. The chapter teaches how to read and write large numbers in both numeral and word forms. It also introduces estimation and rounding off numbers to the nearest tens, hundreds, or thousands. Understanding of number patterns and sequences is developed. Students learn about the use of commas in writing large numbers according to Indian and International systems. Practical applications include population figures, distances, and amounts.',
        mindmap: 'Number System → Place Value: Indian System (Ones, Tens, Hundreds, Thousands, Lakhs, Crores) | International System (Ones, Tens, Hundreds, Thousands, Millions, Billions) → Operations: Comparing Numbers (<, >, =) | Ordering (Ascending, Descending) | Predecessor and Successor → Estimation: Rounding off to nearest 10, 100, 1000 → Roman Numerals: I, V, X, L, C, D, M → Number Patterns and Sequences'
      },
      {
        title: 'Whole Numbers',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/femh102.pdf',
        notes: 'Whole numbers are a collection of all natural numbers including zero. This chapter explores properties and patterns in whole numbers. Students learn about the number line and how to represent whole numbers on it. The chapter introduces the concepts of predecessor and successor in depth. Properties of addition and multiplication such as closure property, commutative property, associative property, and distributive property are explained with examples. Students understand that whole numbers are closed under addition and multiplication but not under subtraction and division. The chapter also covers patterns in whole number operations and helps students develop number sense through various activities and problems.',
        mindmap: 'Whole Numbers (0, 1, 2, 3...) → Number Line: Representation of whole numbers → Properties: Closure (a+b is a whole number) | Commutative (a+b = b+a) | Associative ((a+b)+c = a+(b+c)) | Distributive (a×(b+c) = a×b + a×c) | Identity (a+0=a, a×1=a) → Operations: Addition, Subtraction, Multiplication, Division → Patterns: Number sequences and series'
      },
      {
        title: 'Playing with Numbers',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/femh103.pdf',
        notes: 'This chapter makes learning about numbers fun through games and puzzles. It introduces factors and multiples of numbers. Students learn to identify prime and composite numbers. A prime number has exactly two factors (1 and itself), while composite numbers have more than two factors. The chapter teaches methods to find all factors of a number and common factors of two or more numbers. Students learn to find the Highest Common Factor (HCF) and Lowest Common Multiple (LCM) of numbers using prime factorization and division methods. Tests of divisibility for 2, 3, 4, 5, 6, 8, 9, 10, and 11 are explained. Understanding these concepts helps in simplifying fractions and solving real-life problems.',
        mindmap: 'Number Concepts → Factors: Numbers that divide exactly (Factors of 12: 1,2,3,4,6,12) → Multiples: Product of number with integers (Multiples of 3: 3,6,9,12...) → Prime Numbers: Only 2 factors (2,3,5,7,11,13...) → Composite Numbers: More than 2 factors (4,6,8,9,10...) → HCF: Highest Common Factor → LCM: Lowest Common Multiple → Divisibility Rules: Tests for 2,3,4,5,6,8,9,10,11'
      },
      {
        title: 'Basic Geometrical Ideas',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/femh104.pdf',
        notes: 'Geometry is the study of shapes, sizes, and positions of figures. This chapter introduces fundamental geometric concepts. A point is an exact location in space with no dimensions. A line segment has two endpoints, while a line extends infinitely in both directions. A ray has one endpoint and extends infinitely in one direction. Angles are formed when two rays share a common endpoint. The chapter introduces types of angles: acute (less than 90°), right (exactly 90°), obtuse (between 90° and 180°), and straight (exactly 180°). Students learn about triangles, quadrilaterals, circles, and their properties. Understanding these basic concepts forms the foundation for advanced geometry.',
        mindmap: 'Geometric Elements → Point: Exact position (no dimensions) → Line Segment: Two endpoints → Line: Extends infinitely both ways → Ray: One endpoint, extends infinitely → Angle: Two rays with common endpoint (Acute <90° | Right =90° | Obtuse >90° | Straight =180°) → Plane Figures: Triangle (3 sides) | Quadrilateral (4 sides) | Circle (curved boundary) → 3D Objects: Cube, Cuboid, Sphere, Cylinder, Cone'
      },
      {
        title: 'Understanding Elementary Shapes',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/femh105.pdf',
        notes: 'This chapter helps students identify and understand various two-dimensional and three-dimensional shapes. Students learn to measure line segments using rulers and compare their lengths. The chapter introduces the concepts of angles and their measurement using a protractor. Different types of triangles based on sides (equilateral, isosceles, scalene) and angles (acute, right, obtuse) are discussed. Quadrilaterals like squares, rectangles, parallelograms, rhombus, and trapezium are introduced with their properties. Three-dimensional shapes like cubes, cuboids, cylinders, cones, and spheres are explored. Students learn to identify faces, edges, and vertices of 3D shapes. Understanding shapes helps in recognizing patterns in the environment.',
        mindmap: '2D Shapes → Triangles: By Sides (Equilateral, Isosceles, Scalene) | By Angles (Acute, Right, Obtuse) → Quadrilaterals: Square, Rectangle, Parallelogram, Rhombus, Trapezium → Circles: Radius, Diameter, Circumference → 3D Shapes: Cube (6 faces, 12 edges, 8 vertices) | Cuboid | Cylinder | Cone | Sphere → Measurement: Using ruler and protractor'
      }
    ],
    'English': [
      {
        title: 'A Tale of Two Birds',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/aehs101.pdf',
        notes: 'This folktale emphasizes the importance of good company and environment in shaping ones character. The story narrates about two young birds who get separated during a storm. One bird lands near a cave where robbers live, while the other finds shelter near a rishi ashram. Growing up in different environments, the birds develop contrasting natures. The bird living with robbers becomes aggressive and rude, while the one near the ashram becomes gentle and polite. The story teaches that our surroundings and the company we keep greatly influence our behavior, thoughts, and character. It highlights the age-old saying "A man is known by the company he keeps." The moral encourages students to choose their friends wisely and seek positive environments for personal growth.',
        mindmap: 'Story Elements → Characters: Two bird brothers | Robbers | Rishi → Setting: Forest, Cave, Ashram → Plot: Birds separated in storm → Different upbringings → Contrasting behaviors → Theme: Influence of environment and company → Moral: Company shapes character | Choose friends wisely → Literary Devices: Folktale structure | Contrast | Moral teaching'
      },
      {
        title: 'The Friendly Mongoose',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/aehs102.pdf',
        notes: 'This story from the Panchatantra teaches about trust, hasty decisions, and their consequences. A farmer and his wife have a baby and a pet mongoose. One day, the wife asks the farmer to watch the baby while she goes to the market. The farmer leaves the baby with the mongoose and goes out. A snake enters the house and the loyal mongoose kills it to protect the baby. When the mother returns and sees blood on the mongoose mouth, she assumes it harmed her baby and kills it in anger. Later, she discovers the dead snake and realizes the mongoose was protecting her child. The story teaches important lessons about not jumping to conclusions, the value of trust, and thinking before acting. It shows how hasty decisions based on assumptions can lead to tragic outcomes.',
        mindmap: 'Story Structure → Characters: Farmer family | Mongoose (loyal pet) | Snake (danger) → Conflict: Snake threatens baby | Mongoose protects → Climax: Mother sees blood, acts hastily → Resolution: Truth revealed too late → Themes: Loyalty and devotion | Danger of hasty judgments | Trust and misunderstanding | Consequences of rash actions → Moral: Think before you act | Do not judge by appearances | Trust is important'
      },
      {
        title: 'The Shepherd Boy and the Wolf',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/aehs103.pdf',
        notes: 'This famous Aesop fable teaches about honesty and credibility. A shepherd boy tends his sheep near a village. Feeling bored, he decides to play a prank by shouting "Wolf! Wolf!" The villagers rush to help but find no wolf. The boy laughs at their concern. He repeats this prank several times. One day, a wolf actually appears and starts attacking the sheep. The boy cries for help, but the villagers think it is another false alarm and do not come. The wolf kills many sheep. The moral of the story is that liars are not believed even when they speak the truth. It teaches children the importance of honesty, trustworthiness, and understanding that repeated false alarms make people stop believing you. The story also highlights how our actions affect our reputation.',
        mindmap: 'Fable Elements → Character: Shepherd boy (dishonest prankster) | Villagers (helpers) | Wolf (real threat) → Setting: Village hillside with sheep → Plot Sequence: Boy cries wolf falsely → Villagers respond → Boy laughs → Pattern repeats → Real wolf comes → No one believes → Consequence → Themes: Honesty and trust | Credibility | Consequences of lying | Reputation → Moral: Liars are not believed even when they tell the truth | Honesty is important → Literary Device: Fable with animal characters teaching human values'
      },
      {
        title: 'The Quarrel',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/aehs104.pdf',
        notes: 'This beautiful poem by Eleanor Farjeon explores sibling relationships and conflicts. The poem describes a quarrel between siblings where they fight over something trivial. The speaker cannot even remember what started the quarrel, showing how petty and meaningless their arguments were. Despite the anger and harsh words exchanged, they make up by evening. The poem captures the natural dynamics of sibling relationships where fights are common but love remains constant. It teaches that holding grudges is pointless, especially over small matters. The poem shows emotional maturity in recognizing that the quarrel was foolish and reconciliation is important. It emphasizes forgiveness, understanding, and the strength of familial bonds that help overcome temporary conflicts. The simple language makes the universal experience of sibling quarrels relatable.',
        mindmap: 'Poem Analysis → Theme: Sibling relationships | Quarrels and reconciliation → Mood: Angry → Remorseful → Peaceful → Structure: Narrative poem | Simple language | Rhyme scheme → Key Messages: Fights over trivial matters are meaningless | Forgiveness heals relationships | Strong bonds overcome conflicts | Pride should not prevent saying sorry → Poetic Devices: First-person narrative | Conversational tone | Imagery of conflict and peace → Life Lesson: Value relationships over ego | Communicate and resolve conflicts'
      },
      {
        title: 'Beauty',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/aehs105.pdf',
        notes: 'This thoughtful poem by E-Yeh-Shure explores the concept of beauty and where it can be found. The poet suggests that beauty is not just in physical appearances but exists everywhere around us. Beauty is seen in sunlight, trees, birds singing, and people working or dancing. It is heard in the wind, rain, and music. Beauty is felt in good deeds, happy thoughts, and kind actions. The poem teaches that beauty exists in nature, in everyday activities, and in positive human behavior. It encourages students to observe and appreciate the beauty in simple things around them. The message is that beauty is not limited to what we see but includes sounds, feelings, and actions. This holistic view of beauty helps develop aesthetic sense and appreciation for life.',
        mindmap: 'Concept of Beauty → Beauty is Seen: In sunlight and trees | In growing corn | In birds and people | In good actions → Beauty is Heard: In night and winds | In rain falling | In music and singing | In kind words → Beauty is Felt: In dreams and happy thoughts | In good work done | In rest after labor | In kind deeds everywhere → Message: Beauty is everywhere | Not just physical appearance | Observe and appreciate nature | Value good actions and thoughts → Poetic Structure: Three stanzas | Repetition pattern | Simple imagery'
      }
    ],
    'Social Science': [
      {
        title: 'What, Where, How and When?',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/fehs101.pdf',
        notes: 'This introductory chapter lays the foundation for studying history. It explains what history is - the study of past events, people, and societies. History helps us understand how people lived in different times and places. The chapter discusses various sources of historical information including manuscripts, inscriptions, monuments, coins, and archaeological remains. Students learn about the importance of dates in history and how historians divide time into different periods. The concept of CE (Common Era) and BCE (Before Common Era) is introduced. The chapter explains how historians ask questions about the past: What happened? Where did it happen? When did it happen? How did it happen? Why did it happen? Understanding these basic questions helps students think like historians and develop critical thinking skills about past events.',
        mindmap: 'Understanding History → What is History: Study of the past | Changes over time | Human civilizations → Sources of History: Written (Manuscripts, Inscriptions) | Material (Monuments, Coins, Tools) | Archaeological evidence → Timeline: BCE (Before Common Era) | CE (Common Era) | Different periods (Prehistoric, Ancient, Medieval, Modern) → Historical Questions: What, Where, When, How, Why → Importance: Understanding our roots | Learning from past | Appreciating cultural heritage → Methods: Archaeology, Dating techniques, Analysis of sources'
      },
      {
        title: 'From Hunting-Gathering to Growing Food',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/fehs102.pdf',
        notes: 'This chapter describes one of the most important transitions in human history - from a nomadic hunting-gathering lifestyle to settled agricultural communities. Early humans moved from place to place in search of food, hunting animals and gathering wild plants, fruits, and nuts. Around 12,000 years ago, people in some parts of the world began growing crops and domesticating animals. This change is called the Neolithic Revolution. The Fertile Crescent in West Asia was one of the earliest regions where farming developed. In India, agriculture started in several places including the northwestern region. People learned to grow wheat, barley, rice, and other crops. They domesticated animals like cattle, sheep, and goats. Permanent settlements emerged as farming required people to stay in one place. This led to the development of villages and eventually cities.',
        mindmap: 'Human Evolution → Paleolithic Age: Hunter-gatherers | Nomadic lifestyle | Stone tools | Caves and rock shelters → Neolithic Revolution: Beginning of agriculture (~10,000 BCE) | Domestication of animals | Permanent settlements | Pottery and weaving → Changes Brought: Food surplus | Population growth | Division of labor | Social structures | Trade | Development of civilizations → Key Sites in India: Mehrgarh (earliest farming site) | Daojali Hading | Other early agricultural settlements → Impact: Foundation of modern civilization'
      },
      {
        title: 'In the Earliest Cities',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/fehs103.pdf',
        notes: 'The Harappan Civilization, also known as the Indus Valley Civilization, flourished around 4700 years ago in the northwestern region of the Indian subcontinent. This chapter explores the fascinating features of Harappan cities like Mohenjo-daro and Harappa. These cities were remarkably well-planned with straight roads, advanced drainage systems, and buildings made of baked bricks. Most houses had separate bathing areas and toilets. The Great Bath at Mohenjo-daro was an important public structure. Harappans were skilled craftspeople who made beautiful pottery, jewelry, and seals with animal motifs and a script that remains undeciphered. They traded with distant lands like Mesopotamia. The chapter discusses how archaeologists discovered these cities and what remains tell us about life 4000 years ago. The mysterious decline of this civilization remains a subject of research.',
        mindmap: 'Harappan Civilization (2600-1900 BCE) → Location: Indus and its tributaries | Modern Pakistan and India → Urban Planning: Grid pattern streets | Drainage system | Uniform bricks → Important Sites: Harappa, Mohenjo-daro, Lothal, Dholavira, Kalibangan → Features: Great Bath | Granaries | Citadel and lower town | Fortifications → Economy: Agriculture, Trade, Craft production → Artifacts: Seals with animals | Pottery | Jewelry | Weights and measures | Undeciphered script → Decline: Reasons uncertain (Climate change, River changes, Invasions?) → Legacy: Urban planning, Drainage systems, Standardization'
      },
      {
        title: 'What Books and Burials Tell Us',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/fehs104.pdf',
        notes: 'This chapter introduces students to the Vedic period through two important sources - the Vedas (ancient sacred texts) and megalithic burials. The Rigveda, composed around 3500 years ago, is the oldest Veda containing hymns in praise of various gods. It tells us about the lives of people, their battles, prayers, and social structure. The texts mention rivers, animals, and daily activities. Society was divided into groups based on occupation. Later Vedic texts include Samaveda, Yajurveda, Atharvaveda, Brahmanas, Aranyakas, and Upanishads. The chapter also discusses megalithic burials - large stone structures used for burying the dead along with objects like pottery, tools, and jewelry. These tell us about beliefs in life after death and social inequalities. Different burial practices existed in different regions, reflecting cultural diversity.',
        mindmap: 'Sources of Ancient History → Vedic Literature: Rigveda (oldest, ~1500 BCE) | Other Vedas (Sama, Yajur, Atharva) | Brahmanas (rituals) | Aranyakas | Upanishads (philosophy) → Information from Vedas: Gods and prayers | Rivers and geography | Social groups | Occupations | Warfare → Archaeological Evidence: Megalithic burials | Stone structures | Grave goods | Pottery | Iron tools → Social Structure: Four varnas mentioned | Brahmanas, Kshatriyas, Vaishyas, Shudras | Based on occupation initially → Burial Practices: Black and Red Pottery | Iron objects | Beliefs about afterlife → Time Period: Vedic Age (~1500-500 BCE)'
      },
      {
        title: 'Kingdoms, Kings and an Early Republic',
        ncert_link: 'https://ncert.nic.in/textbook/pdf/fehs105.pdf',
        notes: 'Around 3000 years ago, significant political changes occurred in India with the emergence of kingdoms called Mahajanapadas. This chapter describes how kingdoms grew from smaller jana or tribal units. Powerful kings performed grand rituals like the Ashvamedha to assert their authority. Agriculture, taxes, and armies helped kings maintain power. Some kingdoms were monarchies where power was hereditary, while others were oligarchies or republics where groups of people made decisions together. The Vajji sangha is an example of an early republic where decisions were made through discussions and voting in assemblies. The chapter explains how rulers built fortifications, maintained armies, and collected taxes from farmers, traders, and craftspeople. This period saw the development of political institutions and governance systems that influenced future Indian history. The concept of early democracy through sanghas is particularly significant.',
        mindmap: 'Political Developments (600-300 BCE) → Mahajanapadas: 16 major kingdoms | Magadha, Kosala, Vajji, Avanti → Types of Government: Monarchies (Kings rule) | Gana-sanghas (Republics - group rule) → Features of Monarchy: Hereditary rule | Rajsuya and Ashvamedha ceremonies | Fortified capitals | Regular armies | Tax collection → Vajji Republic: Assembly meetings | Decision by discussion | Early democracy | No hereditary king → Sources of Revenue: Tax on farmers (bhaga) | Trade taxes | Tribute from subordinates → Fortifications: Protected capitals | Moats and walls → Rise of Magadha: Strategic location | Resources | Strong rulers | Became most powerful → Significance: Foundation of later empires'
      }
    ]
  }
};

async function populate() {
  const { data: classes } = await supabase.from('classes').select('*');

  for (const cls of classes) {
    const className = cls.name;
    if (!content[className]) continue;

    const { data: subjects } = await supabase
      .from('subjects')
      .select('*')
      .eq('class_id', cls.id);

    for (const subject of subjects) {
      const chapters = content[className][subject.name];
      if (!chapters) continue;

      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];
        await supabase.from('chapters').insert({
          subject_id: subject.id,
          title: chapter.title,
          ncert_link: chapter.ncert_link,
          notes: chapter.notes,
          mindmap: chapter.mindmap,
          display_order: i + 1
        });
      }
    }
  }

  console.log('Content populated successfully!');
}

populate();
