/* ════════════════════════════════════════════════════════════════
   KASSY BAKES — DATA LAYER
   Single source of truth for menu categories + products.
   Rendered by js/menu-render.js and the homepage featured grid.
   Prices are placeholders (BDT, ৳) per brand brief — easily edited here.
   ════════════════════════════════════════════════════════════════ */

const KB = {
  /* WhatsApp number — international format, digits only. Replace before launch. */
  whatsapp: '8801000000000',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',

  /* Each category: id, label, icon, blurb, optional note */
  categories: [
    { id: 'whipped',     label: 'Whipped Cream Cakes', icon: '🎂', blurb: 'Light, dreamy & impossibly soft — the everyday celebration cake.' },
    { id: 'buttercream', label: 'Buttercream Cakes',   icon: '🎉', blurb: 'Celebration-focused, richly frosted & fully customisable.',
      note: 'Available in every flavour — vanilla, red velvet, chocolate, butterscotch, coffee, carrot, black forest, chocolate fudge, biscoff & oreo.' },
    { id: 'cupcakes',    label: 'Cupcakes',            icon: '🧁', blurb: 'Individually perfect, gift-ready & wildly photogenic.' },
    { id: 'brownies',    label: 'Brownies',            icon: '🍫', blurb: 'Dense, fudgy & deeply satisfying. 7-inch boxes. Sam’s domain.' },
    { id: 'milk',        label: 'Milk Cakes',          icon: '🥛', blurb: 'Soaked-through comfort desserts. Soft, pillowy, nostalgic.',
      note: 'One of our most beloved categories — soaked in flavoured milk syrup for warm, nostalgic comfort in every bite.' },
    { id: 'bento',       label: 'Bento Cakes',         icon: '🎁', blurb: '4-inch minis with minimalist designs & personal messages.',
      note: 'Trendy gifting cakes with custom messages. Extra customisation charges may apply.' },
    { id: 'teatime',     label: 'Tea Time Cakes',      icon: '🍵', blurb: 'Loaf-sized, everyday cozy cakes. Perfect with a cuppa.' },
  ],

  /* products — cat: category id · accent gradient stops drive the card art */
  products: [
    /* ── Whipped Cream ── */
    { cat:'whipped', name:'Vanilla Sponge Cake', emoji:'🍦', tag:'Classic', from:['#F5ECD7','#EDD9B4'], price:'৳900–1500', featured:true,
      desc:'Soft, airy vanilla sponge layered with light whipped cream. A timeless classic.' },
    { cat:'whipped', name:'Red Velvet Cake', emoji:'❤️', tag:'Bestseller', from:['#8B2635','#B5384A'], price:'৳1200–2200', featured:true,
      desc:'Moist red velvet with tangy cream cheese frosting. Rico has tried to sit on every order.' },
    { cat:'whipped', name:'Chocolate Ganache Cake', emoji:'🍫', tag:'Sam’s Pick', from:['#3D2208','#5C3317'], price:'৳1200–2400', featured:true, cat_pet:'sam',
      desc:'Dark chocolate layers under a glossy ganache coat with gold dust. The highest honour.' },
    { cat:'whipped', name:'Butterscotch Cake', emoji:'🍮', tag:'Rico’s Pick', from:['#A0622A','#C8844A'], price:'৳1300–2300', featured:true, cat_pet:'rico',
      desc:'Buttery sponge drizzled with butterscotch sauce & roasted nuts. Rico’s weakness.' },
    { cat:'whipped', name:'Coffee Cake', emoji:'☕', tag:'Café Favourite', from:['#4A2C17','#7B4A22'], price:'৳1200–2200',
      desc:'Coffee-soaked sponge with smooth coffee ganache. For the late-night baker.' },
    { cat:'whipped', name:'Coconut Cake', emoji:'🥥', tag:'Tropical', from:['#F5ECD7','#D9C49A'], price:'৳1100–2000',
      desc:'Coconut-infused sponge layered with coconut cream. Light, fragrant, satisfying.' },
    { cat:'whipped', name:'Carrot Cake', emoji:'🥕', tag:'Homemade', from:['#7B4A22','#C8844A'], price:'৳1300–2500',
      desc:'Warmly spiced carrot cake with mixed-nut cream cheese frosting. Comfort in every bite.' },
    { cat:'whipped', name:'Black Forest Cake', emoji:'🍒', tag:'Classic', from:['#2C1A0E','#5C3317'], price:'৳1300–2300',
      desc:'Chocolate cream with cherry filling & shavings. A timeless celebration cake.' },
    { cat:'whipped', name:'Biscoff Cake', emoji:'🍪', tag:'Trendy', from:['#A0622A','#D4A843'], price:'৳1500–2800', featured:true,
      desc:'Layered with Biscoff spread, cookie crumble & silky cream. Our most Instagrammable cake.' },
    { cat:'whipped', name:'Oreo Cake', emoji:'⚫', tag:'Fan Favourite', from:['#2C1A0E','#F5ECD7'], price:'৳1300–2400',
      desc:'Cookies-and-cream layers with cream cheese frosting. Always a hit.' },
    { cat:'whipped', name:'Strawberry Cake', emoji:'🍓', tag:'Seasonal', from:['#8B2635','#F5ECD7'], price:'৳1400–2600',
      desc:'Fresh strawberry layers with strawberry sauce & cream. Sweet, tart & beautiful.' },

    /* ── Buttercream ── */
    { cat:'buttercream', name:'Vanilla Buttercream', emoji:'🎂', tag:'Premium', from:['#F5ECD7','#D4A843'], price:'On request',
      desc:'Classic vanilla sponge with silky buttercream. The perfect canvas for custom décor.' },
    { cat:'buttercream', name:'Red Velvet Buttercream', emoji:'❤️', tag:'Bestseller', from:['#8B2635','#D4A843'], price:'On request',
      desc:'Vivid red velvet with smooth tangy buttercream. A showstopper at any celebration.' },
    { cat:'buttercream', name:'Chocolate Fudge Buttercream', emoji:'🍫', tag:'Rich', from:['#2C1A0E','#A0622A'], price:'On request',
      desc:'Deep chocolate sponge with fudge-rich buttercream. Sam demands a slice every time.' },
    { cat:'buttercream', name:'Biscoff Buttercream', emoji:'🍪', tag:'Trendy', from:['#A0622A','#D4A843'], price:'On request',
      desc:'Biscoff-swirled buttercream on a caramelised base. Your next party cake.' },

    /* ── Cupcakes ── */
    { cat:'cupcakes', name:'Vanilla Cupcakes', emoji:'🧁', tag:'4-piece box', from:['#F5ECD7','#EDD9B4'], price:'On request',
      desc:'Soft vanilla cupcakes crowned with silky buttercream swirls. Sold in 4-piece boxes.' },
    { cat:'cupcakes', name:'Chocolate Cupcakes', emoji:'🍫', tag:'Indulgent', from:['#3D2208','#7B4A22'], price:'On request',
      desc:'Rich chocolate cupcakes with chocolate frosting. Rico is banned from the packing room.' },
    { cat:'cupcakes', name:'Red Velvet Cupcakes', emoji:'❤️', tag:'Gift Fave', from:['#8B2635','#B5384A'], price:'On request',
      desc:'Beautifully red with cream cheese frosting. Perfect for gifting. Boxes of 4+.' },

    /* ── Brownies ── */
    { cat:'brownies', name:'Original Brownies', emoji:'🍫', tag:'Original', from:['#2C1A0E','#3D2208'], price:'On request',
      desc:'Classic fudgy brownies with a crinkle top & dense chocolate interior. Sam supervises.' },
    { cat:'brownies', name:'Caramel Brownies', emoji:'🍮', tag:'Rico’s Fave', from:['#7B4A22','#D4A843'], price:'On request', featured:true, cat_pet:'rico',
      desc:'Fudgy base with caramel ribbons swirled throughout. Rico has stolen three batches.' },
    { cat:'brownies', name:'Chocolate Chunk Brownies', emoji:'🍪', tag:'Indulgent', from:['#241408','#5C3317'], price:'On request',
      desc:'Loaded with dark chocolate chunks that melt as the brownie cools. Deeply indulgent.' },

    /* ── Milk Cakes ── */
    { cat:'milk', name:'Tres Leches', emoji:'🥛', tag:'Classic', from:['#F5ECD7','#D9C49A'], price:'On request', featured:true,
      desc:'Three-milk soaked sponge with light whipped cream. The original. Always on the menu.' },
    { cat:'milk', name:'Caramel Milk Cake', emoji:'🍮', tag:'Sweet', from:['#D4A843','#A0622A'], price:'On request',
      desc:'Milk-soaked sponge with caramel drizzle. Rico licks the caramel straight from the jar.' },
    { cat:'milk', name:'Roshmalai Milk Cake', emoji:'🌸', tag:'Special', from:['#EDD9B4','#C8844A'], price:'On request',
      desc:'Inspired by the beloved South Asian dessert. Creamy, fragrant & unforgettable.' },
    { cat:'milk', name:'Chai Milk Cake', emoji:'🍵', tag:'Cozy', from:['#C8844A','#7B4A22'], price:'On request',
      desc:'Spiced chai-infused sponge soaked in cardamom milk. The definition of cozy.' },
    { cat:'milk', name:'Coffee Milk Cake', emoji:'☕', tag:'Café Fave', from:['#4A2C17','#C8844A'], price:'On request',
      desc:'Espresso-soaked sponge with coffee cream. Cake and coffee — why choose?' },
    { cat:'milk', name:'Chocolate Milk Cake', emoji:'🍫', tag:'Sam Approved', from:['#241408','#5C3317'], price:'On request', cat_pet:'sam',
      desc:'Chocolate sponge soaked in chocolate milk with dark cocoa cream. Sam sat on the box.' },
    { cat:'milk', name:'Pistachio Milk Cake', emoji:'🌿', tag:'Premium', from:['#5A6B3A','#D4A843'], price:'On request',
      desc:'Pistachio-cream soaked sponge with crushed pistachio topping. Elegant & unique.' },

    /* ── Bento ── */
    { cat:'bento', name:'Vanilla Bento Cake', emoji:'🎁', tag:'4-inch', from:['#F5ECD7','#EDD9B4'], price:'On request',
      desc:'Mini 4-inch vanilla sponge with minimal frosting & your personalised message.' },
    { cat:'bento', name:'Chocolate Bento Cake', emoji:'🍫', tag:'Popular', from:['#3D2208','#C8844A'], price:'On request',
      desc:'Chocolate mini cake with minimal dark frosting. Simple. Beautiful. Memorable.' },
    { cat:'bento', name:'Mocha Bento Cake', emoji:'☕', tag:'Unique', from:['#7B4A22','#D4A843'], price:'On request',
      desc:'Coffee-chocolate fusion bento. A gift that says you understand their soul.' },
    { cat:'bento', name:'Red Velvet Bento Cake', emoji:'❤️', tag:'Gift Fave', from:['#8B2635','#F5ECD7'], price:'On request',
      desc:'The most-gifted bento. Red velvet with cream cheese frosting & a love note.' },

    /* ── Tea Time ── */
    { cat:'teatime', name:'Vanilla Pound Cake', emoji:'🍋', tag:'Classic', from:['#F5ECD7','#D4A843'], price:'On request',
      desc:'Dense, buttery vanilla loaf. The kind made on slow Sunday mornings.' },
    { cat:'teatime', name:'Chocolate Pound Cake', emoji:'🍫', tag:'Rich', from:['#3D2208','#7B4A22'], price:'On request',
      desc:'Dark chocolate loaf, dense & deeply flavoured. Sam’s 4am snack of choice.' },
    { cat:'teatime', name:'Choco Chip Pound Cake', emoji:'⚫', tag:'Cozy', from:['#5C3317','#F5ECD7'], price:'On request',
      desc:'Vanilla loaf studded with dark chocolate chips. Good with tea, great at midnight.' },
    { cat:'teatime', name:'Marble Cake', emoji:'🌀', tag:'Visual Treat', from:['#A0622A','#F5ECD7'], price:'On request',
      desc:'Swirled vanilla & chocolate batter in a beautiful loaf. As pretty as it tastes.' },
    { cat:'teatime', name:'Nut Pound Cake', emoji:'🌰', tag:'Hearty', from:['#D4A843','#A0622A'], price:'On request',
      desc:'Buttery loaf loaded with mixed nuts. Crunchy, warm & perfect with afternoon tea.' },
    { cat:'teatime', name:'Fruit Marble Cake', emoji:'🍎', tag:'Fruity', from:['#8B2635','#D4A843'], price:'On request',
      desc:'Marble loaf with candied fruit ribbons. Colourful, sweet & surprisingly addictive.' },
  ],
};

/* Convenience accessors */
KB.byCategory = (id) => KB.products.filter(p => p.cat === id);
KB.featured = () => KB.products.filter(p => p.featured);
KB.categoryOf = (id) => KB.categories.find(c => c.id === id);
