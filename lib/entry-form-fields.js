// Field lists for the entry form (contribute and edit pages).
// Both lists follow the entry page order: title, appearance, source, place, story.
// Row N in englishFields pairs with row N in khmerFields, so the two cards line up.
export const englishFields = [
  { field: "title_en", label: "Title *", placeholder: "Entry title (3-50 characters)" },
  { field: "appearance_en", label: "Appearance", multiline: true, rows: 4, placeholder: "Describe appearance (10-500 characters if provided)" },
  { field: "source_en", label: "Source *", placeholder: "Source information (5-200 characters)" },
  { field: "place_en", label: "Place *", placeholder: "Location information (5-200 characters)" },
  { field: "story_en", label: "Story *", multiline: true, rows: 6, placeholder: "Tell the story (50-1000 characters)" },
];

export const khmerFields = [
  { field: "title_km", label: "Title", placeholder: "ចំណងជើងខ្មែរ (៣-១០០ តួអក្សរ)" },
  { field: "appearance_km", label: "Appearance", multiline: true, rows: 4, placeholder: "ពណ៌នារូបរាង (១០-១០០០ តួអក្សរ ប្រសិនបើផ្តល់ឱ្យ)" },
  { field: "source_km", label: "Source", placeholder: "ប្រភពព័ត៌មាន (១០-៥០០ តួអក្សរ ប្រសិនបើផ្តល់ឱ្យ)" },
  { field: "place_km", label: "Place", placeholder: "ទីកន្លែង (៥-៥០០ តួអក្សរ ប្រសិនបើផ្តល់ឱ្យ)" },
  { field: "story_km", label: "Story", multiline: true, rows: 6, placeholder: "និទានរឿង (៧៥-២០០០ តួអក្សរ ប្រសិនបើផ្តល់ឱ្យ)" },
];
