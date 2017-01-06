//Adds support for iterating over HTMLCollections with for of and for in
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

const emojis = {
	"baby": "🍼",
	"beach": "🏖",
	"beard": "👴",
	"bicycle": "🚲",
	"camera": "📷",
	"car": "🚗",
	"child": "👦",
	"christmas tree": "🎄",
	"closeup": "👀",
	"cloud": "☁️",
	"crowd": "👥",
	"dog": "🐶",
	"drink": "🍹",
	"eating": "🍽",
	"eyeglasses": "👓",
	"flower": "🌻",
	"food": "🍎",
	"golf": "🏌️‍",
	"grass": "🍃",
	"hat": "👒",
	"indoor": "🏠",
	"living room": "🏠",
	"meme": "👍",
	"mountain": "🌋",
	"nature": "🏞",
	"night": "🌃",
	"ocean": "🌊",
	"office": "💼",
	"outdoor": "🚵",
	"eating": "🍽",
	"sitting": "💺",
	"smiling": "😂",
	"standing": "🕴",
	"phone": "📱",
	"plant": "🌿",
	"selfie": "🤳",
	"shoes": "👡",
	"sitting": "💺",
	"sky": "☀️",
	"skyscraper": "🏙",
	"sleeping": "😴",
	"smiling": "😋",
	"snow": "❄️",
	"standing": "🕴",
	"stripes": "📶",
	"suit": "🕴",
	"sunglasses": "🕶",
	"swimming": "🏊",
	"table": "🍽",
	"text": "🔠",
	"tree": "🌴",
	"twilight": "🌃",
	"water": "💧",
	"glasses": "👓",
	"instrument": "🎸",
	"stage": "🎭",
	"fireworks": "🎆",
	"pizza": "🍕",
	"taco": "🌮",
	"burrito": "🌯",
	"burger": "🍔",
	"hotdog": "🌭",
  "pizza": "🍕",
  "close-up": "🔎",
	"person": "👤",
	"people": "👥",
}

function addComputerVisionTags() {
	const TAG_PREFIX = "Image may contain: ";
	
	const newImgs = [...document.getElementsByTagName('img')].filter(img => img.getAttribute("data-prev-alt") !== img.getAttribute("alt"));
	
	for(var img of newImgs) {
		//Remember that we've added the tags to this image
		img.setAttribute("data-prev-alt", img.alt);
		
		if(img.alt.startsWith(TAG_PREFIX)) {
			const tags = img.alt.slice(TAG_PREFIX.length).split(/, | and /);
			
			var html = "<ul class='computer-vision'>";
			html += "<li><b>Image may contain</b></li>";
			
			for(var tag of tags) {
				let prefix = "";
				
				//Match an emoji prefix
				prefix = emojis[Object.keys(emojis).find(k => tag.includes(k))] || "";
				
				html += `<li>${prefix} ${tag}</li>`;
			}
			
			html += "</ul>";
			
			img.style.position = 'relative';
			img.insertAdjacentHTML('afterend', html);
		}
	}
};

const observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		addComputerVisionTags();
	});
});

observer.observe(document.body, { attributes: true, childList: true, characterData: false });

addComputerVisionTags();
