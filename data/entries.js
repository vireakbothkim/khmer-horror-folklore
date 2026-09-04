// Data entries for Khmer Horror Folklore archive
// This file exports an array of entry objects extracted from entry-sketch.md

// Import images for entries that have media
import krasueImg from "../components/krasue.jpg";
import bananaTreeGhostImg from "../components/banana_tree_ghost.png";
import mrenhKongvealImg from "../components/mrenh.jpeg";
import neakTaImg from "../components/nakta.jpg";
import pretaImg from "../components/pret.jpg";
import preayImg from "../components/preay.jpg";

// Array of all folklore entries
const entries = [
  {
    id: 1,
    title: "Ahp / Krasue",
    khmerName: "អាប",
    appearance: "A disembodied floating female head accompanied by dangling, glowing visceral human organs (heart, lungs, and intestines). It features sharp, piercing eyes, a heart that visibly flickers and pulses with a red light, and long hair trailing wildly in the midnight wind.",
    story: "The Ahp is a parasitic supernatural curse that attaches itself to a host. It requires a human host to survive and hunt, typically passing down generationally or through accidental ingestion of cursed spells or spit. By night, the head detaches from the body to feed. It is notorious for scavenging livestock blood and organs—leaving behind bloody, hollowed-out chicken coops—and is deeply feared for craving the blood and organs of human newborns or pregnant women. Once a host body becomes weak or unviable, the curse seeks out a new young woman, perpetuating a relentless cycle of horror.",
    source: "Village elders, grandparents, local traditional healers, and regional urban legends.",
    place: "Rural villages, isolated farmlands, animal coops, maternity hospitals, and large, dense ancient trees.",
    media: krasueImg,
  },
  {
    id: 2,
    title: "Banana Tree Ghost / Kmoch Derm Jek Chvea",
    khmerName: "ខ្មោចដេីមចេកជ្វា",
    appearance: "Appears as an ordinary woman at first glance, but possesses terrifying supernatural anatomy when exposed—including an unrealistically long tongue and ridiculously stretchable arms capable of extending through windows to grab food or victims.",
    story: "Rooted in domestic tragedy, this entity originates from a married woman who fell severely ill and died alone at home while her husband was away for work. Unaware of her death, the husband returned and lived alongside her corpse as if nothing had changed. The haunting truth was revealed one night when her supernatural cravings exposed her stretching limbs and elongated tongue. Terrified, the husband fled to a pagoda seeking the protection of monks. The monks established an invisible spiritual barrier, but a banana tree growing near the pagoda window bridged the gap, allowing the vengeful spirit to bypass the spell and claim his life. Consequently, rural superstition strictly forbids planting banana trees directly against house windows.",
    source: "Grandparents, local friends, and regional oral tradition.",
    place: "Rural provinces, farmlands, and banana groves near houses or pagodas.",
    media: bananaTreeGhostImg,
  },
  {
    id: 3,
    title: "Preta / Pret - Hungry Ghost",
    khmerName: "ប្រែត",
    appearance: "Grotesque and emaciated human-like entities resulting from negative karmic reincarnation. They possess severely malnourished, skeletal bodies, a neck as narrow as a needle, a distended rounded belly, hairy skin, and an exhausted appearance reflecting absolute starvation.",
    story: "Pretas are souls trapped in a state of eternal torment due to extreme greed, selfishness, and material obsession in their past lives. Because of their needle-thin necks, they cannot consume normal food without it turning to fire or ash. During the 15-day Pchum Ben festival in Cambodia, communities visit local pagodas before dawn (around 4:00 AM to 5:00 AM). Monks perform rituals while devotees mold cooked sticky rice, coconut, and sesame seeds into balls, tossing them into dark corners and onto the ground outside the main hall. This ritual (Bens Ben) feeds the wandering Pretas, allowing them to receive merit and temporary relief from their suffering.",
    source: "Monks, grandparents, Buddhist scriptures, and generations of oral teaching.",
    place: "Outside pagoda walls, dark corners of temple grounds, and Buddhist realms of purgatory/hell.",
    media: pretaImg, // Image available
  },
  {
    id: 4,
    title: "Preay / Vengeful Female Spirit",
    khmerName: "ព្រាយ",
    appearance: "A fiercely malevolent, shadowy, or vampiric female entity.",
    story: "The Preay is a terrifying class of female demon or vengeful spirit born from tragic circumstances, most notably women who suffered violent deaths or died tragically during childbirth (Preay Krahla). Known for guarding specific territories, ancient trees, or haunting crossroads, they prey on the unwary traveler, draining life force or causing sudden, mysterious illnesses.",
    source: "Grandparents, school teachers, and close family friends.",
    place: "Dense forests, deep rural wilderness, isolated footpaths, and historical childbirth or burial sites.",
    media: preayImg, // Image available
  },
  {
    id: 5,
    title: "Kmoch Tay Horng / Sudden Death Spirit",
    khmerName: "ខ្មោចតៃហោង",
    appearance: "Manifests as the lingering, distressed apparition of the deceased, often wearing the clothing or appearing in the exact physical state they were in at the moment of their tragic demise.",
    story: "Unlike spirits who pass away peacefully from old age or natural illness, Kmoch Tay Horng refers strictly to ghosts of individuals who died suddenly from violent accidents, murders, suicides, or catastrophic calamities. Because their lives were cut abruptly short with unfinished business, unexpressed anger, or sudden shock, their souls remain bound to the mortal plane. They are often believed to haunt the exact location of their tragedy until proper Buddhist funeral rites, ancestral prayers, or karma-clearing ceremonies are performed by monks.",
    source: "Oral accounts passed down by parents, grandparents, teachers, friends, and local urban legends.",
    place: "Accident sites, dangerous roadways, rivers, abandoned buildings, and locations of sudden fatal tragedies.",
    media: null, // No image available yet
  }, 

  {
    id: 6,
    title: "Kmoch Anatha / Unclaimed Corpse Spirit",
    khmerName: "ខ្មោចអនាថា/ខ្មោចអណាថា",
    appearance: "Appears as a hollow, weathered apparition clad in faded, threadbare clothing, often bearing the stark look of exhaustion and neglect, and lacking any identifying marks, jewelry, or personal belongings.",
    story: "Kmoch Anatha refers to the vagrant spirits of individuals who died completely alone with no family, friends, or loved ones to claim their bodies or perform their funeral rites. Having passed away as strangers in life—often due to homelessness, sudden accidents, or poverty—their souls are believed to wander the human realm aimlessly, hungry and forgotten. Because no living relatives exist to dedicate food or merits to them, they rely heavily on the compassion of strangers and monks during religious festivals like Pchum Ben, where specific rituals are held to feed these unclaimed and wandering souls.",
    source: "Traditional Khmer folklore, Pchum Ben ritual oral histories, and modern urban societal accounts.",
    place: "City streets, under bridges, hospital morgues, remote riversides, and Buddhist temple grounds during religious festivals.",
    media: null, // No image available yet
  },


  {
    id: 7,
    title: "Mrenh Kongveal / Nature Guardian Spirit",
    khmerName: "ម្រេញគង្វាល",
    appearance: "Manifests as a group of tiny, childlike beings or elves, often invisible to adult human eyes, dressed in simple traditional loincloths or rural countryside garments.",
    story: "Mrenh Kongveal are unique, small guardian spirits heavily tied to nature, wild animals, and domestic herds. Often referred to as the 'herders of the wild,' they are believed to look after and protect animals—especially elephants, water buffaloes, and cattle. While they can be highly mischievous, playing harmless pranks on humans like hiding tools or knotting animal hair, they are fundamentally benign. Many Cambodians treat them as protective household deities, offering small toys, sweets, and tiny clothes at miniature shrines to earn their favor and protect their children or livestock.",
    source: "Pre-Buddhist Khmer animist traditions, agricultural folklore, and generational rural farmers' accounts.",
    place: "Cattle pastures, deep forest clearings, large ancient trees, and dedicated household spirit altars.",
    media: mrenhKongvealImg,
  },


  {
    id: 8,
    title: "Neak Ta / Land Guardian Spirit",
    khmerName: "អ្នកតា",
    appearance: "Rarely seen in a physical form, but when manifesting, he appears as a dignified, ancient Khmer warrior or an elderly sage dressed in traditional white or ancestral robes.",
    story: "Unlike typical wandering ghosts, the Neak Ta is a highly respected, powerful guardian spirit of the land. They are often the souls of ancient heroes, rulers, or ancestral figures who became tied to a specific geographic territory. The Neak Ta acts as a spiritual protector for entire villages, ensuring good harvests, rain, and protection from malevolent entities like the Ba-sach. However, they demand strict moral behavior from the living; disrespecting the land, breaking community taboos, or damaging nature can anger the Neak Ta, bringing severe misfortune or illness until an apology ritual (Laeng Neak Ta) is performed.",
    source: "Pre-Buddhist indigenous Khmer animism, village community customs, and historic regional land traditions.",
    place: "Small dedicated wooden shrines (Aranh) located at the entrance of villages, under giant Banyan trees, or near mountain peaks.",
    media: neakTaImg,
  }
];

// Export the entries array
export default entries;