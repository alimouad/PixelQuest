let maxCrds = 6;
let realeasedGame = document.querySelector('.realesed-games')
let allGames = document.querySelector('.allGames-container')
const all_sections = document.querySelectorAll('.main_section > .section ')
const nav_links = document.querySelectorAll('.nav_links > li a')
 
 document.querySelectorAll('.dropdown-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const menu = btn.nextElementSibling;
        const icon = btn.querySelector('.dropdown-icon');
        menu.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
      });
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
    try {
        const response = await fetch('http://16.16.171.104:3000/api/games');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
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

async function fetchAllGames() {
    try {
        const response = await fetch('http://16.16.171.104:3000/api/games');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (Array.isArray(data.results)) {
            
            const resultsArray = data.results;

            for (let i = 0; i < resultsArray.length; i++) {
                generateAllGames(resultsArray[i]); 
            }
        } else {
            console.error("Fetched data does not contain a 'results' array:", data);
        }


    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

fetchAllGames()
let generateAllGames = (game)=>{
     const name = game.name || 'Untitled Game';
    const rating = game.rating ? `Rating: ${game.rating}` : 'No Rating'; 
    const image_url = game.background_image || './images/default-placeholder.jpg'; 

    let Div = document.createElement('div');

    Div.innerHTML = ` 
         <div class="game-card w-[280px] rounded-2xl border border-[#2C2C2C] bg-[#000000]
                shadow-2xl shadow-black/70 hover:shadow-black/90 transition-all duration-500
                hover:-translate-y-2 relative overflow-hidden group">

                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2C2C2C]/40
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div class="relative overflow-hidden rounded-t-2xl">
                    <img src=${image_url}
                        class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#000000]/70 to-transparent"></div>
                </div>

                <!-- Body -->
                <div class="p-4 space-y-4">
                    <div>
                        <h3 class="text-xl font-extrabold text-[#F5F5F5] truncate transition-colors duration-300 group-hover:text-[#F5F5F5]">
                            ${name}
                        </h3>
                        <p class="text-xs text-[#F5F5F5]/50 tracking-wide uppercase">
                            Action · RPG · Fantasy
                        </p>
                    </div>

                    <!-- Price & Rating -->
                    <div class="flex justify-between items-end pt-3 border-t border-[#2C2C2C]">

                        <div class="flex flex-col">
                            <span class="text-xs text-[#F5F5F5]/40 line-through">$29.99</span>
                            <span class="text-xl font-black text-[#F5F5F5] leading-none drop-shadow-lg">
                                FREE
                            </span>
                        </div>

                        <div class="flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#2C2C2C]/80
                            transition-colors duration-300">

                            <svg class="w-4 h-4 fill-current text-[#F5F5F5]" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 
                                9.24l-7.19-.61L12 2 9.19 8.63 
                                2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>

                            <span class="text-sm font-semibold text-[#F5F5F5]">${rating}</span>
                        </div>

                    </div>

                    <!-- Buttons -->
                    <div class="flex gap-3 pt-1.5">

                        <button class="flex-1 py-2 px-4 bg-[#2C2C2C] text-[#F5F5F5]
                            font-semibold text-sm rounded-lg transition-all duration-300
                            hover:bg-[#F5F5F5] hover:text-[#000000] hover:shadow-lg active:scale-95">
                            View Details
                        </button>

                        <!-- Wishlist -->
                        <button class="favorite-btn w-12 h-10 flex items-center justify-center
                            bg-[#F5F5F5]/10 rounded-lg transition-all duration-300 hover:bg-[#F5F5F5]/40 relative group"
                            aria-label="Add to favorites">

                            <svg class="w-5 h-5 text-[#F5F5F5] transition-all duration-300 group-hover:text-[#F5F5F5]"
                                viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 
                                15.36 2 12.28 2 8.5 2 5.42 4.42 
                                3 7.5 3c1.74 0 3.41.81 4.5 
                                2.09C13.09 3.81 14.76 3 
                                16.5 3 19.58 3 22 5.42 
                                22 8.5c0 3.78-3.4 6.86-8.55 
                                11.54L12 21.35z"/>
                            </svg>

                        </button>

                    </div>
                </div>
            </div>

    `;

    console.log('test')
    allGames.appendChild(Div);
}