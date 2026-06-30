const generateMockImages = () => {
    const list = [];
    
    // Varying aspect ratios for masonry cards
    const aspectRatios = [
        { w: 300, h: 300 }, // Square
        { w: 300, h: 400 }, // 3:4 Vertical
        { w: 300, h: 450 }, // 2:3 Vertical
        { w: 300, h: 500 }, // 3:5 Tall
        { w: 300, h: 600 }  // 1:2 Extra Tall
    ];

    // Background placeholder colors to display while image is loading
    const placeholderColors = [
        "#1e293b", "#27272a", "#172554", "#0f172a", "#3b0764", 
        "#1c1917", "#052e16", "#2e1065", "#4c0519", "#1e1b4b"
    ];

    for (let i = 1; i <= 250; i++) {
        const ratio = aspectRatios[i % aspectRatios.length];
        const color = placeholderColors[i % placeholderColors.length];
        
        // Picsum IDs 10 to 110 are stable and don't 404
        const picsumId = (i % 100) + 10; 

        list.push({
            id: i,
            title: `Creative Inspiration #${i}`,
            author: `Artist ${picsumId}`,
            url: `https://picsum.photos/id/${picsumId}/${ratio.w}/${ratio.h}`,
            width: ratio.w,
            height: ratio.h,
            color: color
        });
    }

    return list;
};

export const mockImages = generateMockImages();
