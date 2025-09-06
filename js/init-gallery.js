// init-gallery.js

function initGallery() {
    const container = document.getElementById('lightgallery');
    if (!container || container.children.length === 0) return;


    if (container.dataset.masonryInitialized === 'true') return;
    container.dataset.masonryInitialized = 'true';

    const masonry = new Masonry(container, {
        itemSelector: 'a',
        columnWidth: 240,
        gutter: 10,
        fitWidth: true,
        stagger: 30,
        transitionDuration: '0.3s'
    });

    const images = container.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            masonry.layout();
        } else {
            img.addEventListener('load', () => {
                masonry.layout();
            }, { once: true });
        }
    });

    const videos = container.querySelectorAll('video');
    videos.forEach(video => {
        if (video.readyState >= 2) {
            masonry.layout();
        } else {
            video.addEventListener('loadeddata', () => {
                masonry.layout();
            }, { once: true });
        }
    });
}

document$.subscribe(() => {
    requestAnimationFrame(() => {
        initGallery();
    })
});