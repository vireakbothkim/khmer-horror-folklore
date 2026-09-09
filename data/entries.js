// Data entries for Khmer Horror Folklore archive
// This file exports entry objects extracted from entry-sketch.md

// Import images for entries that have media
import krasueImg from "../components/krasue.jpg";
import bananaTreeGhostImg from "../components/banana_tree_ghost.png";
import mrenhKongvealImg from "../components/mrenh.jpeg";
import neakTaImg from "../components/nakta.jpg";
import pretaImg from "../components/pret.jpg";
import preayImg from "../components/preay.jpg";

// Array of English folklore entries
export const entriesEn = [
  {
    id: 1,
    title: "Ahp / Krasue",
    appearance: "A disembodied floating female head accompanied by dangling, glowing visceral human organs (heart, lungs, and intestines). It features sharp, piercing eyes, a heart that visibly flickers and pulses with a red light, and long hair trailing wildly in the midnight wind.",
    story: "The Ahp is a parasitic supernatural curse that attaches itself to a host. It requires a human host to survive and hunt, typically passing down generationally or through accidental ingestion of cursed spells or spit. By night, the head detaches from the body to feed. It is notorious for scavenging livestock blood and organs—leaving behind bloody, hollowed-out chicken coops—and is deeply feared for craving the blood and organs of human newborns or pregnant women. Once a host body becomes weak or unviable, the curse seeks out a new young woman, perpetuating a relentless cycle of horror.",
    source: "Village elders, grandparents, local traditional healers, and regional urban legends.",
    place: "Rural villages, isolated farmlands, animal coops, maternity hospitals, and large, dense ancient trees.",
    media: krasueImg,
  },
  {
    id: 2,
    title: "Banana Tree Ghost / Kmoch Derm Jek Chvea",
    appearance: "Appears as an ordinary woman at first glance, but possesses terrifying supernatural anatomy when exposed—including an unrealistically long tongue and ridiculously stretchable arms capable of extending through windows to grab food or victims.",
    story: "Rooted in domestic tragedy, this entity originates from a married woman who fell severely ill and died alone at home while her husband was away for work. Unaware of her death, the husband returned and lived alongside her corpse as if nothing had changed. The haunting truth was revealed one night when her supernatural cravings exposed her stretching limbs and elongated tongue. Terrified, the husband fled to a pagoda seeking the protection of monks. The monks established an invisible spiritual barrier, but a banana tree growing near the pagoda window bridged the gap, allowing the vengeful spirit to bypass the spell and claim his life. Consequently, rural superstition strictly forbids planting banana trees directly against house windows.",
    source: "Grandparents, local friends, and regional oral tradition.",
    place: "Rural provinces, farmlands, and banana groves near houses or pagodas.",
    media: bananaTreeGhostImg,
  },
  {
    id: 3,
    title: "Preta / Pret - Hungry Ghost",
    appearance: "Grotesque and emaciated human-like entities resulting from negative karmic reincarnation. They possess severely malnourished, skeletal bodies, a neck as narrow as a needle, a distended rounded belly, hairy skin, and an exhausted appearance reflecting absolute starvation.",
    story: "Pretas are souls trapped in a state of eternal torment due to extreme greed, selfishness, and material obsession in their past lives. Because of their needle-thin necks, they cannot consume normal food without it turning to fire or ash. During the 15-day Pchum Ben festival in Cambodia, communities visit local pagodas before dawn (around 4:00 AM to 5:00 AM). Monks perform rituals while devotees mold cooked sticky rice, coconut, and sesame seeds into balls, tossing them into dark corners and onto the ground outside the main hall. This ritual (Bens Ben) feeds the wandering Pretas, allowing them to receive merit and temporary relief from their suffering.",
    source: "Monks, grandparents, Buddhist scriptures, and generations of oral teaching.",
    place: "Outside pagoda walls, dark corners of temple grounds, and Buddhist realms of purgatory/hell.",
    media: pretaImg,
  },
  {
    id: 4,
    title: "Preay / Vengeful Female Spirit",
    appearance: "A fiercely malevolent, shadowy, or vampiric female entity.",
    story: "The Preay is a terrifying class of female demon or vengeful spirit born from tragic circumstances, most notably women who suffered violent deaths or died tragically during childbirth (Preay Krahla). Known for guarding specific territories, ancient trees, or haunting crossroads, they prey on the unwary traveler, draining life force or causing sudden, mysterious illnesses.",
    source: "Grandparents, school teachers, and close family friends.",
    place: "Dense forests, deep rural wilderness, isolated footpaths, and historical childbirth or burial sites.",
    media: preayImg,
  },
  {
    id: 5,
    title: "Kmoch Tay Horng / Sudden Death Spirit",
    appearance: "Manifests as the lingering, distressed apparition of the deceased, often wearing the clothing or appearing in the exact physical state they were in at the moment of their tragic demise.",
    story: "Unlike spirits who pass away peacefully from old age or natural illness, Kmoch Tay Horng refers strictly to ghosts of individuals who died suddenly from violent accidents, murders, suicides, or catastrophic calamities. Because their lives were cut abruptly short with unfinished business, unexpressed anger, or sudden shock, their souls remain bound to the mortal plane. They are often believed to haunt the exact location of their tragedy until proper Buddhist funeral rites, ancestral prayers, or karma-clearing ceremonies are performed by monks.",
    source: "Oral accounts passed down by parents, grandparents, teachers, friends, and local urban legends.",
    place: "Accident sites, dangerous roadways, rivers, abandoned buildings, and locations of sudden fatal tragedies.",
    media: null,
  },
  {
    id: 6,
    title: "Kmoch Anatha / Unclaimed Corpse Spirit",
    appearance: "Appears as a hollow, weathered apparition clad in faded, threadbare clothing, often bearing the stark look of exhaustion and neglect, and lacking any identifying marks, jewelry, or personal belongings.",
    story: "Kmoch Anatha refers to the vagrant spirits of individuals who died completely alone with no family, friends, or loved ones to claim their bodies or perform their funeral rites. Having passed away as strangers in life—often due to homelessness, sudden accidents, or poverty—their souls are believed to wander the human realm aimlessly, hungry and forgotten. Because no living relatives exist to dedicate food or merits to them, they rely heavily on the compassion of strangers and monks during religious festivals like Pchum Ben, where specific rituals are held to feed these unclaimed and wandering souls.",
    source: "Traditional Khmer folklore, Pchum Ben ritual oral histories, and modern urban societal accounts.",
    place: "City streets, under bridges, hospital morgues, remote riversides, and Buddhist temple grounds during religious festivals.",
    media: null,
  },
  {
    id: 7,
    title: "Mrenh Kongveal / Nature Guardian Spirit",
    appearance: "Manifests as a group of tiny, childlike beings or elves, often invisible to adult human eyes, dressed in simple traditional loincloths or rural countryside garments.",
    story: "Mrenh Kongveal are unique, small guardian spirits heavily tied to nature, wild animals, and domestic herds. Often referred to as the 'herders of the wild,' they are believed to look after and protect animals—especially elephants, water buffaloes, and cattle. While they can be highly mischievous, playing harmless pranks on humans like hiding tools or knotting animal hair, they are fundamentally benign. Many Cambodians treat them as protective household deities, offering small toys, sweets, and tiny clothes at miniature shrines to earn their favor and protect their children or livestock.",
    source: "Pre-Buddhist Khmer animist traditions, agricultural folklore, and generational rural farmers' accounts.",
    place: "Cattle pastures, deep forest clearings, large ancient trees, and dedicated household spirit altars.",
    media: mrenhKongvealImg,
  },
  {
    id: 8,
    title: "Neak Ta / Land Guardian Spirit",
    appearance: "Rarely seen in a physical form, but when manifesting, he appears as a dignified, ancient Khmer warrior or an elderly sage dressed in traditional white or ancestral robes.",
    story: "Unlike typical wandering ghosts, the Neak Ta is a highly respected, powerful guardian spirit of the land. They are often the souls of ancient heroes, rulers, or ancestral figures who became tied to a specific geographic territory. The Neak Ta acts as a spiritual protector for entire villages, ensuring good harvests, rain, and protection from malevolent entities like the Ba-sach. However, they demand strict moral behavior from the living; disrespecting the land, breaking community taboos, or damaging nature can anger the Neak Ta, bringing severe misfortune or illness until an apology ritual (Laeng Neak Ta) is performed.",
    source: "Pre-Buddhist indigenous Khmer animism, village community customs, and historic regional land traditions.",
    place: "Small dedicated wooden shrines (Aranh) located at the entrance of villages, under giant Banyan trees, or near mountain peaks.",
    media: neakTaImg,
  }
];

