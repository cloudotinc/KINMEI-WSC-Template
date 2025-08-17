document.addEventListener("DOMContentLoaded", function () {

    const lenis = new Lenis();

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    raf()

    gsap.registerPlugin(ScrollTrigger)

    // const lenis = new Lenis()
    // lenis.on('scroll', ScrollTrigger.update)
    // gsap.ticker.add((time) => {
    //     lenis.raf(time * 1000)
    // })
    // gsap.ticker.lagSmoothing(0)

    const mv = document.querySelector(".mv");

    let angle = 0;
    const radiusX = 50; // ±25% for width (150% total)
    const radiusY = 50; // ±10% for height (120% total)
    const centerX = 50;
    const centerY = 50;

    const loadingAnim = () => {
        const blackDivs = [...document.querySelectorAll('.loading-abs-black div')];
        const loadingWrapper = document.querySelector('.loading');
        const tl = gsap.timeline()
        tl.from('.loading-logo svg path', {
            y:200,
            duration: 1,
            ease: 'power4.out',
            stagger: .05
        })
            .to(blackDivs, {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                duration: 1,
                ease: 'power4.out',
                stagger: .08,
            }, '+=.3')
            .to(blackDivs, {
                clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
                duration: 1,
                ease: 'power4.out',
                stagger: .08,
                onStart: () => {
                    document.querySelector('.loading').style.background = 'transparent';
                    document.querySelector('.loading-logo').style.display = 'none';

                },
                onComplete: () => {
                    loadingWrapper.remove();
                }
            }, '-=.4')
    }

    loadingAnim();

    function animateBackground() {
        angle += 0.01; // smaller = slower rotation

        const offsetX = centerX + Math.cos(angle) * radiusX;
        const offsetY = centerY + Math.sin(angle) * radiusY;

        mv.style.backgroundPosition = `${offsetX}% ${offsetY}%`;

        requestAnimationFrame(animateBackground);
    }

    animateBackground();

    const sec1Animations = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".sec1",
                start: "top top",
                end: "+=500",
                scrub: 1,
                pin: true
            }
        });

        tl.to('.abs-sec1', {
            scale: .5
        })
            .to('.scatter-card1', {
                left: '8%',
                top: '18%',
            }, '<')
            .to('.scatter-card2', {
                left: '18%',
                bottom: '6%',
            }, '<')
            .to('.scatter-card3', {
                right: '16%',
                top: '12%',
            }, '<')
            .to('.scatter-card4', {
                right: '23%',
                bottom: '15%',
            }, '<')
            .to('.scatter-card5', {
                left: '3%',
                top: '45%',
            }, '<')
            .to('.scatter-card6', {
                right: '4%',
                bottom: '38%',
            }, '<')
    }

    sec1Animations();


    const projectsAnim = () => {
        const projectsTl = gsap.timeline({
            defaults: {
                ease: 'none'
            },
            scrollTrigger: {
                trigger: '.projects',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                pin: '.images-section',
            }
        })

        projectsTl.to('.image1', {
            clipPath: 'inset(0px 0px 100%)',
        })
            .to('.image2', {
                clipPath: 'inset(0px 0px 100%)',
            })

        const projects = [...document.querySelectorAll('.project')];

        const images = [...document.querySelectorAll('.image')]

        projects.forEach((p, i) => {
            const color = p.dataset.color;
            gsap.to(p, {
                scrollTrigger: {
                    trigger: p,
                    start: 'top 50%',
                    end: 'bottom 50%',
                    onEnter: () => {
                        gsap.to('body', {
                            backgroundColor: color,
                            duration: 1,
                            ease: 'power4.out'
                        });
                    },
                    onLeave: () => {
                        if (i == projects.length - 1) {
                            gsap.to('body', {
                                backgroundColor: '#fff',
                                duration: 1,
                                ease: 'power4.out'
                            });
                        }
                    },
                    onEnterBack: () => {
                        gsap.to('body', {
                            backgroundColor: color,
                            duration: 1,
                            ease: 'power4.out'
                        });
                    },
                    onLeaveBack: () => {
                        if (i == 0) {
                            gsap.to('body', {
                                backgroundColor: '#fff',
                                duration: 1,
                                ease: 'power4.out'
                            });
                        }
                    }
                }
            });
        });
    }

    projectsAnim();
    const meritAnim = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.sec3',
                start: 'top top',
                end: '+=600',
                scrub: 2,
                pin: true,
                pinSpacing: true
            }
        })
        tl.from('.benifit-anim1', {
            y: '100vh',
        }).from('.benifit-anim2', {
            y: '100vh',
        }).to({}, { duration: .2 });
    }
    meritAnim();

    const workFlowAnim = () => {

        const flowGrids = [...document.querySelectorAll('.flow-grid')];

        flowGrids.forEach(item => {
            const image = item.querySelector('.flow-image img');
            const text = item.querySelector('.flow-text');

            const direction = image.dataset.direction

            gsap.from(text, {
                y: 250,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 75%',
                    end: 'top 30%',
                    scrub: 2,
                }
            })

            gsap.from(image, {
                x: `${direction === 'left' ? -250 : 250}px`,
                rotate: `${direction === 'left' ? -12 : 12}deg`,
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'top 30%',
                    scrub: 2
                }
            })
        })

    }

    workFlowAnim();

    const voiceSlider = () => {
        const sliderWidth = document.querySelector('.voices-inner').getBoundingClientRect().width;
        const slider = document.querySelector('.voices-inner');
        gsap.to(slider, {
            x: -sliderWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: '.sec5',
                start: 'top 20%',
                pin: '.sec5',
                scrub: 1,
                end: () => `+=${sliderWidth / 1.5}`,
            }
        })
    }
    voiceSlider();

    const faqInit = () => {
        const faqWrapper = [...document.querySelectorAll('.faq')];
        faqWrapper.forEach(faq => {
            const faqHeight = faq.scrollHeight;
            const ques = faq.querySelector('.question');
            ques.addEventListener('click', () => {
                faq.classList.toggle('active');
                faq.style.height = faq.classList.contains('active') ? `${faqHeight}px` : '11rem';

                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 320);
            })

        })
    }

    faqInit();

    const flipAnim = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.setps-section',
                start: 'top top',
                end: '+=1400',
                scrub: 1,
                pin: true,
                pinSpacing: true
            }
        })

        tl.to('.step-card-1 .step-card-front', {
            rotateY: -180,

        },).to('.step-card-1 .step-card-back', {
            rotateY: 0,

        }, '<')
            .to('.step-card-2 .step-card-front', {
                rotateY: -180,

            },).to('.step-card-2 .step-card-back', {
                rotateY: 0,

            }, '<')
            .to('.step-card-3 .step-card-front', {
                rotateY: -180,

            },).to('.step-card-3 .step-card-back', {
                rotateY: 0,

            }, '<').to({}, { duration: .1 });


    }

    flipAnim();

    const logoAnim = () => {
        const logo = document.querySelector('.logo-main-img');
        const logo2 = document.querySelector('.logo-main-img2');
        const height = logo.getBoundingClientRect().height;
        document.querySelector('.logo-main').style.height = `${height}px`;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.logo-main-img',
                start: 'top 50%',
                end: 'top 40%',
                scrub: 2,
            }
        })
        tl.to(logo2, {
            opacity: 1,
        })
    }

    logoAnim();
});