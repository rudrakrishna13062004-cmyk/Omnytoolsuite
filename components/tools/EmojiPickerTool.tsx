import React, { useState } from 'react';
import { Search, Copy } from 'lucide-react';

const EMOJIS = {
  "Smileys": ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "worried", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "angry", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "mb", "😨", "mw", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "neutral_face", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "ipp", "🤐", "🥴", "🤢", "🤮", "sneezing_face", "mask", "🤒", "🤕", "🤑", "cowboy", "devil", "imp", "ogre", "goblin", "clown", "poop", "ghost", "skull", "alien", "👾", "robot", "pumpkin", "cat", "grin_cat", "joy_cat", "heart_eyes_cat", "smirk_cat", "kissing_cat", "scream_cat", "crying_cat_face", "pouting_cat", "palms_up", "handshake", "thumbsup", "thumbsdown", "clap", "wave", "ok_hand", "v", "crossed_fingers", "metal", "fist", "punch", "left_facing_fist", "right_facing_fist", "raised_back_of_hand", "point_left", "point_right", "point_up_2", "point_down", "point_up", "muscle", "pray", "foot", "leg", "ear", "nose", "brain", "tooth", "bone", "eyes", "eye", "tongue", "mouth", "lips"],
  "Animals": ["🐶", "🐕", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🐮", "ox", "water_buffalo", "cow2", "pig", "pig2", "boar", "pig_nose", "ram", "sheep", "goat", "dromedary_camel", "camel", "llama", "giraffe", "elephant", "rhino", "hippopotamus", "mouse", "mouse2", "rat", "hamster", "rabbit", "rabbit2", "chipmunk", "hedgehog", "bat", "bear", "koala", "panda_face", "sloth", "otter", "skunk", "kangaroo", "badger", "paw_prints", "turkey", "chicken", "rooster", "hatching_chick", "baby_chick", "hatched_chick", "bird", "penguin", "dove", "eagle", "duck", "swan", "owl", "flamingo", "peacock", "parrot", "frog", "crocodile", "turtle", "lizard", "snake", "dragon_face", "dragon", "sauropod", "t-rex", "whale", "whale2", "dolphin", "fish", "tropical_fish", "blowfish", "shark", "octopus", "shell", "snail", "butterfly", "bug", "ant", "bee", "beetle", "cricket", "spider", "spider_web", "scorpion", "mosquito", "microbe"],
  "Food": ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "pineapple", "coconut", "kiwi_fruit", "tomato", "eggplant", "avocado", "broccoli", "leafy_green", "cucumber", "hot_pepper", "corn", "carrot", "garlic", "onion", "potato", "yam", "croissant", "bagel", "bread", "french_bread", "pretzel", "cheese", "egg", "cooking", "bacon", "steak", "meat_on_bone", "hotdog", "hamburger", "fries", "pizza", "sandwich", "stuffed_flatbread", "falafel", "taco", "burrito", "green_salad", "shallow_pan_of_food", "canned_food", "spaghetti", "ramen", "stew", "curry", "sushi", "bento", "dumpling", "oyster", "fried_shrimp", "rice_ball", "rice", "rice_cracker", "fish_cake", "fortune_cookie", "moon_cake", "oden", "dango", "ice_cream", "shaved_ice", "ice_cream", "doughnut", "cookie", "birthday", "cake", "cupcake", "pie", "chocolate_bar", "candy", "lollipop", "custard", "honey_pot", "baby_bottle", "glass_of_milk", "coffee", "tea", "sake", "champagne", "wine_glass", "cocktail", "tropical_drink", "beer", "beers", "clinking_glasses", "tumbler_glass", "cup_with_straw", "beverage_box", "mate", "ice_cube", "chopsticks", "knife_fork_plate", "fork_and_knife", "spoon"],
  "Objects": ["⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽️", "🎞️", "📞", "☎️", "pager", "fax", "tv", "radio", "studio_microphone", "level_slider", "control_knobs", "compass", "stopwatch", "timer_clock", "alarm_clock", "clock", "hourglass_flowing_sand", "hourglass", "satellite", "battery", "electric_plug", "bulb", "flashlight", "candle", "diya", "wastebasket", "oil_drum", "money_with_wings", "dollar", "yen", "euro", "pound", "moneybag", "credit_card", "gem", "balance_scale", "wrench", "hammer", "hammer_and_pick", "hammer_and_wrench", "pick", "nut_and_bolt", "gear", "chains", "hook", "toolbox", "magnet", "gun", "bomb", "firecracker", "axe", "carpentry_saw", "dagger", "crossed_swords", "shield", "bow_and_arrow", "coffin", "funeral_urn", "amphora", "crystal_ball", "prayer_beads", "barber", "alembic", "telescope", "microscope", "hole", "pill", "syringe", "dna", "stethoscope", "drop_of_blood", "plaster", "adhesive_bandage", "shirt", "jeans", "scarf", "gloves", "coat", "socks", "dress", "kimono", "sari", "one_piece_swimsuit", "briefs", "shorts", "bikini", "purse", "handbag", "pouch", "shopping_bags", "school_satchel", "mans_shoe", "athletic_shoe", "hiking_boot", "womans_flat_shoe", "high_heel", "sandal", "ballet_shoes", "boot", "crown", "womans_hat", "tophat", "mortar_board", "billed_cap", "helmet_with_white_cross", "prayer_beads", "lipstick", "ring", "gem"]
};

const EmojiPickerTool: React.FC = () => {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(null), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col">
       <div className="bg-white p-4 rounded-xl shadow border border-slate-200 mb-6 sticky top-0 z-10">
           <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 value={search}
                 onChange={e => setSearch(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-indigo-500 outline-none"
                 placeholder="Search emojis..."
               />
           </div>
       </div>

       <div className="flex-1 overflow-y-auto space-y-6 pr-2">
           {Object.entries(EMOJIS).map(([category, list]) => {
               const filtered = list.filter(e => e.includes(search)); // Simple filter, in real app need proper names
               if (filtered.length === 0) return null;
               
               return (
                   <div key={category}>
                       <h3 className="text-sm font-bold text-slate-500 uppercase mb-3 sticky top-0 bg-slate-50/90 backdrop-blur py-2">{category}</h3>
                       <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                           {filtered.map((emoji, i) => (
                               <button 
                                 key={i} 
                                 onClick={() => handleCopy(emoji)}
                                 className="aspect-square flex items-center justify-center text-2xl hover:bg-white hover:shadow-md hover:scale-110 transition-all rounded-xl relative group"
                               >
                                   {emoji}
                                   {copied === emoji && (
                                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg animate-in zoom-in">
                                           Copied!
                                       </div>
                                   )}
                               </button>
                           ))}
                       </div>
                   </div>
               );
           })}
       </div>
    </div>
  );
};

export default EmojiPickerTool;