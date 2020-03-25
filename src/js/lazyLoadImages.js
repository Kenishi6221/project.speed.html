const applyIntersectionObserver = () => {

    const lazyLoadImages = document.querySelectorAll('.lazy')

    var imageObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const { target: image } = entry
                image.src = image.dataset.src
                image.classList.remove('lazy')
                imageObserver.unobserve(image)
                console.log("image ", image, "was loaded")
            }
        }
    })

    lazyLoadImages.forEach(image => {
        imageObserver.observe(image)
    })
}

const applyStandarizedLazyLoad = () => {
    const lazyLoadImages = document.querySelectorAll('.lazy')

    function lazyLoad() {

        if (lazyLoadThrottleTimeout) {
            clearTimeout(lazyLoadThrottleTimeout)
        }

        const lazyLoadThrottleTimeout = setTimeout(() => {

            let scrollTop = window.pageYOffset
            for (const image of lazyLoadImages) {
                if (image.offsetTop < (window.innerHeight + scrollTop)) {
                    image.src = image.dataset.src
                    image.classList.remove('.lazy')
                    console.log("image ", image, "was loaded")
                }
            }

            if (lazyLoadImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad)
                document.removeEventListener("resize", lazyLoad)
                document.removeEventListener("orientationchange", lazyLoad)
            }

        }, 20)
    }

    document.addEventListener("scroll", lazyLoad)
    document.addEventListener("resize", lazyLoad)
    document.addEventListener("orientationchange", lazyLoad)
}

const applyLazyLoadImages = () => {
    if ("IntersectionObserver" in window) {
        applyIntersectionObserver()
    }
    else {
        applyStandarizedLazyLoad()
    }
}

document.addEventListener("DOMContentLoaded", applyLazyLoadImages)