// Array of Khmer folklore entries
export const entriesKh = [
  {
    id: 1,
    title: "អាប",
    appearance: "លេចឡើងជាក្បាលស្ត្រីបក្សីអាកាស மிែត ដែលមានសរីរាង្គខាងក្នុង (បេះដូង សួត និងពោះវៀន) យោលទៅមក និងមានពន្លឺក្រហម។ មានភ្នែកមុតស្រួច បេះដូងលោតភ្លឹបភ្លែតៗដោយពន្លឺក្រហម និងសក់វែងអណ្តែតតាមខ្យល់រាត្រី។",
    story: "អាប គឺជាបណ្តាសាអព្ភូតហេតុបែបប៉ារ៉ាស៊ីតដែលតោងភ្ជាប់ជាមួយម្ចាស់បំណុល។ វាត្រូវការរាងកាយមនុស្សដើម្បីរស់ និងប្រមាញ់ ដែលជាទូទៅត្រូវបានផ្ទេរតាមតំណពូជ ឬតាមរយៈការច្រឡំលេបមន្តអាគម ឬទឹកមាត់ដែលត្រូវបណ្តាសា។ នៅពេលយប់ ក្បាលនឹងផ្តាច់ចេញពីរាងកាយដើម្បីស្វែងរកចំណី។ វាល្បីខាងស៊ីឈាម និងសរីរាង្គសត្វពាហនៈ—ដោយបន្សល់ទុកនូវទ្រុងមាន់ស្រោចឈាម—និងត្រូវបានគេភ័យខ្លាចយ៉ាងខ្លាំងដោយសារតែវាចូលចិត្តស៊ីឈាម និងសរីរាង្គរបស់ទារកទើបនឹងកើត ឬស្រ្តីមានផ្ទៃពោះ។ នៅពេលដែលរាងកាយម្ចាស់ចុះខ្សោយ អាបនឹងស្វែងរកស្ត្រីវ័យក្មេងម្នាក់ទៀត ដើម្បីបន្តវដ្តនៃភាពភ័យរន្ធត់នេះ។",
    source: "ចាស់ព្រឹទ្ធាចារ្យក្នុងភូមិ ដូនតា គ្រូមន្តអាគមបុរាណ និងរឿងព្រេងប្រជាប្រិយតាមតំបន់។",
    place: "ភូមិស្រុកស្រែចម្ការ ចម្ការដាច់ស្រយាល ទ្រុងសត្វ មន្ទីរពេទ្យឆ្មប និងដើមឈើបុរាណធំៗ។",
    media: krasueImg,
  },
  {
    id: 2,
    title: "ខ្មោចដើមចេកជ្វា",
    appearance: "មើលមួយភ្លែតលេចឡើងជារូបរាងស្រ្តីធម្មតា ប៉ុន្តែនៅពេលបង្ហាញរាងពិត គឺមានកាយវិភាគវិទ្យាគួរឲ្យភ័យខ្លាច—រួមមានអណ្តាតវែងខុសធម្មតា និងដៃដែលអាចលាតសន្ធឹងបានយ៉ាងវែងតាមបង្អួចដើម្បីចាប់ម្ហូបអាហារ ឬជនរងគ្រោះ។",
    story: "មានប្រភពចេញពីរឿងភាគសោកនាដកម្មក្នុងគ្រួសារ អានុភាពនេះកើតចេញពីស្ត្រីរៀបការរួចម្នាក់ដែលបានធ្លាក់ខ្លួនឈឺធ្ងន់ និងស្លាប់ម្នាក់ឯងនៅផ្ទះ ខណៈពេលដែលប្តីរបស់នាងទៅធ្វើការឆ្ងាយ។ ដោយមិនដឹងថាក្រពន្ធស្លាប់ ប្តីបានត្រឡប់មកវិញ ហើយរស់នៅជាមួយសពរបស់នាងដូចជាគ្មានអ្វីកើតឡើង។ ការពិតដ៏គួរឲ្យភ័យខ្លាចត្រូវបានបង្ហាញនៅយប់មួយ នៅពេលដែលកម្លាំងព្រលឹងស្រេកឃ្លានរបស់នាងបានបង្ហាញដៃលាតសន្ធឹង និងអណ្តាតវែងលូន។ ដោយភ័យខ្លាច ប្តីបានរត់ទៅវត្តដើម្បីស្វែងរកការការពារពីព្រះសង្ឃ។ ព្រះសង្ឃបានបង្កើតរបាំងសិល្ប៍ការពារ ប៉ុន្តែដើមចេកជ្វាដែលដុះក្បែរបបង្អួចវត្តបានក្លាយជាស្ពានផ្លោះរបាំងសិល្ប៍ ធ្វើឲ្យព្រលឹងសងសឹកនោះចូលទៅយកជីវិតប្តីបាន។ ហេតុដូច្នេះហើយ ទើបមានជំនឿរហូតមកដល់សព្វថ្ងៃហាមដាំដើមចេកជ្វានៅទល់មុខបង្អួចផ្ទះ។",
    source: "ជីដូនជីតា មិត្តភក្តិក្នុងស្រុក និងប្រពៃណីនិយាយតៗគ្នា។",
    place: "ខេត្តស្រុកស្រែ ចម្ការ និងចម្ការចេកក្បែរផ្ទះ ឬវត្តអារាម។",
    media: bananaTreeGhostImg,
  },
  {
    id: 3,
    title: "ប្រែត",
    appearance: "ជាសត្វអសូរដែលមានរូបរាងអាក្រក់ និងស្គមស្គាំងដូចមនុស្ស ដែលកើតចេញពីផលកម្មអាក្រក់នៃជាតិមុន។ ពួកគេមានរាងកាយស្គមស្គាំងសល់តែស្បែកជុំវិញឆ្អឹង កតូចប៉ុនម្ជុល ពោះធំក្លំ រោមច្រើន និងមានទម្រង់មុខល្វើយល្វែងដែលបង្ហាញពីការឃ្លានអាហារជាខ្លាំង។",
    story: "ប្រែត គឺជាព្រលឹងដែលជាប់នៅក្នុងស្ថានភាពរងទុក្ខវេទនាយ៉ាងខ្លាំង ដោយសារតែភាពលោភលន់ខ្លាំង ភាពអាត្មានិយម និងការតោងទាមនឹងទ្រព្យសម្បត្តិក្នុងជាតិមុន។ ដោយសារតែកតូចប៉ុនម្ជុល ពួកគេមិនអាចបរិភោគអាហារធម្មតាបានឡើយ ដោយអាហារទាំងនោះនឹងប្រែជាភ្លើង ឬភពផេះនៅពេលប៉ះមាត់។ ក្នុងពិធីបុណ្យភ្ជុំបិណ្ឌរយៈពេល ១៥ ថ្ងៃនៅកម្ពុជា ប្រជាជនតែងតែទៅវត្តអារាមមុនថ្ងៃរះ (ប្រហែលម៉ោង ៤:០០ ដល់ ៥:០០ ព្រឹក)។ ព្រះសង្ឃសម្តែងធម៌ ខណៈដែលពុទ្ធបរិស័ទពូនបាយបិណ្ឌ (បាយដំណើប ដូង និងល្ង) រួចបោះទៅតាមជើងជញ្ជាំង និងដីខាងក្រៅព្រះវិហារ។ ពិធីនេះ (បោះបាយបិណ្ឌ) គឺដើម្បីបញ្ជូនអាហារ និងកុសលផលបុណ្យឱ្យទៅដល់ពួកប្រែត ដើម្បីឱ្យពួកគេបានធូរស្រាលពីទុក្ខវេទនា។",
    source: "ព្រះសង្ឃ ជីដូនជីតា គម្ពីរព្រះពុទ្ធសាសនា និងការទូន្មានតៗគ្នាជាច្រើនជំនាន់។",
    place: "ខាងក្រៅរបងវត្ត ជើងជញ្ជាំង និងទីងងឹតក្នុងវត្តអារាម និងក្នុងភពប្រែត/នរក។",
    media: pretaImg,
  },
  {
    id: 4,
    title: "ព្រាយ",
    appearance: "ជាព្រលឹងស្រ្តីកាចសាហាវ មានស្រមោលខ្មៅ ឬមានទម្រង់ដូចបិសាចជញ្ជក់ឈាម។",
    story: "ព្រាយ គឺជាប្រភេទបិសាច ឬព្រលឹងស្រ្តីសងសឹកដ៏គួរឲ្យភ័យខ្លាច ដែលកើតចេញពីសោកនាដកម្ម ដូចជាស្រ្តីដែលស្លាប់ដោយគ្រោះថ្នាក់សាហាវ ឬស្លាប់ពេលសម្រាលកូន (ព្រាយក្រឡាភ្លើង)។ ពួកគេល្បីខាងចាំយាមទឹកដី ដើមឈើបុរាណ ឬលងបន្លាចតាមផ្លូវបំបែក ដោយចាំចាប់យកកម្លាំងជីវិត ឬបង្កជំងឺសាហាវភ្លាមៗដល់អ្នកដំណើរដែលមិនបានប្រុងប្រយ័ត្ន។",
    source: "ជីដូនជីតា លោកគ្រូអ្នកគ្រូ និងមិត្តភក្តិជិតស្និទ្ធ។",
    place: "ព្រៃក្រាស់ ព្រៃជ្រៅដាច់ស្រយាល ផ្លូវលំ និងទីតាំងប្រវត្តិសាស្ត្រនៃការស្លាប់តៃហោង ឬកន្លែងកប់សព។",
    media: preayImg,
  },
  {
    id: 5,
    title: "ខ្មោចតៃហោង",
    appearance: "លេចឡើងជាព្រលឹងវិញ្ញាណរបស់អ្នកស្លាប់ ដែលតែងតែស្លៀកពាក់ ឬមានរូបរាងដូចគ្នាបេះបិទទៅនឹងស្ថានភាពរាងកាយនៅខណៈពេលដែលពួកគេបានស្លាប់។",
    story: "ខុសពីព្រលឹងដែលចែកឋានទៅដោយសុខសាន្តដោយសារជរាពាធ ឬជំងឺធម្មជាតិ ខ្មោចតៃហោង សំដៅលើព្រលឹងរបស់អ្នកដែលបានស្លាប់ភ្លាមៗដោយសារគ្រោះថ្នាក់សាហាវ ការឃាតកម្ម ការធ្វើអត្តឃាត ឬមហន្តរាយផ្សេងៗ។ ដោយសារតែជីវិតរបស់ពួកគេត្រូវបានបញ្ចប់យ៉ាងប្រញាប់ប្រញាល់ជាមួយនឹងការងារមិនទាន់រួចរាល់ កំហឹង ឬការភិតភ័យភ្លាមៗ ព្រលឹងរបស់ពួកគេនៅតែជាប់ជំពាក់នឹងលោកិយនេះ។ គេជឿថាពួកគេតែងតែលងបន្លាចនៅទីតាំងកើតហេតុ រហូតទាល់តែមានការធ្វើបុណ្យតាមប្រពៃណីព្រះពុទ្ធសាសនា ការបន់ស្រន់ ឬពិធីរំដោះគ្រោះដោយព្រះសង្ឃ។",
    source: "រឿងរ៉ាវនិយាយតៗគ្នាដោយឪពុកម្តាយ ជីដូនជីតា គ្រូបង្រៀន មិត្តភក្តិ និងរឿងប្រេងប្រជាប្រិយ។",
    place: "កន្លែងកើតគ្រោះថ្នាក់ ផ្លូវគ្រោះថ្នាក់ ទន្លេ អគារបោះបង់ចោល និងទីតាំងកើតសោកនាដកម្មស្លាប់ភ្លាមៗ។",
    media: null,
  },
  {
    id: 6,
    title: "ខ្មោចអនាថា",
    appearance: "លេចឡើងជារូបរាងប្រឡាក់ប្រឡូក ស្លៀកពាក់ខោអាវចាស់រហែក មានទឹកមុខល្ហិតល្ហៃ និងគ្មា​នគ្រឿងអលង្ការ ឬរបស់របរផ្ទាល់ខ្លួនជាប់ខ្លួនឡើយ។",
    story: "ខ្មោចអនាថា សំដៅលើវិញ្ញាណលេចលង់របស់អ្នកដែលបានស្លាប់ទៅដោយគ្មានគ្រួសារ មិត្តភក្តិ ឬបងប្អូនសាច់ញាតិមកទទួលសព ឬធ្វើបុណ្យឱ្យឡើយ។ ដោយសារតែស្លាប់ទៅជាមនុស្សសាត់អណ្តែត—ភាគច្រើនដោយសារការគ្មានផ្ទះសម្បែង គ្រោះថ្នាក់ ឬភាពក្រីក្រ—ព្រលឹងរបស់ពួកគេត្រូវគេជឿថាតែងតែអណ្តែតអណ្តូងក្នុងលោកមនុស្សដោយការស្រេកឃ្លាន និងភ្លេចភ្លាំង។ ដោយសារគ្មានសាច់ញាតិធ្វើបុណ្យឧទ្ទិសកុសលឱ្យ ពួកគេត្រូវពឹងផ្អែកយ៉ាងខ្លាំងលើក្ដីមេត្តារបស់អ្នកដទៃ និងព្រះសង្ឃក្នុងពិធីបុណ្យសាសនាដូចជាបុណ្យភ្ជុំបិណ្ឌ ជាទីដែលពិធីពិសេសៗត្រូវបានធ្វើឡើងដើម្បីឧទ្ទិសដល់ព្រលឹងអនាថាទាំងនេះ។",
    source: "រឿងព្រេងប្រជាប្រិយខ្មែរ ប្រវត្តិរឿងរ៉ាវពិធីបុណ្យភ្ជុំបិណ្ឌ និងរឿងរ៉ាវសង្គមសម័យទំនើប។",
    place: "តាមផ្លូវក្នុងក្រុង ក្រោមស្ពាន រោងតម្កល់សព មាត់ទន្លេដាច់ស្រយាល និងតាមវត្តអារាមក្នុងអំឡុងបុណ្យសាសនា។",
    media: null,
  },
  {
    id: 7,
    title: "ម្រេញគង្វាល",
    appearance: "លេចឡើងជាក្រុមកុមារតូចៗ ឬអាទិទេពតូចៗ ដែលភ្នែកមនុស្សធំមើលមិនឃើញ ស្លៀកក្បិនបុរាណសាមញ្ញ ឬសម្លៀកបំពាក់អ្នកស្រែចំការ។",
    story: "ម្រេញគង្វាល គឺជាអ្នកថែរក្សាធម្មជាតិដ៏ពិសេស ដែលមានទំនាក់ទំនងយ៉ាងជិតស្និទ្ធជាមួយធម្មជាតិ សត្វព្រៃ និងហ្វូងសត្វពាហនៈ។ ត្រូវបានគេហៅថាជា 'អ្នកគង្វាលព្រៃ' គេជឿថាពួកគេមើលថែ និងការពារសត្វ—ពិសេសគឺដំរី ក្របី និងគោ។ ទោះបីជាពួកគេអាចមានចរិតខូច ខុសប្លែក និងចូលចិត្តលេងសើចជាមួយមនុស្ស ដូចជាលាក់ឧបករណ៍ ឬក្រញ៉ាញ់រោមសត្វក៏ដោយ ក៏ពួកគេមានចិត្តល្អជាមូលដ្ឋាន។ ប្រជាជនកម្ពុជាភាគច្រើនចាត់ទុកពួកគេជាអ្នកតាថែរក្សាផ្ទះ ដោយតែងតែថ្វាយប្រដាប់ក្មេងលេង នំចំណី និងខោអាវតូចៗនៅអាសនៈតូចៗដើម្បីសុំសេចក្តីសុខ និងការពារកូនចៅ ឬសត្វពាហនៈ។",
    source: "ជំនឿអ្នកតាដើមដំបូងមុនព្រះពុទ្ធសាសនា រឿងព្រេងកសិកម្ម និងការរៀបរាប់របស់អ្នកស្រែចំការជាច្រើនជំនាន់។",
    place: "វាលស្មៅទ័ពសត្វ ព្រៃជ្រៅ ដើមឈើបុរាណធំៗ និងអាសនៈសែនប្រែននៅក្នុងផ្ទះ។",
    media: mrenhKongvealImg,
  },
  {
    id: 8,
    title: "អ្នកតា",
    appearance: "កម្រនឹងបង្ហាញរូបរាងកាយណាស់ ប៉ុន្តែនៅពេលបង្ហាញខ្លួន លោកលេចឡើងជាអ្នកចម្បាំងខ្មែរបុរាណដ៏ស្ទាត់ជំនាញ ឬជាលោកតាម្ចាស់ស្រុកដែលស្លៀកពាក់ស ឬសម្លៀកបំពាក់បុរាណ។",
    story: "ខុសពីខ្មោចព្រាយបិសាចទូទៅ អ្នកតា គឺជាអ្នកថែរក្សាទឹកដីដ៏មានអំណាច និងទទួលបានការគោរពកោតខ្លាចយ៉ាងខ្លាំង។ ពួកគេភាគច្រើនជាព្រលឹងនៃវីរបុរសបុរាណ អ្នកគ្រប់គ្រង ឬបុព្វបុរសដែលបានភ្ជាប់និស្ស័យជាមួយទឹកដីជាក់លាក់ណាមួយ។ អ្នកតា ដើរតួជាអ្នកការពារខាងវិញ្ញាណសម្រាប់ភូមិទាំងមូល ដោយធានាបាននូវផលដំណាំល្អ ទឹកភ្លៀង និងការការពារពីបិសាចអាក្រក់។ ទោះជាយ៉ាងណាក៏ដោយ ពួកគេទាមទារសីលធម៌យ៉ាងម៉ឺងម៉ាត់ពីមនុស្សរស់នៅ ប្រសិនបើមើលងាយទឹកដី បំពានកម្រិតសីលធម៌ ឬបំផ្លាញធម្មជាតិ នឹងធ្វើឱ្យអ្នកតាខឹង បណ្តាលឱ្យមានគ្រោះមហន្តរាយ ឬជំងឺសាហាវ រហូតទាល់តែមានពិធីសុំខមាទោស (លែងអ្នកតា) ត្រូវបានប្រារព្ធឡើង។",
    source: "ជំនឿអ្នកតាដើមដំបូងរបស់ជនជាតិខ្មែរ ទំនៀមទម្លាប់សហគមន៍ភូមិ និងប្រពៃណីទឹកដីប្រវត្តិសាស្ត្រ។",
    place: "រោងអ្នកតាឈើតូចៗ (អារ៉ាញ់) នៅច្រកចូលភូមិ ក្រោមដើមជ្រៃធំៗ ឬនៅជិតកំពូលភ្នំ។",
    media: neakTaImg,
  }
];

// Keyed export for convenient dynamic language selection: entries[lang]
export const entries = {
  en: entriesEn,
  kh: entriesKh,
};

export default entries;