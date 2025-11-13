let maxCrds = 6;
let realeasedGame = document.querySelector('.realesed-games')
let allGames = document.querySelector('.allGames-container')
let allPlatforms = document.querySelector('.all-platforms-container')
const all_sections = document.querySelectorAll('.main_section > .section ')
const nav_links = document.querySelectorAll('.nav_links > li a')
let spinner = document.querySelector('.spinner')
let targetNumber = 1;
 
 document.querySelectorAll('.dropdown-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const menu = btn.nextElementSibling;
        const icon = btn.querySelector('.dropdown-icon');
        menu.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
      });
    });

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
  console.log('test')
});


nav_links.forEach(link =>{
    link.addEventListener('click',(e)=>{
        nav_links.forEach(item =>{
        item.classList.remove('active')
    })
    e.target.classList.add('active')
    all_sections.forEach(div=>{
        div.classList.remove('active')
    })
    const selector = e.target.dataset.cont;
    console.log(selector)
    const targetDiv = document.querySelector(selector);
    targetDiv.classList.add('active');
    })
    

})

async function fetchData() {
    spinner.classList.remove('hidden');
    try {
        const response = await fetch('  https://debuggers-games-api.duckdns.org/api/games');
          
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        
        if (Array.isArray(data.results)) {
            
            const resultsArray = data.results;

            for (let i = 0; i < maxCrds; i++) {
                generateCards(resultsArray[i]); 
            }
        } else {
            console.error("Fetched data does not contain a 'results' array:", data);
        }


    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
    finally { 
        setTimeout(() => {
            spinner.classList.add('hidden'); // ✅ hide after 1s
        }, 1000);
}
}


fetchData();


function generateCards(game) {
    const name = game.name || 'Untitled Game';
    const rating = game.rating ? `Rating: ${game.rating}` : 'No Rating'; 
    const image_url = game.background_image || './images/default-placeholder.jpg'; 
    



    let Div = document.createElement('div');

    Div.innerHTML = ` 
        <div class="bg-[#F5F5F5]/10 rounded-xl shadow-xl hover:scale-105 transition-all border border-[#F5F5F5]/10 backdrop-blur-xl cursor-pointer">
            <img src="${image_url}" class="h-40 w-full object-cover rounded-t-xl">
            <div class="p-4">
                <h3 class="font-semibold truncate">${name}</h3>
                <p class="text-sm text-gray-300">Action, Adventure</p>
                <div class="mt-2 flex justify-between">
                    <span class="text-[#FAF9EE] font-bold">FREE</span>
                    <span class="text-md text-gray-300"> ${rating}⭐</span> 
                </div>
            </div>
        </div>
    `;

    console.log('test')
    realeasedGame.appendChild(Div);
}



async function fetchAllGames(page = 1) {
    currentPage = page;
    spinner.classList.remove('hidden'); // show loader
    
    try {
        const response = await fetch(` https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=${limit}`);
        const data = await response.json();

        const totalGames = data.total || 0;
        totalPages = Math.ceil(totalGames / limit);

        allGames.innerHTML = '';
        data.results.forEach(game => {
            generateAllGames(game);
        });

        updatePagination(totalGames);
    } catch (error) {
        console.error(error);
    } finally {
        setTimeout(() => spinner.classList.add('hidden'), 1000);
    }
}

let currentPage = 1;
const limit = 20;
let totalPages = 1;
let page = 1;
function updatePagination(totalGames) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; // clear old pages

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);

  for (let page = start; page <= end; page++) {
    const btn = document.createElement("button");
    btn.className =
      "w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 " +
      (page === currentPage
        ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/30"
        : "text-gray-300 hover:bg-gray-700");

    btn.textContent = page;

    btn.addEventListener("click", () => {
      fetchAllGames(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    paginationContainer.appendChild(btn);
  }

  document.querySelector("#paginationInfo").innerHTML =
    `Showing <span class="font-bold text-white">${(currentPage - 1) * limit + 1}</span> to 
     <span class="font-bold text-white">${Math.min(currentPage * limit, totalGames)}</span> of 
     <span class="font-bold text-white">${totalGames}</span> Games`;
}


fetchAllGames()


// ✅ Function to generate a game card
function generateAllGames(game) {
  const name = game.name || "Untitled Game";
  const rating = game.rating ? `${game.rating}` : "No Rating";
  const image_url = game.background_image || "./images/default-placeholder.jpg";
  
  const description =
    game.description || "No description available for this game.";
    const realeasedGame = game.released;

  const Div = document.createElement("div");

  Div.innerHTML = `
    <div class="game-card w-[280px] rounded-2xl border border-[#2C2C2C] bg-[#0a0a0a]/60 backdrop-blur-md
      shadow-2xl shadow-black/70 hover:shadow-black/90 transition-all duration-500
      hover:-translate-y-2 relative overflow-hidden group">

      <div class="relative overflow-hidden rounded-t-2xl">
        <img src="${image_url}"
          class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-[#000000]/70 to-transparent"></div>
      </div>

      <!-- Body -->
      <div class="p-4 space-y-4">
        <div>
          <h3 class="text-lg font-bold text-[#F5F5F5] truncate">${name}</h3>
          <p class="text-sm text-gray-400 mb-4">${game.genres.map(g => g.name).join(", ")}</p>
        </div>

        <!-- Price & Rating -->
        <div class="flex justify-between items-end pt-3 border-t border-[#2C2C2C]">
          <span class="text-[#FAF9EE] font-bold">Free</span>
          <div class="flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#2C2C2C]/80">
            <i class="fa-solid fa-star text-[#F5F5F5] text-sm"></i>
            <span class="text-sm font-semibold text-[#F5F5F5]">${rating}</span>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 pt-1.5">
          <button class="view-details-btn flex-1 py-2 px-4 bg-[#2C2C2C] text-[#F5F5F5]
              font-semibold text-sm rounded-lg transition-all duration-300
              hover:bg-[#F5F5F5] hover:text-[#000000] hover:shadow-lg active:scale-95"
              data-name="${name}"
              data-image="${image_url}"
              data-rating="${rating}"
              data-description="${description}"
              data-released = "${realeasedGame}">
            View Details
          </button>

          <button class="favorite-btn w-12 h-10 flex items-center justify-center
              bg-[#F5F5F5]/10 rounded-lg transition-all duration-300 hover:bg-[#F5F5F5]/40">
            <i class="fa-solid fa-heart text-[#F5F5F5]"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  allGames.appendChild(Div);
}

// ✅ Function to create popup modal
function createModal() {
  const modal = document.createElement("div");
  modal.id = "gameModal";
  modal.className =
    "hidden fixed overflow-hidden inset-0 bg-black/70 backdrop-blur-md flex justify-center z-50 p-4";
  modal.innerHTML = `
    <div class="bg-[#f5f5f5] border border-[#2C2C2C] rounded-2xl shadow-2xl max-w-lg w-full h-max overflow-hidden text-[#000] relative">
      <button id="closeModal" class="absolute top-4 right-4 text-[#F5F5F5]/70 hover:text-[#F5F5F5]">
        <i class="fa-solid fa-xmark text-xl text-black"></i>
      </button>
      <img id="modalImage" src="" class="w-full h-56 object-cover rounded-t-2xl">
      <div class="p-6 space-y-4">
        <h2 id="modalTitle" class="text-2xl text-black font-bold"></h2>
        <div class = "flex align-center justify-between">
        <p id="modalRating" class="text-sm text-black"></p>
        <p id="modalReleasedGame" class="text-sm text-black"></p>
        </div>
        
        <p id="modalDescription" class="text-sm leading-relaxed text-black"></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}

createModal();


document.addEventListener("click", (e) => {
  if (e.target.closest(".view-details-btn")) {
    const btn = e.target.closest(".view-details-btn");
    document.getElementById("modalImage").src = btn.dataset.image;
    document.getElementById("modalTitle").textContent = btn.dataset.name;
    document.getElementById("modalRating").textContent = `⭐ ${btn.dataset.rating}`;
    document.getElementById("modalReleasedGame").textContent = `released date : ${btn.dataset.released}`;
    document.getElementById("modalDescription").textContent = btn.dataset.description;
    document.getElementById("gameModal").classList.remove("hidden");
  }
});



let pagination = document.querySelectorAll('.pagination > button')

pagination.forEach(pagi =>{
    pagi.addEventListener('click', (e)=>{
        targetNumber = e.target.innerText
        fetchAllGames()
    })
})






async function fetchAllPlatforms() {
    spinner.classList.remove('hidden');
    try {
        const response = await fetch('  https://debuggers-games-api.duckdns.org/api/platforms');
          
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const platforms = data.platforms;
        allPlatforms.innerHTML = "";

        platforms.forEach((platformName, i) => {
        const image = `https://picsum.photos/seed/${encodeURIComponent(platformName)}/500/300`; // random placeholder

        const card = document.createElement("div");
        card.className = `
            relative bg-[#111] text-[#F5F5F5] rounded-2xl overflow-hidden shadow-xl 
            hover:shadow-[#000]/80 hover:-translate-y-2 transition-all duration-500 
            w-[340px] h-[340px] flex flex-col justify-end
        `;

        card.innerHTML = `
            <!-- Background Image -->
            <div class="absolute inset-0">
            <img src="${image}" alt="${platformName}" class="w-full h-full object-cover opacity-80">
            <div class="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/40 to-transparent"></div>
            </div>

            <!-- Content -->
            <div class="relative p-4 z-10">
            <h3 class="text-2xl text-center font-bold mb-1">${platformName}</h3>

            </div>
        `;

        allPlatforms.appendChild(card);
        });


    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
    finally { 
        setTimeout(() => {
            spinner.classList.add('hidden'); 
        }, 1000);
}
}



let arrImages = ['./images/android.jpg','./images/ios.jpeg','./images/macos.jpg','./images/pc.png','./images/playstation2.png','./images/Playstation-4.webp','./images/psp.jpg','./images/xbox.png','./images/playstation5.jpg']

function createBox(){
    for(let i = 0; i< arrImages.length; i++){
        const card = document.createElement("div");
        card.className = `
            relative bg-[#111] text-[#F5F5F5] rounded-2xl overflow-hidden shadow-xl 
            hover:shadow-[#000]/80 hover:-translate-y-2 transition-all duration-500 
            w-[280px] h-[340px] flex flex-col justify-end
        `;

        card.innerHTML = `
            <!-- Background Image -->
            <div class="absolute inset-0">
            <img src="${arrImages[i]}" alt="${arrImages[i].slice(3,6)}" class="w-full h-full object-cover opacity-80">
            <div class="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/40 to-transparent"></div>
            </div>

            <!-- Content -->
            <div class="absolute top-[50%] left-14 p-4 z-10">
            <h3 class="text-xl text-center text-white font-bold mb-1">${arrImages[i].slice(9,-4).toUpperCase()}</h3>

            </div>
        `;

        allPlatforms.appendChild(card)
    }
}

createBox()





// DOM elements
const genreSelect = document.querySelector(".Genre");
const platformSelect = document.querySelector(".Platform");
const ratingSelect = document.querySelector(".Ratings");
const resetButton = document.querySelector(".ResetFilters");
 // adjust selector

// Main Fetch Function
async function fetchAllGamesFilter(page = 1, genre = "", platform = "", ordering = "") {
  let url = `https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=${limit}`;

  if (genre && genre !== "Genre") url += `&genre=${genre.toLowerCase()}`;
  if (platform && platform !== "Platform") url += `&platform=${encodeURIComponent(platform)}`;
  if (ordering && ordering !== "Ratings") {
    url += ordering === "Ascendent" ? "&ordering=rating" : "&ordering=-rating";
  }
   spinner.classList.remove('hidden');

  try {
    const res = await fetch(url);
    const data = await res.json();
    allGames.innerHTML = ""; 
    data.results.forEach(game => generateAllGames(game));
  } catch (err) {
    console.error("Error fetching games:", err);
  }
   finally { 
        setTimeout(() => {
            spinner.classList.add('hidden'); 
        }, 1000);
}
}



// Event Listeners
genreSelect.addEventListener("change", () => {
  fetchAllGamesFilter(1, genreSelect.value, platformSelect.value, ratingSelect.value);
});

platformSelect.addEventListener("change", () => {
  fetchAllGamesFilter(1, genreSelect.value, platformSelect.value, ratingSelect.value);
});

ratingSelect.addEventListener("change", () => {
  fetchAllGamesFilter(1, genreSelect.value, platformSelect.value, ratingSelect.value);
});

resetButton.addEventListener("click", () => {
  genreSelect.selectedIndex = 0;
  platformSelect.selectedIndex = 0;
  ratingSelect.selectedIndex = 0;
  fetchAllGames();
});

// Initial fetch
fetchAllGamesFilter();
